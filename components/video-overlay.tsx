'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export interface VideoOverlay {
  id: string;
  startTime: number; // when overlay appears (seconds)
  endTime?: number; // when overlay disappears (optional, defaults to startTime + 10)
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center' | 'bottom-center';
  type: 'cta' | 'email' | 'redirect' | 'custom';
  title: string;
  subtitle?: string;
  buttonText: string;
  url?: string;
  icon?: 'mail' | 'external' | 'cart' | 'none';
  className?: string;
  onClick?: () => void;
  showCloseButton?: boolean;
  autoHide?: boolean; // Auto-hide after duration
}

interface VideoOverlayComponentProps {
  overlay: VideoOverlay;
  isVisible: boolean;
  currentTime: number;
  onCloseAction: () => void;
}

export default function VideoOverlayComponent({
  overlay,
  isVisible,
  currentTime,
  onCloseAction,
}: VideoOverlayComponentProps) {
  const router = useRouter();

  if (!isVisible) return null;

  // Auto-hide logic
  const shouldAutoHide = overlay.autoHide && overlay.endTime && currentTime > overlay.endTime;
  if (shouldAutoHide) {
    setTimeout(() => onCloseAction(), 500);
  }

  const handleClick = () => {
    if (overlay.onClick) {
      overlay.onClick();
    } else if (overlay.type === 'email') {
      // Redirect to email signup
      router.push('/signup-watch-video');
    } else if (overlay.type === 'redirect' && overlay.url) {
      window.open(overlay.url, '_blank');
    }

    if (overlay.autoHide !== false) {
      onCloseAction();
    }
  };

  const getIcon = () => {
    switch (overlay.icon) {
      case 'mail':
        return <span className="text-sm">✉</span>;
      case 'external':
        return <span className="text-sm">↗</span>;
      case 'cart':
        return <span className="text-sm">🛒</span>;
      default:
        return null;
    }
  };

  const getPositionClasses = () => {
    switch (overlay.position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'center':
        return 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2';
      case 'bottom-center':
        return 'bottom-4 left-1/2 transform -translate-x-1/2';
      default:
        return 'bottom-4 right-4';
    }
  };

  return (
    <div
      className={`absolute z-30 duration-500 animate-in slide-in-from-bottom-2 ${getPositionClasses()}`}
    >
      <div className={`
        bg-gradient-to-r from-red-600 to-red-700
        text-white
        rounded-xl
        shadow-2xl
        border border-red-500/20
        backdrop-blur-sm
        max-w-xs
        ${overlay.className || ''}
      `}>
        {/* Close button */}
        {overlay.showCloseButton !== false && (
          <button
            onClick={onCloseAction}
            className="flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-white rounded-full transition-colors bg-black/70 hover:bg-black/90"
          >
            ×
          </button>
        )}

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="mb-1 text-sm font-bold leading-tight">
            {overlay.title}
          </h3>

          {/* Subtitle */}
          {overlay.subtitle && (
            <p className="mb-3 text-xs leading-tight text-red-100">
              {overlay.subtitle}
            </p>
          )}

          {/* CTA Button */}
          <Button
            onClick={handleClick}
            className="flex gap-2 justify-center items-center py-2 w-full h-auto text-xs text-white bg-black transition-all hover:bg-gray-900 hover:scale-105"
          >
            {getIcon()}
            {overlay.buttonText}
          </Button>
        </div>

        {/* Pulse animation border */}
        <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
}
