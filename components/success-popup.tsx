'use client';

import React from 'react';

interface SuccessPopupProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function SuccessPopup({ isVisible, onClose }: SuccessPopupProps) {
  // Auto-hide after 4 seconds
  React.useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 4 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top duration-500">
      <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-2xl border-2 border-green-400 max-w-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div>
              <p className="font-bold text-lg">Success!</p>
              <p className="text-green-100 text-sm">Check your email - the first lesson is on its way</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-green-200 hover:text-white text-xl font-bold ml-4"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
