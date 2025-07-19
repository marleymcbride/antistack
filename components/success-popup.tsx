'use client';

import React from 'react';

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isVisible, onClose }: SuccessPopupProps) {
  const [progress, setProgress] = React.useState(0);

  // Auto-hide after 5 seconds (extended for better reading)
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // 5 seconds

      // Animate progress bar
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 2; // Increment by 2% every 100ms (5 seconds total)
        });
      }, 100);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    } else {
      setProgress(0);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-8 left-1/2 z-50 duration-700 transform -translate-x-1/2 animate-in slide-in-from-top">
      <div className="px-8 py-6 max-w-lg text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl border shadow-2xl backdrop-blur-sm border-green-400/30">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-4">
            <div className="p-2 mt-1 rounded-full bg-white/20">
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex-1">
              <p className="mb-1 text-xl font-black">You&apos;re All Set!</p>
              <p className="mb-2 text-sm leading-relaxed text-green-100">
                Your exclusive training is unlocked below - continue where you left off
              </p>
              <div className="flex items-center space-x-1 text-xs text-green-200">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                <span>First lesson arriving in your inbox...</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex justify-center items-center ml-2 w-8 h-8 text-lg font-bold text-green-200 rounded-full transition-colors hover:text-white bg-white/10 hover:bg-white/20"
          >
            ×
          </button>
        </div>

        {/* Subtle progress bar animation */}
        <div className="overflow-hidden mt-4 h-1 rounded-full bg-white/20">
          <div
            className="h-full rounded-full transition-all duration-100 ease-linear bg-white/60"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
