'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Email pattern validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple type declaration
type SubscribeFormData = {
  email: string;
  [key: string]: any;
};

export default function EmailSignup() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Use react-hook-form without zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data: any, redirectUrl: string = '/signup-watch-video') => {
    console.log('📧 EMAIL SIGNUP - Form submission started:', data);

    // Validate email manually
    if (!emailRegex.test(data.email)) {
      console.log('❌ EMAIL SIGNUP - Email validation failed:', data.email);
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address"
      });
      return;
    }

    console.log('✅ EMAIL SIGNUP - Email validation passed');
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Get current video time before redirecting (for users coming from video page)
      let currentVideoTime = 0;
      if (window.Wistia && window.Wistia.api) {
        const videos = window.Wistia.api.all();
        if (videos.length > 0) {
          const video = videos[0];
          if (video.time && typeof video.time === 'function') {
            currentVideoTime = video.time();
            console.log(`🎬 EMAIL SIGNUP - Saving video timestamp: ${currentVideoTime}s`);
          }
        }
      }

      // Store video timestamp in localStorage if available
      if (currentVideoTime > 0) {
        localStorage.setItem('videoResumeTime', currentVideoTime.toString());
        console.log(`💾 EMAIL SIGNUP - Video time saved: ${currentVideoTime}s`);
      }

      console.log('🔄 EMAIL SIGNUP - Importing N8N webhook client...');
      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import('../lib/n8n-webhook-client');
      console.log('✅ EMAIL SIGNUP - N8N webhook client imported successfully');

      console.log('🚀 EMAIL SIGNUP - Calling submitToN8nWebhook with:', {
        email: data.email,
        firstName: '',
        source: 'anti-stack-section'
      });

      await submitToN8nWebhook(
        data.email,
        '', // firstName - empty for this form
        'anti-stack-section' // source tracking
      );

      console.log('🎉 EMAIL SIGNUP - N8N webhook submission successful!');
      console.log('🔄 EMAIL SIGNUP - Redirecting to', redirectUrl);

      // Success - redirect to specified URL
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
      }
      return;

    } catch (error) {
      console.error('❌ EMAIL SIGNUP - N8N webhook submission failed:', error);

      // Handle N8N webhook errors with professional messages
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again later.';
      console.log('📧 EMAIL SIGNUP - Showing error message to user:', errorMessage);

      setSubmitResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      console.log('🏁 EMAIL SIGNUP - Form submission completed, resetting loading state');
      setIsSubmitting(false);
    }
  };

  const handleWorkWithMe = async () => {
    // Get email from form
    const emailValue = (document.querySelector('input[type="email"]') as HTMLInputElement)?.value;

    if (!emailValue || !emailRegex.test(emailValue)) {
      alert('Please enter your email address first');
      return;
    }

    setIsSubmitting(true);

    try {
      // Submit to NEW N8N webhook for work-with-me leads
      const response = await fetch('https://n8n.marleymcbride.co/webhook-test/antistack-workwithme-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          source: 'work-with-me-leads',
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit email');
      }

      console.log('🎉 WORK WITH ME - N8N webhook submission successful!');
      console.log('🔄 WORK WITH ME - Redirecting to limitless-life.co');

      // Redirect to limitless-life.co
      window.location.href = 'https://limitless-life.co';

    } catch (error) {
      console.error('❌ WORK WITH ME - N8N webhook submission failed:', error);
      alert('There was an error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Benefits Box */}
      <div className="px-4 py-6 mx-6 mt-8 mb-6 text-left rounded-lg lg:py-8 md:py-8 bg-zinc-800/70 md:px-20 md:mx-auto lg:mx-auto">
        <h4 className="mx-5 mx-auto -mr-1 mb-6 ml-3 text-2xl font-semibold leading-relaxed md:-mr-0 md:mb-6 md:ml-9 md:text-3xl lg:-mr-0 lg:mb-6 lg:ml-9 lg:text-3xl">
          A daily 3-minute read straight to your inbox
        </h4>
        <ul className="space-y-6">
          <li className="flex items-start">
            <span className="flex-shrink-0 self-center mr-4 text-left text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-lg leading-relaxed">
            The simple 3-step morning flow to wake up feeling energized without caffeine
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 self-center mr-4 text-left text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-lg leading-relaxed">
            The EXACT protocol to jump out of bed in only 3 weeks
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 self-center mr-4 text-left text-red-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="text-lg leading-relaxed">
              The full blueprint to reset your hormones and triple your focus without sunning your balls, biohacks or shitty &apos;T boosters&apos;
            </span>
          </li>
        </ul>
      </div>

      {submitResult && (
        <div
          className={`mb-4 p-3 rounded ${
            submitResult.success ? 'bg-green-700/20 text-green-100' : 'bg-red-700/20 text-red-100'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {/* Quick Note on getting the email */}
      <p className="mx-10 mt-10 mb-10 text-center lg:mx-auto text-zinc-400">
      FREE for the first 100 only. Drop your email below and I&apos;ll send it over:
      </p>

      {/* Email Form - Mobile */}
      <div className="mx-auto mb-8 max-w-[290px] md:hidden">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            placeholder="Your Email Address..."
            className={`w-full p-5 h-13 text-base bg-zinc-800 border border-zinc-700 rounded text-white ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
          )}
          <Button
            type="submit"
            className="p-5 w-full h-16 text-lg font-bold text-white bg-red-700 rounded hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Send me it over'}
          </Button>
        </form>

        {/* Join Limitless - No separate headline, just the button */}
        <div className="mt-5">
          <Button
            variant="outline"
            className="p-5 w-full h-16 text-lg font-bold text-white bg-transparent rounded border border-red-700 hover:bg-red-900/20"
            onClick={handleWorkWithMe}
            disabled={isSubmitting}
          >
            WORK WITH ME
          </Button>
        </div>
      </div>

      {/* Email Form - Desktop */}
      <div className="hidden mx-auto mb-8 max-w-md md:block">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            placeholder="Your Email Address..."
            className={`w-full p-5 h-13 text-base bg-zinc-800 border border-zinc-700 rounded text-white ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
          )}
          <Button
            type="submit"
            className="p-5 w-full h-16 text-lg font-bold text-white bg-red-700 rounded hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Send me it over'}
          </Button>
        </form>

        {/* Join Limitless - No separate headline, just the button */}
        <div className="mt-5">
          <Button
            variant="outline"
            className="p-5 w-full h-16 text-lg font-bold text-white bg-transparent rounded border border-red-700 hover:bg-red-900/20"
            onClick={handleWorkWithMe}
            disabled={isSubmitting}
          >
            WORK WITH ME
          </Button>
        </div>
      </div>

      {/* Personal Note - Mobile */}
      <p className="mx-12 mt-6 text-center text-zinc-400 md:hidden">
        (I reply to every email personally. No bots or VA. Just yours truly.)
      </p>

      {/* Personal Note - Desktop */}
      <p className="hidden mt-6 text-center text-zinc-400 md:block">
        (I reply to every email personally. No bots or VA. Just yours truly.)
      </p>
    </>
  );
}
