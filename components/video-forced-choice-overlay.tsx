'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

interface VideoForcedChoiceOverlayProps {
  isVisible: boolean;
  onMainAction: () => void;
  onFinishVideo: () => void;
  mainButtonText?: string;
  overlayText?: string;
  redirectUrl?: string;
  onPauseVideo?: () => void;
  onResumeVideo?: () => void;
}

export default function VideoForcedChoiceOverlay({
  isVisible,
  onMainAction,
  onFinishVideo,
  mainButtonText = "GET INSTANT ACCESS",
  overlayText = "Ready to transform your energy? Click below to get started:",
  redirectUrl,
  onPauseVideo,
  onResumeVideo
}: VideoForcedChoiceOverlayProps) {

  const [wasFullscreen, setWasFullscreen] = useState(false);

  // Hide fullscreen notification after 3 seconds
  useEffect(() => {
    if (wasFullscreen) {
      const timer = setTimeout(() => {
        setWasFullscreen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [wasFullscreen]);

  // Pause video when overlay becomes visible
  useEffect(() => {
    console.log('🔍 Overlay visibility changed:', isVisible);
    console.log('🔍 onPauseVideo function available:', !!onPauseVideo);

    if (isVisible && onPauseVideo) {
      console.log('🎬 AUTOMATIC PAUSE: Pausing video due to overlay appearing');
      console.log('🎬 Wistia API status:', !!window.Wistia);

      // Check if we're in fullscreen and exit if needed
      if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        console.log('🔍 Fullscreen detected, exiting to show overlay...');
        setWasFullscreen(true);

        // Exit fullscreen
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }

        // Wait a moment for fullscreen to exit before pausing
        setTimeout(() => {
          console.log('🎬 Executing pause after fullscreen exit...');
          onPauseVideo();
        }, 300);
      } else {
        // Not in fullscreen, proceed normally
        setTimeout(() => {
          console.log('🎬 Executing pause after delay...');
          onPauseVideo();
        }, 100);
      }
    }
  }, [isVisible, onPauseVideo]);

  const handleMainAction = () => {
    if (redirectUrl) {
      window.open(redirectUrl, '_blank');
    }
    onMainAction();
  };

  const handleFinishVideo = () => {
    // First, hide the overlay
    onFinishVideo();

    // Then resume the video
    if (onResumeVideo) {
      console.log('▶️ Resuming video');
      onResumeVideo();
    }

    // If user was in fullscreen before overlay, return to fullscreen after video resumes
    if (wasFullscreen) {
      console.log('🔍 Will restore fullscreen mode after video resumes...');

      // Longer delay to ensure video fully resumes first
      setTimeout(() => {
        // Find the iframe to make fullscreen
        const iframe = document.querySelector('iframe');
        if (iframe) {
          console.log('🔍 Attempting to restore fullscreen...');
          if (iframe.requestFullscreen) {
            iframe.requestFullscreen();
          } else if (iframe.webkitRequestFullscreen) {
            iframe.webkitRequestFullscreen();
          } else if (iframe.mozRequestFullScreen) {
            iframe.mozRequestFullScreen();
          } else if (iframe.msRequestFullscreen) {
            iframe.msRequestFullscreen();
          }
          console.log('✅ Fullscreen restoration attempted');
        } else {
          console.log('❌ Could not find iframe for fullscreen restoration');
        }

        // Reset the fullscreen tracking
        setWasFullscreen(false);
      }, 1000); // Increased delay to 1 second
    }
  };

  // Dynamic sizing based on text length
  const getTextSizing = (text: string) => {
    const length = text.length;

    if (length <= 60) {
      // Short text - larger font, higher positioning
      return {
        fontSize: 'text-2xl md:text-3xl lg:text-4xl',
        containerClass: 'top-1/4',
        lineHeight: 'leading-tight',
        maxWidth: 'max-w-3xl'
      };
    } else if (length <= 100) {
      // Medium text - medium font, centered positioning
      return {
        fontSize: 'text-xl md:text-2xl lg:text-3xl',
        containerClass: 'top-1/3',
        lineHeight: 'leading-snug',
        maxWidth: 'max-w-4xl'
      };
    } else {
      // Long text - smaller font, more compact
      return {
        fontSize: 'text-lg md:text-xl lg:text-2xl',
        containerClass: 'top-1/4',
        lineHeight: 'leading-relaxed',
        maxWidth: 'max-w-5xl'
      };
    }
  };

  const textSizing = getTextSizing(overlayText);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-black/60 backdrop-blur-sm">
      {/* Fullscreen Exit Notification */}
      {wasFullscreen && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 animate-pulse">
          Exited fullscreen to show important message
        </div>
      )}

      {/* Dynamic Text Container */}
      <div className={`absolute ${textSizing.containerClass} left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6 md:px-8`}>
        <p className={`text-white ${textSizing.fontSize} font-bold ${textSizing.maxWidth} ${textSizing.lineHeight} drop-shadow-lg mx-auto`}>
          {overlayText}
        </p>
      </div>

      {/* Main CTA Button - positioned in center-bottom for prominence */}
      <div className="absolute bottom-32 md:bottom-40 left-1/2 transform -translate-x-1/2 px-4 md:px-6">
        <div className="w-full max-w-4xl">
          <Button
            onClick={handleMainAction}
            className="w-full h-20 md:h-24 lg:h-28 bg-red-700/90 hover:bg-red-800/95 text-white text-xl md:text-2xl lg:text-3xl font-black rounded-xl transition-all duration-300 shadow-2xl shadow-red-900/50 hover:shadow-red-900/70 backdrop-blur-sm border border-red-600/30 hover:scale-[1.02] px-8 md:px-12"
          >
            {mainButtonText}
          </Button>
        </div>
      </div>

      {/* Finish Video Button - Small, positioned above Wistia controls */}
      <div className="absolute bottom-8 right-1 md:bottom-12 md:right-3">
        <Button
          onClick={handleFinishVideo}
          variant="outline"
          className="h-8 md:h-9 px-3 md:px-4 bg-black/20 backdrop-blur-sm border-white/30 text-white/90 hover:bg-white/10 hover:text-white text-xs md:text-sm rounded-md transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-black/50 hover:scale-105"
        >
          Finish video
        </Button>
      </div>
    </div>
  );
}
