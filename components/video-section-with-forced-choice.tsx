'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { getEmbedUrl, getVideoType } from '@/lib/video-utils';
import { useVideoForcedChoice, ForcedChoiceConfig } from '@/lib/use-video-forced-choice';
import VideoForcedChoiceOverlay from './video-forced-choice-overlay';

interface VideoSectionWithForcedChoiceProps {
  videoUrl: string;
  forcedChoiceConfig?: ForcedChoiceConfig;
  title?: string;
  className?: string;
  onMainAction?: () => void;
}

export default function VideoSectionWithForcedChoice({
  videoUrl,
  forcedChoiceConfig,
  title = "Watch The Video",
  className = "",
  onMainAction
}: VideoSectionWithForcedChoiceProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const {
    isOverlayVisible,
    hideOverlay,
    resetTrigger,
    startVideoTimer
  } = useVideoForcedChoice(videoUrl, forcedChoiceConfig || null);

  const videoType = getVideoType(videoUrl);

  // Wistia script loading - CRITICAL for JavaScript API
  useEffect(() => {
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
  useEffect(() => {
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

  const handleLoadVideo = () => {
    setIsVideoLoaded(true);
    resetTrigger(); // Reset any previous triggers

    // Start the timer immediately when video loads
    setTimeout(() => {
      console.log('🎬 Starting video timer after load delay');
      startVideoTimer();
    }, 1000); // 1 second delay to ensure video actually starts
  };

  const handleMainAction = () => {
    if (onMainAction) {
      onMainAction();
    }
    hideOverlay();
  };

  const handleFinishVideo = () => {
    hideOverlay();
  };

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
  useEffect(() => {
    console.log('🎬 Original video URL:', videoUrl);
    console.log('🎬 Formatted iframe URL:', formattedUrl);
    console.log('🎬 Video type detected:', videoType);
    console.log('🎬 Wistia video ID:', wistiaVideoId);
  }, [videoUrl, formattedUrl, videoType, wistiaVideoId]);

  return (
    <div className={`w-full ${className}`}>
      {title && (
        <h2 className="text-2xl md:text-3xl font-black text-white mb-6 text-center">
          {title}
        </h2>
      )}

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Video Container */}
        <div className="relative aspect-video bg-zinc-900 rounded-lg overflow-hidden">
          {!isVideoLoaded ? (
            /* Video Thumbnail/Play Button */
            <div
              className="w-full h-full flex items-center justify-center cursor-pointer group"
              onClick={handleLoadVideo}
            >
              <img
                src="/placeholder.svg"
                alt="Wistia video thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="bg-red-700 hover:bg-red-800 rounded-full p-6 group-hover:scale-110 transition-transform">
                  <Play size={48} className="text-white ml-1" />
                </div>
              </div>
            </div>
          ) : (
            /* Video Player */
            videoType === 'wistia' ? (
              /* Wistia requires div embedding for JavaScript API */
              <div
                className={`wistia_embed wistia_async_${wistiaVideoId} autoPlay=true`}
                style={{ width: '100%', height: '100%', position: 'relative' }}
              >
                &nbsp;
              </div>
            ) : (
              <iframe
                ref={iframeRef}
                src={formattedUrl}
                title="Video Player"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ border: 'none' }}
              />
            )
          )}

          {/* Forced Choice Overlay */}
          {isVideoLoaded && forcedChoiceConfig && (
            <VideoForcedChoiceOverlay
              isVisible={isOverlayVisible}
              onMainAction={handleMainAction}
              onFinishVideo={handleFinishVideo}
              mainButtonText={forcedChoiceConfig.mainButtonText}
              overlayText={forcedChoiceConfig.overlayText}
              redirectUrl={forcedChoiceConfig.redirectUrl}
              onPauseVideo={pauseVideo}
              onResumeVideo={resumeVideo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
