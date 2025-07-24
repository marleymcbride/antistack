'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
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

  const onSubmit = async (data: any) => {
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
      console.log('🔄 EMAIL SIGNUP - Redirecting to /signup-watch-video...');

      // Success - redirect to signup-watch-video page
      router.push('/signup-watch-video');
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

  return (
    <>
      {/* Benefits Box */}
      <div className="p-6 mx-auto mt-0 mb-6 max-w-2xl text-left rounded-lg bg-zinc-800/70">
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
            The simple 3-step morning flow to wake up feeling amazing without caffeine
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
            The EXACT protocol to triple your energy in only 3 weeks
            </span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
              The process to reset your hormones and triple your focus without sunning your balls, biohacks or shitty &apos;T boosters&apos;
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
      <p className="mt-10 mb-10 text-center text-zinc-400">
      FREE for the first 100 only. Drop your email below and I&apos;ll send it over:
      </p>

      {/* Email Form */}
      <div className="mx-auto mb-8 max-w-md">
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
          >
            JOIN LIMITLESS
          </Button>
        </div>
      </div>

      {/* Personal Note */}
      <p className="mt-6 text-center text-zinc-400">
        (I reply to every email personally. No bots or VA. Just yours truly.)
      </p>
    </>
  );
}
