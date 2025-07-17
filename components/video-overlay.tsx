'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Mail, ShoppingCart } from 'lucide-react';
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
  onClose: () => void;
}

export default function VideoOverlayComponent({
  overlay,
  isVisible,
  currentTime,
  onClose,
}: VideoOverlayComponentProps) {
  const router = useRouter();

  if (!isVisible) return null;

  // Auto-hide logic
  const shouldAutoHide = overlay.autoHide && overlay.endTime && currentTime > overlay.endTime;
  if (shouldAutoHide) {
    setTimeout(() => onClose(), 500);
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
      onClose();
    }
  };

  const getIcon = () => {
    switch (overlay.icon) {
      case 'mail':
        return <Mail size={16} />;
      case 'external':
        return <ArrowUpRight size={16} />;
      case 'cart':
        return <ShoppingCart size={16} />;
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
      className={`absolute z-30 animate-in slide-in-from-bottom-2 duration-500 ${getPositionClasses()}`}
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
        {/* Close button temporarily removed to fix build */}

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="font-bold text-sm mb-1 leading-tight">
            {overlay.title}
          </h3>

          {/* Subtitle */}
          {overlay.subtitle && (
            <p className="text-xs text-red-100 mb-3 leading-tight">
              {overlay.subtitle}
            </p>
          )}

          {/* CTA Button */}
          <Button
            onClick={handleClick}
            className="w-full bg-black hover:bg-gray-900 text-white text-xs py-2 h-auto flex items-center justify-center gap-2 transition-all hover:scale-105"
          >
            {getIcon()}
            {overlay.buttonText}
          </Button>
        </div>

        {/* Pulse animation border */}
        <div className="absolute inset-0 rounded-xl border-2 border-yellow-400 animate-pulse opacity-50"></div>
      </div>
    </div>
  );
}
