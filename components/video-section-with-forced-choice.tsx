'use client';

import React, { useCallback } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { getEmbedUrl, getVideoType } from '@/lib/video-utils';
import { useVideoForcedChoice, ForcedChoiceConfig } from '@/lib/use-video-forced-choice';
import VideoForcedChoiceOverlay from './video-forced-choice-overlay';

interface VideoSectionWithForcedChoiceProps {
  videoUrl: string;
  forcedChoiceConfig?: ForcedChoiceConfig | null;
  title?: string;
  className?: string;
  onMainAction?: () => void;
  autoPlay?: boolean; // New prop for auto-play
  startTime?: number; // New prop for resuming video at specific time
}

export default function VideoSectionWithForcedChoice({
  videoUrl,
  forcedChoiceConfig,
  title = "Watch The Video",
  className = "",
  onMainAction,
  autoPlay = true, // Default to false
  startTime = 0 // Default to start from beginning
}: VideoSectionWithForcedChoiceProps) {
  const [isVideoLoaded, setIsVideoLoaded] = React.useState(autoPlay); // Auto-load if autoPlay is true
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  const {
    isOverlayVisible,
    hideOverlay,
    resetTrigger,
    startVideoTimer
  } = useVideoForcedChoice(videoUrl, forcedChoiceConfig || null);

  const videoType = getVideoType(videoUrl);

  // Seek to startTime when video loads (for Wistia)
  React.useEffect(() => {
    if (isVideoLoaded && startTime > 0 && videoType === 'wistia') {
      const seekToTime = () => {
        if (window.Wistia && window.Wistia.api) {
          const videos = window.Wistia.api.all();
          if (videos.length > 0) {
            const video = videos[0];
            console.log(`🎬 Seeking to ${startTime} seconds...`);
            if (video.time && typeof video.time === 'function') {
              video.time(startTime);
              console.log(`✅ Video seeked to ${startTime}s`);
            }
          }
        } else {
          // Retry if Wistia API not ready
          setTimeout(seekToTime, 500);
        }
      };

      // Wait a moment for video to fully load before seeking
      setTimeout(seekToTime, 1000);
    }
  }, [isVideoLoaded, startTime, videoType]);

  // Wistia script loading - CRITICAL for JavaScript API
  React.useEffect(() => {
    if (videoType === 'wistia' && isVideoLoaded) {
      console.log('🎬 Loading Wistia API...');

      // Load Wistia script if not already loaded
      if (!window.Wistia) {
        const script = document.createElement('script');
        script.src = 'https://fast.wistia.net/assets/external/E-v1.js';
        script.async = true;
        script.onload = () => {
          console.log('✅ Wistia script loaded');
          // Wait a bit more for API to be ready
          setTimeout(() => {
            console.log('🎬 Wistia API should be ready now');
          }, 1000);
        };
        document.head.appendChild(script);
      } else {
        console.log('✅ Wistia script already available');
      }
    }
  }, [videoType, isVideoLoaded]);

  // Add postMessage listener to debug iframe communication
  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      console.log('📨 Received postMessage from iframe:', event.data);
      console.log('📨 Message origin:', event.origin);
      console.log('📨 Message source:', event.source);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleLoadVideo = useCallback(() => {
    setIsVideoLoaded(true);
    resetTrigger(); // Reset any previous triggers

    // Start the timer immediately when video loads
    setTimeout(() => {
      console.log('🎬 Starting video timer after load delay');
      startVideoTimer();
    }, 1000); // 1 second delay to ensure video actually starts
  }, [resetTrigger, startVideoTimer]);

  const handleMainAction = () => {
    if (onMainAction) {
      onMainAction();
    }
    hideOverlay();
  };

  const handleFinishVideo = () => {
    hideOverlay();
  };

  // Auto-play effect - load video automatically if autoPlay is true
  React.useEffect(() => {
    if (autoPlay && !isVideoLoaded) {
      console.log('🎬 Auto-play enabled - loading video automatically');
      console.log('🎬 Auto-play: calling handleLoadVideo...');
      handleLoadVideo();
    }
  }, [autoPlay, isVideoLoaded, handleLoadVideo]);

  // Additional effect to ensure timer starts with auto-play
  React.useEffect(() => {
    if (autoPlay && isVideoLoaded) {
      console.log('🎬 Auto-play: Video loaded, ensuring timer starts...');
      // Double-check that the timer starts for auto-play
      setTimeout(() => {
        console.log('🎬 Auto-play: Starting forced choice timer');
        startVideoTimer();
      }, 2000); // 2 second delay for auto-play
    }
  }, [autoPlay, isVideoLoaded, startVideoTimer]);

  // Video pause functionality for different platforms
  const pauseVideo = () => {
    console.log('🔴 PAUSE VIDEO CALLED');
    console.log('🔴 video type:', videoType);
    console.log('🔴 video URL:', videoUrl);

    if (videoType === 'wistia') {
      console.log('🔴 WISTIA PAUSE - Using JavaScript API');

      if (window.Wistia && window.Wistia.api) {
        // Extract video ID
        let videoId = '';
        if (videoUrl.includes('/embed/medias/')) {
          videoId = videoUrl.split('/embed/medias/')[1].split('?')[0];
        } else if (videoUrl.includes('/embed/iframe/')) {
          videoId = videoUrl.split('/embed/iframe/')[1].split('?')[0];
        } else if (videoUrl.includes('/medias/')) {
          videoId = videoUrl.split('/medias/')[1].split('?')[0];
        } else {
          videoId = videoUrl.split('/').pop()?.split('?')[0] || '';
        }

        console.log('🔴 Extracted video ID:', videoId);

        // Try to pause the specific video
        const wistiaApi = window.Wistia.api(videoId);
        if (wistiaApi) {
          console.log('🔴 Calling pause on specific video...');
          wistiaApi.pause();
          console.log('✅ Wistia video paused successfully');
        } else {
          console.log('⚠️ Could not get specific API, trying all videos...');
          // Fallback: pause all Wistia videos
          const allVideos = window.Wistia.api.all();
          console.log('🔴 Found Wistia videos:', allVideos.length);

          if (allVideos.length > 0) {
            allVideos.forEach((video, index) => {
              console.log(`🔴 Pausing video ${index + 1}: ${video.hashedId()}`);
              video.pause();
            });
            console.log('✅ Wistia API pause completed');
          } else {
            console.log('❌ No Wistia videos found');
          }
        }
      } else {
        console.log('❌ Wistia API not available yet');

        // Fallback to iframe approach if API not loaded
        const iframe = document.querySelector('iframe');
        if (iframe) {
          console.log('🔴 Fallback: Using iframe postMessage...');
          iframe.contentWindow?.postMessage('{"method":"pause"}', '*');
          iframe.contentWindow?.postMessage({method: 'pause'}, '*');
        }
      }
    } else if (videoType === 'youtube') {
      console.log('🔴 YouTube pause...');
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    } else if (videoType === 'vimeo') {
      console.log('🔴 Vimeo pause...');
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow?.postMessage('{"method":"pause"}', '*');
      }
    } else if (videoType === 'html5') {
      console.log('🔴 HTML5 pause...');
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.pause();
        console.log('✅ HTML5 video paused');
      }
    }

    console.log('✅ Pause command completed');
  };

  // Video resume functionality for different platforms
  const resumeVideo = () => {
    console.log('▶️ RESUME VIDEO CALLED');
    console.log('▶️ video type:', videoType);

    if (videoType === 'wistia') {
      console.log('▶️ WISTIA RESUME - Using JavaScript API');

      if (window.Wistia && window.Wistia.api) {
        // Extract video ID
        let videoId = '';
        if (videoUrl.includes('/embed/medias/')) {
          videoId = videoUrl.split('/embed/medias/')[1].split('?')[0];
        } else if (videoUrl.includes('/embed/iframe/')) {
          videoId = videoUrl.split('/embed/iframe/')[1].split('?')[0];
        } else if (videoUrl.includes('/medias/')) {
          videoId = videoUrl.split('/medias/')[1].split('?')[0];
        } else {
          videoId = videoUrl.split('/').pop()?.split('?')[0] || '';
        }

        console.log('▶️ Extracted video ID:', videoId);

        // Try to resume the specific video
        const wistiaApi = window.Wistia.api(videoId);
        if (wistiaApi) {
          console.log('▶️ Calling play on specific video...');
          wistiaApi.play();
          console.log('✅ Wistia video resumed successfully');
        } else {
          console.log('⚠️ Could not get specific API, trying all videos...');
          // Fallback: resume all Wistia videos
          const allVideos = window.Wistia.api.all();
          console.log('▶️ Found Wistia videos:', allVideos.length);

          if (allVideos.length > 0) {
            allVideos.forEach((video, index) => {
              // Only resume if it was previously playing
              if (video.currentTime() > 0) {
                console.log(`▶️ Resuming video ${index + 1}: ${video.hashedId()}`);
                video.play();
              }
            });
            console.log('✅ Wistia API resume completed');
          } else {
            console.log('❌ No Wistia videos found');
          }
        }
      } else {
        console.log('❌ Wistia API not available yet');

        // Fallback to iframe approach if API not loaded
        const iframe = document.querySelector('iframe');
        if (iframe) {
          console.log('▶️ Fallback: Using iframe postMessage...');
          iframe.contentWindow?.postMessage('{"method":"play"}', '*');
          iframe.contentWindow?.postMessage({method: 'play'}, '*');
        }
      }
    } else if (videoType === 'youtube') {
      console.log('▶️ YouTube resume...');
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow?.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } else if (videoType === 'vimeo') {
      console.log('▶️ Vimeo resume...');
      const iframe = document.querySelector('iframe');
      if (iframe) {
        iframe.contentWindow?.postMessage('{"method":"play"}', '*');
      }
    } else if (videoType === 'html5') {
      console.log('▶️ HTML5 resume...');
      const videoElement = document.querySelector('video');
      if (videoElement) {
        videoElement.play();
        console.log('✅ HTML5 video resumed');
      }
    }

    console.log('✅ Resume command completed');
  };

  const formattedUrl = getEmbedUrl(videoUrl, true); // Enable API for timestamp tracking

  // Extract video ID for Wistia div embedding
  const getWistiaVideoId = (url: string): string => {
    if (url.includes('/embed/medias/')) {
      return url.split('/embed/medias/')[1].split('?')[0];
    } else if (url.includes('/embed/iframe/')) {
      return url.split('/embed/iframe/')[1].split('?')[0];
    } else if (url.includes('/medias/')) {
      return url.split('/medias/')[1].split('?')[0];
    } else {
      return url.split('/').pop()?.split('?')[0] || 'nnbkix8deu';
    }
  };

  const wistiaVideoId = videoType === 'wistia' ? getWistiaVideoId(videoUrl) : '';

  // Log the formatted URL for debugging
  React.useEffect(() => {
    console.log('🎬 Original video URL:', videoUrl);
    console.log('🎬 Formatted iframe URL:', formattedUrl);
    console.log('🎬 Video type detected:', videoType);
    console.log('🎬 Wistia video ID:', wistiaVideoId);
  }, [videoUrl, formattedUrl, videoType, wistiaVideoId]);

  return (
    <>
      {title && (
        <h2 className="mb-6 text-2xl font-black text-center text-white md:text-3xl">
          {title}
        </h2>
      )}

      {title ? (
        // Original standalone layout with container - OPTIMIZED SIZE for ATF
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="overflow-hidden relative rounded-lg aspect-video bg-zinc-900">
            {!isVideoLoaded ? (
              /* Video Thumbnail/Play Button */
              <div
                className="flex justify-center items-center w-full h-full cursor-pointer group"
                onClick={handleLoadVideo}
              >
                <Image
                  src="/placeholder.svg"
                  alt="Wistia video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="flex absolute inset-0 justify-center items-center bg-black/30">
                  <div className="p-6 bg-red-700 rounded-full transition-transform hover:bg-red-800 group-hover:scale-110">
                    <span className="text-4xl text-white">▶</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Video Player */
              videoType === 'wistia' ? (
                /* Wistia requires div embedding for JavaScript API */
                <div
                  className={`wistia_embed wistia_async_${wistiaVideoId} autoPlay=true w-full h-full relative`}
                >
                  &nbsp;
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={formattedUrl}
                  title="Video Player"
                  className="w-full h-full border-0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )
            )}

            {/* Forced Choice Overlay - INSIDE video container, positioned absolutely to cover entire video */}
            {isVideoLoaded && forcedChoiceConfig && (
              <VideoForcedChoiceOverlay
                isVisible={isOverlayVisible}
                onMainAction={handleMainAction}
                onFinishVideoAction={handleFinishVideo}
                mainButtonText={forcedChoiceConfig.mainButtonText}
                overlayText={forcedChoiceConfig.overlayText}
                redirectUrl={forcedChoiceConfig.redirectUrl}
                onPauseVideo={pauseVideo}
                onResumeVideo={resumeVideo}
              />
            )}
          </div>
        </div>
      ) : (
        // Embedded layout - OPTIMIZED SIZE to match main page ATF requirements
        <div className="relative mx-auto w-full max-w-4xl">
          <div className="overflow-hidden relative rounded-lg aspect-video bg-zinc-900">
            {!isVideoLoaded ? (
              /* Video Thumbnail/Play Button */
              <div
                className="flex justify-center items-center w-full h-full cursor-pointer group"
                onClick={handleLoadVideo}
              >
                <Image
                  src="/placeholder.svg"
                  alt="Video thumbnail"
                  fill
                  className="object-cover"
                />
                <div className="flex absolute inset-0 justify-center items-center bg-black/30">
                  <div className="p-5 bg-red-600 rounded-full transition-transform hover:bg-red-700 group-hover:scale-110">
                    <span className="text-2xl text-white">▶</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Video Player */
              videoType === 'wistia' ? (
                /* Wistia requires div embedding for JavaScript API */
                <div
                  className={`wistia_embed wistia_async_${wistiaVideoId} autoPlay=true w-full h-full relative`}
                >
                  &nbsp;
                </div>
              ) : (
                <iframe
                  ref={iframeRef}
                  src={formattedUrl}
                  title="Video Player"
                  className="w-full h-full border-0"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )
            )}

            {/* Forced Choice Overlay - INSIDE video container to stay within bounds */}
            {isVideoLoaded && forcedChoiceConfig && (
              <VideoForcedChoiceOverlay
                isVisible={isOverlayVisible}
                onMainAction={handleMainAction}
                onFinishVideoAction={handleFinishVideo}
                mainButtonText={forcedChoiceConfig.mainButtonText}
                overlayText={forcedChoiceConfig.overlayText}
                redirectUrl={forcedChoiceConfig.redirectUrl}
                onPauseVideo={pauseVideo}
                onResumeVideo={resumeVideo}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
