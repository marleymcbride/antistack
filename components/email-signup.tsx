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
    // Validate email manually
    if (!emailRegex.test(data.email)) {
      setSubmitResult({
        success: false,
        message: "Please enter a valid email address"
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Add name as empty string to match the API expectations
      const payload = {
        ...data,
        name: '',
      };

      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        // Redirect to signup-watch-video page on success
        router.push('/signup-watch-video');
        return;
      }

      setSubmitResult({
        success: false,
        message: result.message,
      });
    } catch (error) {
      setSubmitResult({
        success: false,
        message: 'An error occurred. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Benefits Box */}
      <div className="max-w-2xl p-6 mx-auto mt-0 mb-6 text-left rounded-lg bg-zinc-800/70">
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="flex-shrink-0 mt-1 mr-3 text-left text-red-500">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="16" height="16" fill="currentColor" />
              </svg>
            </span>
            <span>
            The exact method to triple your energy in 3 weeks (no caffeine, no supplements, no bullshit)
            </span>
          </li>
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
              How to reset your hormones and triple your focus without sunning your balls, biohacks or 'T boosters'
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
        It's completely free, just give me your best email address and I'll send it your way.
      </p>

      {/* Email Form */}
      <div className="max-w-md mx-auto mb-8">
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
            className="w-full h-16 p-5 text-lg font-bold text-white bg-red-700 rounded hover:bg-red-800"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Send me it over'}
          </Button>
        </form>

        {/* Join Limitless - No separate headline, just the button */}
        <div className="mt-5">
          <Button
            variant="outline"
            className="w-full h-16 p-5 text-lg font-bold text-white bg-transparent border border-red-700 rounded hover:bg-red-900/20"
          >
            JOIN LIMITLESS
          </Button>
        </div>
      </div>

      {/* Personal Note */}
      <p className="mt-6 text-center text-zinc-400">
        I reply to every email personally. No bots or VA. Just yours truly.
      </p>
    </>
  );
}
