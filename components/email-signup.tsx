'use client';

import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { ArrowRight } from "lucide-react";

// Email pattern validation
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

// Simple type declaration
type SubscribeFormData = {
  email: string;
  [key: string]: any;
};

export default function EmailSignup() {
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
    <div className="w-full mb-16">
      {/* Key Benefits */}
      <div className="bg-zinc-900/50 p-6 rounded-lg mb-8 w-full">
        <ul className="space-y-4">
          <li className="flex items-start">
            <span className="text-red-500 mr-2 text-xl">•</span>
            <span>
              Free 30-day email course revealing the exact Limitless Systems I used to triple my energy levels in just
              21 days
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2 text-xl">•</span>
            <span>
              Learn how to shift from "Drag Energy" to "Glide Energy" without caffeine, alcohol, or spending 5 days a
              week in the gym
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-red-500 mr-2 text-xl">•</span>
            <span>
              Discover the Morning Fuel System, Minimalist Training, and Limitless Flow that transformed my life and
              body
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

      {/* Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8">
        <div className="space-y-4">
          <Input
            {...register('email', {
              required: "Email is required",
              pattern: {
                value: emailRegex,
                message: "Please enter a valid email address"
              }
            })}
            type="email"
            placeholder="Enter your email address"
            className={`bg-zinc-800 border-zinc-700 text-white h-14 ${errors.email ? 'border-red-500' : ''}`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email.message as string}</p>
          )}
          <Button
            type="submit"
            className="bg-red-700 hover:bg-red-800 text-white h-14 px-8 w-full whitespace-nowrap flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'GET THE FREE COURSE'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>

      {/* Secondary CTA Button */}
      <Button
        variant="outline"
        className="border-red-700 text-white hover:bg-red-900/20 text-lg py-6 px-8 rounded w-full"
      >
        JOIN LIMITLESS
      </Button>

      {/* Personal Note */}
      <p className="text-center mt-8 text-zinc-400">
        I personally write every email. No bots, no VA. Just straight answers and direction to help you transform your
        energy and life.
      </p>
    </div>
  );
}
