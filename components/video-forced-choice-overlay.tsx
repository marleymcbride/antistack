'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
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
      // Check if it's an internal path (starts with /) or external URL
      if (redirectUrl.startsWith('/')) {
        // Internal navigation - use Next.js router
        router.push(redirectUrl);
      } else {
        // External URL - open in new tab
        window.open(redirectUrl, '_blank');
      }
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

  // Dynamic sizing based on text length - REDUCED for smaller video container
  const getTextSizing = (text: string) => {
    const length = text.length;

    if (length <= 60) {
      // Short text - larger font, higher positioning
      return {
        fontSize: 'text-lg md:text-xl lg:text-2xl',
        containerClass: 'top-1/3',
        lineHeight: 'leading-tight',
        maxWidth: 'max-w-3xl'
      };
    } else if (length <= 100) {
      // Medium text - medium font, centered positioning
      return {
        fontSize: 'text-base md:text-lg lg:text-xl',
        containerClass: 'top-1/3',
        lineHeight: 'leading-snug',
        maxWidth: 'max-w-4xl'
      };
    } else {
      // Long text - smaller font, more compact
      return {
        fontSize: 'text-sm md:text-base lg:text-lg',
        containerClass: 'top-1/4',
        lineHeight: 'leading-relaxed',
        maxWidth: 'max-w-5xl'
      };
    }
  };

  const textSizing = getTextSizing(overlayText);

  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 z-[999999] bg-black" style={{ zIndex: 999999, backgroundColor: '#000000' }}>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        {/* Fullscreen Exit Notification */}
        {wasFullscreen && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 animate-pulse">
            Exited fullscreen to show important message
          </div>
        )}

        {/* Dynamic Text Container */}
        <div className={`absolute ${textSizing.containerClass} left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-6 md:px-8`}>
          {/* Solid blocking layer to prevent any text bleeding */}
          <div className="absolute inset-0 bg-black rounded-lg -m-8"></div>
          <p className={`text-white ${textSizing.fontSize} font-bold ${textSizing.maxWidth} ${textSizing.lineHeight} drop-shadow-2xl mx-auto relative z-[100000]`}>
            {overlayText}
          </p>
        </div>

        {/* Main CTA Button - REDUCED sizing to match smaller video container */}
        <div className="absolute bottom-16 md:bottom-20 left-1/2 transform -translate-x-1/2 px-4 md:px-6">
          {/* Solid blocking layer behind button */}
          <div className="absolute inset-0 bg-black rounded-xl -m-4"></div>
          <div className="w-full max-w-xl relative z-[100001]">
            <Button
              onClick={handleMainAction}
              className="w-full h-12 md:h-14 lg:h-16 bg-red-700 hover:bg-red-800 text-white text-base md:text-lg lg:text-xl font-black rounded-xl transition-all duration-300 shadow-2xl shadow-red-900/50 hover:shadow-red-900/70 border border-red-600 hover:scale-[1.02] px-5 md:px-6 relative z-[100000]"
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
            className="h-8 md:h-9 px-3 md:px-4 bg-black/80 border-white/30 text-white/90 hover:bg-white/10 hover:text-white text-xs md:text-sm rounded-md transition-all duration-300 shadow-lg shadow-black/30 hover:shadow-black/50 hover:scale-105 relative z-[100000]"
          >
            Finish video
          </Button>
        </div>
      </div>
    </div>
  );
}
