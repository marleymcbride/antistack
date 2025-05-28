'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';

// Define the schema manually instead of using zod
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple type declaration instead of inferred type
type SubscribeFormData = {
  email: string;
  [key: string]: any;
};

export default function EmailCTA() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitResult, setSubmitResult] = React.useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // Use react-hook-form without zod resolver
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

      setSubmitResult({
        success: response.ok,
        message: result.message,
      });

      if (response.ok) {
        reset(); // Clear the form on success
      }
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
    <div className="p-4 mt-5 mb-8 w-90">
      {submitResult && (
        <div
          className={`mb-4 p-2 rounded w-full ${
            submitResult.success ? 'bg-green-700/20 text-green-100' : 'bg-red-700/20 text-red-100'
          }`}
        >
          {submitResult.message}
        </div>
      )}

      {/* Email Form */}
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
          {isSubmitting ? 'Processing...' : 'START MY 3-WEEK TRANSFORMATION'}
        </Button>
      </form>

      {/* Secondary CTA Button */}
      <div className="mt-5">
        <Button
          variant="outline"
          className="w-full py-4 text-lg font-bold text-white bg-transparent border border-red-700 rounded hover:bg-red-900/20 h-15"
        >
          JOIN LIMITLESS
        </Button>
      </div>
    </div>
  );
}
