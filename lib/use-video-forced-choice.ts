'use client';

import { useState, useEffect, useCallback } from 'react';
import { getVideoType, VideoType } from '@/lib/video-utils';

export interface ForcedChoiceConfig {
  triggerTime: number; // seconds when overlay should appear
  redirectUrl?: string;
  mainButtonText?: string;
  overlayText?: string;
}

export function useVideoForcedChoice(
  videoUrl: string,
  config: ForcedChoiceConfig | null
) {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);

  const videoType = getVideoType(videoUrl);

  // BULLETPROOF Wistia video time tracking
  useEffect(() => {
    if (!config || videoType !== 'wistia' || !videoStarted || hasTriggered) return;

    console.log('🎬 BULLETPROOF TRACKING: Setting up for trigger at:', config.triggerTime, 'seconds');
    console.log('🎬 Video URL:', videoUrl);
    console.log('🎬 Video started:', videoStarted);

    let intervalId: NodeJS.Timeout;
    let wistiaCheckInterval: NodeJS.Timeout;
    let attemptCount = 0;
    const maxAttempts = 20; // Try for 10 seconds

    const setupWistiaTracking = () => {
      attemptCount++;
      console.log(`🎬 Attempt ${attemptCount}/${maxAttempts} to find Wistia API...`);
      console.log('🎬 Window.Wistia available:', !!window.Wistia);
      console.log('🎬 Window.Wistia.api available:', !!(window.Wistia && window.Wistia.api));

      if (window.Wistia && window.Wistia.api) {
        const allVideos = window.Wistia.api.all();
        console.log('🎬 Found Wistia videos:', allVideos.length);

        if (allVideos.length > 0) {
          const video = allVideos[0]; // Use first video

          // Debug: Log all available methods on the video object
          console.log('🔍 Video object methods:', Object.getOwnPropertyNames(video));
          console.log('🔍 Video object prototype methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(video)));

          // Safety checks for video object methods
          const videoId = video.hashedId && typeof video.hashedId === 'function' ? video.hashedId() : 'unknown';
          const videoDuration = video.duration && typeof video.duration === 'function' ? video.duration() : 'unknown';

          console.log('🎬 SUCCESS! Tracking video:', videoId);
          console.log('🎬 Video duration:', videoDuration);

          // Check different possible time methods
          const timeMethodOptions = ['currentTime', 'time', 'getCurrentTime', 'getTime'];
          let workingTimeMethod = null;

          for (const method of timeMethodOptions) {
            if (video[method] && typeof video[method] === 'function') {
              try {
                const testTime = video[method]();
                if (typeof testTime === 'number' && !isNaN(testTime)) {
                  console.log(`✅ Found working time method: ${method} = ${testTime}`);
                  workingTimeMethod = method;
                  break;
                }
              } catch (error) {
                console.log(`❌ Method ${method} failed:`, error);
              }
            }
          }

          if (!workingTimeMethod) {
            console.log('❌ No working time method found, skipping this video');
            return; // Skip this video
          }

          // Clear any existing interval
          if (intervalId) clearInterval(intervalId);

          // Check video time every 100ms for precision
          intervalId = setInterval(() => {
            try {
              // Use the working time method we found
              if (video[workingTimeMethod] && typeof video[workingTimeMethod] === 'function') {
                const time = video[workingTimeMethod]();

                // Validate the time value
                if (typeof time === 'number' && !isNaN(time)) {
                  setCurrentTime(time);
                  console.log(`🎬 Video time: ${time.toFixed(1)}s (target: ${config.triggerTime}s)`);

                  if (time >= config.triggerTime && !hasTriggered) {
                    console.log('🚨🚨🚨 VIDEO TIMESTAMP TRIGGER! 🚨🚨🚨');
                    console.log('🚨 Current time:', time);
                    console.log('🚨 Target time:', config.triggerTime);
                    setIsOverlayVisible(true);
                    setHasTriggered(true);
                    clearInterval(intervalId);
                  }
                } else {
                  console.log('⚠️ Invalid time value:', time);
                }
              } else {
                console.log('⚠️ Time method no longer available on video object');
                // Clear interval and try setup again
                clearInterval(intervalId);
              }
            } catch (error) {
              console.log('❌ Error calling time method:', error);
              // Clear interval and try setup again
              clearInterval(intervalId);
            }
          }, 100);

          // Clear the Wistia check interval since we found the video
          if (wistiaCheckInterval) clearInterval(wistiaCheckInterval);
          console.log('✅ TRACKING SETUP COMPLETE!');
          return; // Success!
        } else {
          console.log('⚠️ Wistia API available but no videos found yet, retrying...');
        }
      } else {
        console.log('⚠️ Wistia API not ready yet, retrying...');
      }

      // Stop trying after max attempts
      if (attemptCount >= maxAttempts) {
        console.log('❌ FAILED: Could not set up Wistia tracking after', maxAttempts, 'attempts');
        console.log('❌ Falling back to simple timer...');

        // Fallback to simple timer
        const fallbackTimer = setTimeout(() => {
          console.log('🔴 FALLBACK TIMER TRIGGERED at', config.triggerTime, 'seconds');
          setIsOverlayVisible(true);
          setHasTriggered(true);
        }, config.triggerTime * 1000);

        return () => clearTimeout(fallbackTimer);
      }
    };

    // Try after a delay to let Wistia API fully initialize
    setTimeout(setupWistiaTracking, 2000); // Wait 2 seconds initially

    // If not found, keep trying every 1 second (increased from 500ms)
    wistiaCheckInterval = setInterval(() => {
      if (attemptCount < maxAttempts) {
        setupWistiaTracking();
      } else {
        clearInterval(wistiaCheckInterval);
      }
    }, 1000);

    // Cleanup
    return () => {
      console.log('🧹 Cleaning up tracking intervals');
      if (intervalId) clearInterval(intervalId);
      if (wistiaCheckInterval) clearInterval(wistiaCheckInterval);
    };
  }, [config, videoType, videoStarted, hasTriggered]);

  // Manual trigger for testing
  useEffect(() => {
    const manualTriggerHandler = () => {
      console.log('🔴 Manual trigger activated!');
      setIsOverlayVisible(true);
      setHasTriggered(true);
    };

    window.addEventListener('manualTrigger', manualTriggerHandler);

    return () => {
      window.removeEventListener('manualTrigger', manualTriggerHandler);
    };
  }, []);

  const hideOverlay = useCallback(() => {
    console.log('👋 Hiding overlay');
    setIsOverlayVisible(false);
  }, []);

  const resetTrigger = useCallback(() => {
    console.log('🔄 Resetting trigger');
    setHasTriggered(false);
    setIsOverlayVisible(false);
    setCurrentTime(0);
    setVideoStarted(false);
  }, []);

  const startVideoTimer = useCallback(() => {
    console.log('▶️ Video started - beginning BULLETPROOF timestamp tracking');
    setVideoStarted(true);
  }, []);

  return {
    isOverlayVisible,
    currentTime,
    hideOverlay,
    resetTrigger,
    hasTriggered,
    startVideoTimer
  };
}
