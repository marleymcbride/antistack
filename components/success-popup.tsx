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
    <div className="fixed top-4 left-4 right-4 z-50 duration-700 animate-in slide-in-from-top md:top-8 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2">
      <div className="px-6 py-5 w-full md:max-w-lg text-white bg-gradient-to-r from-green-600 to-green-700 rounded-2xl border shadow-2xl backdrop-blur-sm border-green-400/30">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3 md:space-x-4">
            <div className="p-2 mt-1 rounded-full bg-white/20">
              <span className="text-2xl md:text-2xl">✅</span>
            </div>
            <div className="flex-1">
              <p className="mb-1 text-2xl md:text-xl font-black">You&apos;re All Set!</p>
              <p className="mb-2 text-base md:text-sm leading-relaxed text-green-100">
                Your exclusive training is unlocked below - continue where you left off
              </p>
              <div className="flex items-center space-x-1 text-sm md:text-xs text-green-200">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                <span>First lesson arriving in your inbox...</span>
              </div>

              {/* What high performers are saying section */}
              <div className="mt-6">
                <h4 className="mb-4 text-sm font-bold text-white">What high performers are saying:</h4>
                <div className="p-5 rounded-xl bg-white/10 shadow-md">
                  <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
                    <div>
                      <p className="mb-2 text-sm leading-loose text-white">
                        &quot;It&apos;s mad to think how much more energy you have. I was feeling good, but now it&apos;s 10 fold.&quot;
                      </p>
                      <p className="text-xs font-semibold text-green-200">— Luis, Energy Sector, UK</p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm leading-loose text-white">
                        &quot;I don&apos;t feel I&apos;ve ever had this much natural energy before than in the last few weeks.&quot;
                      </p>
                      <p className="text-xs font-semibold text-green-200">— Aaron, Business Exec, 42</p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm leading-loose text-white">
                        &quot;Noticed more energy coming in, sleep has been better and I&apos;m feeling more focused.&quot;
                      </p>
                      <p className="text-xs font-semibold text-green-200">— Laurence, 52, ZH</p>
                    </div>
                  </div>
                </div>
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
