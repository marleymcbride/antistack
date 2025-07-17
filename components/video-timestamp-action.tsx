'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { VideoTimestamp } from '@/lib/use-video-timestamps';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface VideoTimestampActionProps {
  timestamp: VideoTimestamp | null;
  isVisible: boolean;
  onClose: () => void;
}

export default function VideoTimestampAction({
  timestamp,
  isVisible,
  onClose,
}: VideoTimestampActionProps) {
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (!timestamp || !isVisible) return null;

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: '' }),
      });

      if (response.ok) {
        router.push('/signup-watch-video');
      }
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRedirect = () => {
    if (timestamp.url) {
      window.open(timestamp.url, '_blank');
    }
    onClose();
  };

  if (timestamp.type === 'popup') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="relative w-full max-w-2xl mx-4 bg-red-700 rounded-2xl p-8 animate-in zoom-in duration-300">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X size={24} />
          </button>

          <div className="pt-4">
            {timestamp.content || (
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-4">
                  🎯 Special Moment in the Video!
                </h2>
                <p className="text-lg mb-6">
                  Ready to get the complete system while it&apos;s fresh in your mind?
                </p>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email to continue..."
                    className="w-full px-4 py-3 text-black bg-white rounded"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black hover:bg-gray-900 text-white py-3"
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
      <div className="fixed bottom-6 right-6 z-40 animate-in slide-in-from-right duration-500">
        <div className="bg-red-700 text-white p-6 rounded-xl shadow-2xl max-w-sm">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white/70 hover:text-white"
          >
            <X size={16} />
          </button>

          {timestamp.content || (
            <div>
              <h3 className="font-bold text-lg mb-2">Perfect Timing!</h3>
              <p className="text-sm mb-4">Get the system that does exactly what you just saw</p>
              <Button
                onClick={handleRedirect}
                className="w-full bg-black hover:bg-gray-900 text-white py-2"
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
