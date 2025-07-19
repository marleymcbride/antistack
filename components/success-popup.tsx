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
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-700">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6 rounded-2xl shadow-2xl border border-green-400/30 max-w-lg backdrop-blur-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="bg-white/20 rounded-full p-2 mt-1">
              <span className="text-2xl">✅</span>
            </div>
            <div className="flex-1">
<<<<<<< HEAD
              <p className="font-black text-xl mb-1">You&apos;re All Set!</p>
=======
              <p className="font-black text-xl mb-1">You're All Set!</p>
>>>>>>> fc4dac54ac02cd3073d9f735a6bb2baaab343c48
              <p className="text-green-100 text-sm leading-relaxed mb-2">
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
            className="text-green-200 hover:text-white text-lg font-bold ml-2 bg-white/10 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/20 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Subtle progress bar animation */}
        <div className="mt-4 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
