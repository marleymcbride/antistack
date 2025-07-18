'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoTimestamp } from '@/lib/use-video-timestamps';
import { useRouter } from 'next/navigation';

interface VideoTimestampActionProps {
  timestamp: VideoTimestamp | null;
  isVisible: boolean;
  onCloseAction: () => void;
}

export default function VideoTimestampAction({
  timestamp,
  isVisible,
  onCloseAction,
}: VideoTimestampActionProps) {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!timestamp || !isVisible) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import('../lib/n8n-webhook-client');

      await submitToN8nWebhook(
        email,
        '', // firstName - empty for this form
        'video-popup-section' // source tracking
      );

      // Success - redirect to signup-watch-video page
      router.push('/signup-watch-video');

    } catch (error) {
      console.error('N8N webhook error:', error);
      // Note: This component doesn't have error display UI, maintaining existing pattern
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    if (timestamp.url) {
      window.open(timestamp.url, '_blank');
    }
    onCloseAction();
  };

  if (timestamp.type === 'popup') {
    return (
      <div className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm duration-300 bg-black/80 animate-in fade-in">
        <div className="relative p-8 mx-4 w-full max-w-2xl bg-red-700 rounded-2xl duration-300 animate-in zoom-in">
          {/* Close button removed to fix X icon issue */}

          <div className="pt-4">
            {timestamp.content || (
              <div className="text-center text-white">
                <h2 className="mb-4 text-2xl font-bold">
                  🎯 Special Moment in the Video!
                </h2>
                <p className="mb-6 text-lg">
                  Ready to get the complete system while it&apos;s fresh in your mind?
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="Enter your email to continue..."
                    className="px-4 py-3 w-full text-black bg-white rounded"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="py-3 w-full text-white bg-black hover:bg-gray-900"
                  >
                    {isSubmitting ? 'Getting Access...' : 'Get Complete System Now →'}
                  </Button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (timestamp.type === 'cta') {
    return (
      <div className="fixed right-6 bottom-6 z-40 duration-500 animate-in slide-in-from-right">
        <div className="p-6 max-w-sm text-white bg-red-700 rounded-xl shadow-2xl">
          {/* Close button removed to fix X icon issue */}

          {timestamp.content || (
            <div>
              <h3 className="mb-2 text-lg font-bold">Perfect Timing!</h3>
              <p className="mb-4 text-sm">Get the system that does exactly what you just saw</p>
              <Button
                onClick={handleRedirect}
                className="py-2 w-full text-white bg-black hover:bg-gray-900"
              >
                Get Access Now
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (timestamp.type === 'redirect' && timestamp.url) {
    // Auto-redirect (can be disabled with autoTrigger: false)
    window.open(timestamp.url, '_blank');
    return null;
  }

  return null;
}
