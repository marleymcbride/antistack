'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createPortal } from 'react-dom';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { fire3weeksEmailCaptureWebhook, fireWorkWithMeWebhook } from '../lib/n8n-webhook-client';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

interface FormData {
  email: string;
}

interface WorkWithMeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkWithMeModal({ isOpen, onClose }: WorkWithMeModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [mounted, setMounted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Block scrolling when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      reset();
      setSubmitResult(null);
    }
  }, [isOpen, reset]);

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const onSubmit = async (data: FormData) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 WORK WITH ME MODAL - Form submission started:', data);
    }

    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Fire both webhooks (email capture is fire-and-forget, Work With Me awaits)
      fire3weeksEmailCaptureWebhook(data.email);
      await fireWorkWithMeWebhook(data.email);

      if (process.env.NODE_ENV === 'development') {
        console.log('🎉 WORK WITH ME MODAL - Webhooks fired successfully!');
        console.log('🔄 WORK WITH ME MODAL - Opening limitless-life.co in new tab');
      }

      // Open limitless-life.co in new tab
      window.open('https://limitless-life.co', '_blank');

      // Close modal
      onClose();
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ WORK WITH ME MODAL - Error:', error);
      }
      setSubmitResult({
        success: false,
        message: 'There was an error. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative p-6 py-16 w-full max-w-md rounded-xl shadow-2xl bg-zinc-800"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 transition-colors text-zinc-400 hover:text-zinc-200"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="mb-6 text-center">
          <div id="modal-title" className="mb-2 text-2xl font-medium text-white"><strong className="text-red-600">STEP 1:</strong> Enter your email below</div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mx-6 space-y-4">
          {submitResult && (
            <div
              className={`p-3 rounded text-sm ${
                submitResult.success
                  ? 'bg-green-900/30 text-green-200'
                  : 'bg-red-900/30 text-red-200'
              }`}
            >
              {submitResult.message}
            </div>
          )}

          <div>
            <Input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: emailRegex,
                  message: 'Please enter a valid email address',
                },
              })}
              type="email"
              placeholder="Your Email Address..."
              className={`w-full h-12 bg-zinc-700 border-zinc-600 text-white placeholder-zinc-400 ${
                errors.email ? 'border-red-500' : ''
              }`}
              autoFocus
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-bold text-white bg-red-700 rounded hover:bg-red-800"
            disabled={isSubmitting}
            aria-live="polite"
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Show me how it works'}
          </Button>
        </form>

        {/* Trust indicator */}
   
      </div>
    </div>,
    document.body
  );
}
