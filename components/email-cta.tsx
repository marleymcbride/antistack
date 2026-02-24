'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import WorkWithMeModal from './work-with-me-modal';

// Define the schema manually instead of using zod
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple type declaration instead of inferred type
type SubscribeFormData = {
  email: string;
  [key: string]: any;
};

export default function EmailCTA() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isWorkWithMeModalOpen, setIsWorkWithMeModalOpen] = React.useState(false);

  // Use react-hook-form without zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = async (data: any, redirectUrl: string = '/signup-watch-video') => {
    console.log('📧 EMAIL CTA - Form submission started:', data);

    // Validate email manually
    if (!emailRegex.test(data.email)) {
      console.log('❌ EMAIL CTA - Email validation failed:', data.email);
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address"
      });
      return;
    }

    console.log('✅ EMAIL CTA - Email validation passed');
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
            console.log(`🎬 EMAIL CTA - Saving video timestamp: ${currentVideoTime}s`);
          }
        }
      }

      // Store video timestamp in localStorage if available
      if (currentVideoTime > 0) {
        localStorage.setItem('videoResumeTime', currentVideoTime.toString());
        console.log(`💾 EMAIL CTA - Video time saved: ${currentVideoTime}s`);
      }

      console.log('🔄 EMAIL CTA - Importing N8N webhook client...');
      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import('../lib/n8n-webhook-client');
      console.log('✅ EMAIL CTA - N8N webhook client imported successfully');

      console.log('🚀 EMAIL CTA - Calling submitToN8nWebhook with:', {
        email: data.email,
        firstName: '',
        source: 'hero-section'
      });

      await submitToN8nWebhook(
        data.email,
        '', // firstName - empty for this form
        'hero-section' // source tracking
      );

      console.log('🎉 EMAIL CTA - N8N webhook submission successful!');
      console.log('🔄 EMAIL CTA - Redirecting to', redirectUrl);

      // Success - redirect to specified URL
      if (redirectUrl.startsWith('http')) {
        window.location.href = redirectUrl;
      } else {
        router.push(redirectUrl);
      }
      return;

    } catch (error) {
      console.error('❌ EMAIL CTA - N8N webhook submission failed:', error);

      // Handle N8N webhook errors with professional messages
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again later.';
      console.log('📧 EMAIL CTA - Showing error message to user:', errorMessage);

      setSubmitResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      console.log('🏁 EMAIL CTA - Form submission completed, resetting loading state');
      setIsSubmitting(false);
    }
  };

  const handleWorkWithMe = async () => {
    // Get email from form using react-hook-form
    const emailValue = (getValues().email as string)?.trim();

    // Check if email exists and is valid
    if (emailValue && emailRegex.test(emailValue)) {
      // Email exists - submit directly
      setIsSubmitting(true);

      try {
        // Submit to N8N webhook for work-with-me leads
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
        console.log('🔄 WORK WITH ME - Opening limitless-life.co in new tab');

        // Open limitless-life.co in new tab
        window.open('https://limitless-life.co', '_blank');

      } catch (error) {
        console.error('❌ WORK WITH ME - N8N webhook submission failed:', error);
        alert('There was an error. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // No email - open modal
      setIsWorkWithMeModalOpen(true);
    }
  };

  return (
    <>
      {/* Email Form - Mobile */}
      <div className="mb-8 mx-auto max-w-[290px] md:hidden">
        {submitResult && (
          <div
            className={`mb-4 p-2 rounded w-full ${
              submitResult.success ? 'bg-green-700/20 text-green-100' : 'bg-red-700/20 text-red-100'
            }`}
          >
            {submitResult.message}
          </div>
        )}

        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            className={`w-full p-4 bg-zinc-800 border border-zinc-700 rounded text-white placeholder-white placeholder-opacity-100 ${errors.email ? 'border-red-500' : ''} h-14`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
          )}

          <Button
            type="submit"
            className="w-full p-4 mb-8 text-lg font-bold text-white bg-red-700 rounded hover:bg-red-800 h-15"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Send me Day 1'}
          </Button>
        </form>

        {/* Secondary CTA Button */}
        <div className="mt-5">
          <Button
            variant="outline"
            className="w-full py-4 text-lg font-bold text-white bg-transparent border border-red-700 rounded hover:bg-red-900/20 h-15"
            onClick={handleWorkWithMe}
            disabled={isSubmitting}
          >
            WORK WITH ME
          </Button>
        </div>
      </div>

      {/* Email Form - Desktop */}
      <div className="hidden mb-8 mx-auto max-w-md md:block">
        {submitResult && (
          <div
            className={`mb-4 p-2 rounded w-full ${
              submitResult.success ? 'bg-green-700/20 text-green-100' : 'bg-red-700/20 text-red-100'
            }`}
          >
            {submitResult.message}
          </div>
        )}

        <form className="w-full space-y-5" onSubmit={handleSubmit(onSubmit)}>
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
            {isSubmitting ? 'Processing...' : 'Send me Day 1'}
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

      <WorkWithMeModal
        isOpen={isWorkWithMeModalOpen}
        onClose={() => setIsWorkWithMeModalOpen(false)}
      />
    </>
  );
}
