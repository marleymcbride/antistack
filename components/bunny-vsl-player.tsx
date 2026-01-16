'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';
import { useVSLTracking } from '@/hooks/useVSLTracking';
import { VSLPlayerProps, VSLProgress } from '@/types/vsl.types';
import VideoForcedChoiceOverlay from './video-forced-choice-overlay';
import { ForcedChoiceConfig } from '@/lib/use-video-forced-choice';

interface BunnyVSLPlayerProps {
  libraryId: string;
  videoId: string;
  forcedChoiceConfig?: ForcedChoiceConfig | null;
  title?: string;
  className?: string;
  onMainAction?: () => void;
  autoPlay?: boolean;
  startTime?: number;
  showOverlay?: boolean;
}

export default function BunnyVSLPlayer({
  libraryId,
  videoId,
  forcedChoiceConfig,
  title = "Watch The Video",
  className = "",
  onMainAction,
  autoPlay = true,
  startTime = 0,
  showOverlay = false
}: BunnyVSLPlayerProps) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const tracking = useVSLTracking(videoId);

  // Update isVideoLoaded when autoPlay prop changes
  useEffect(() => {
    if (autoPlay) {
      console.log('▶️ autoPlay changed to true, loading video');
      setIsVideoLoaded(true);
      // Set iframe src with timestamp to force reload
      const url = getBunnyEmbedUrl();
      setIframeSrc(`${url}&t=${Date.now()}`);
    }
  }, [autoPlay]);

  // Initialize iframe src on mount
  useEffect(() => {
    if (!autoPlay) {
      // Pre-load iframe src but don't autoplay
      setIframeSrc(getBunnyEmbedUrl());
    }
  }, []);

  // Handle overlay visibility - pause video when overlay appears
  useEffect(() => {
    if (!playerRef.current) return;

    if (showOverlay) {
      console.log('🛑 Pausing video due to overlay');
      setOverlayVisible(true);
      playerRef.current.pause();
    } else if (overlayVisible && !showOverlay) {
      console.log('▶️ Resuming video after overlay closed');
      setOverlayVisible(false);
      playerRef.current.play();
    }
  }, [showOverlay, overlayVisible]);

  // Bunny.net iframe URL
  const getBunnyEmbedUrl = () => {
    return `https://iframe.mediadelivery.net/embed/${libraryId}/${videoId}?autoplay=true&preload=true&muted=false&hideLogo=true`;
  };

  // Load Player.js for Bunny.net (optional - for analytics only now)
  useEffect(() => {
    if (!isVideoLoaded) return;

    // Try multiple CDN sources for Player.js
    const cdnSources = [
      'https://cdn.jsdelivr.net/npm/player.js@latest/dist/player.js',
      'https://unpkg.com/player.js@latest/dist/player.js',
      'https://cdn.jsdelivr.net/gh/bobbybrennan/player.js@master/dist/player.js'
    ];

    let currentIndex = 0;

    const loadFromSource = (index: number) => {
      if (index >= cdnSources.length) {
        console.log('❌ All Player.js CDN sources failed');
        return;
      }

      const script = document.createElement('script');
      script.src = cdnSources[index];
      script.async = true;
      script.onload = () => {
        console.log(`✅ Player.js loaded from source ${index}`);
        initializePlayer();
      };
      script.onerror = () => {
        console.log(`⚠️ Player.js source ${index} failed, trying next...`);
        loadFromSource(index + 1);
      };
      document.head.appendChild(script);
    };

    const initializePlayer = () => {
      setTimeout(() => {
        if (iframeRef.current) {
          try {
            playerRef.current = new (window as any).playerjs.Player(iframeRef.current);
            console.log('✅ Bunny.net Player.js initialized');
            setupPlayerEvents();
          } catch (error) {
            console.error('Error initializing Player.js:', error);
          }
        }
      }, 1000);
    };

    loadFromSource(0);

    return () => {
      // Cleanup
      const scripts = document.head.querySelectorAll('script[src*="player.js"]');
      scripts.forEach(s => {
        if (s.parentNode) {
          s.parentNode.removeChild(s);
        }
      });
    };
  }, [isVideoLoaded]);

  const setupPlayerEvents = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    console.log('🔧 Setting up Player.js event listeners...');

    // Log ALL events for debugging
    const events = ['ready', 'play', 'pause', 'end', 'time', 'progress', 'error'];
    events.forEach(event => {
      player.on(event, (data: any) => {
        console.log(`📢 Player.js event "${event}":`, data);
      });
    });

    // Play event
    player.on('play', () => {
      console.log('▶️ Video playing - hiding overlay');
      setOverlayVisible(false);
      tracking.trackPlay();
      startProgressTracking();
    });

    // Pause event
    player.on('pause', () => {
      console.log('⏸️ Video paused - showing overlay');
      setOverlayVisible(true);
      tracking.trackPause(currentTime);
    });

    // Ready event
    player.on('ready', () => {
      console.log('✅ Bunny player ready');

      // Get video duration
      player.getDuration((d: number) => {
        setDuration(d);
        console.log(`📹 Video duration: ${d}s`);

        // Auto-play if autoplay is enabled
        if (autoPlay) {
          setTimeout(() => {
            console.log('▶️ Auto-playing video after ready');
            player.play();
          }, 500);
        }
      });

      // Seek to start time if provided
      if (startTime > 0) {
        player.setCurrentTime(startTime);
        console.log(`⏩ Seeking to ${startTime}s`);
      }
    });

    console.log('✅ All Player.js event listeners registered');
  }, [tracking, autoPlay, startTime]);

  const startProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) return;

    progressIntervalRef.current = setInterval(() => {
      playerRef.current?.getCurrentTime((time: number) => {
        setCurrentTime(time);

        if (duration > 0) {
          const percentage = (time / duration) * 100;
          tracking.trackProgress({
            currentTime: time,
            duration,
            percentage
          });
        }
      });
    }, 1000);
  }, [tracking, duration]);

  const stopProgressTracking = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const handleLoadVideo = useCallback(() => {
    // Trigger the parent's popup instead of loading video
    if (onMainAction) {
      console.log('🎯 Video clicked - triggering popup');
      onMainAction();
    }
  }, [onMainAction]);

  const handleMainAction = () => {
    if (onMainAction) {
      onMainAction();
    }
  };

  const toggleMute = () => {
    const player = playerRef.current;
    if (!player) return;

    player.getMuted((muted: boolean) => {
      if (muted) {
        player.unmute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    });
  };

  return (
    <>
      {title && (
        <h2 className="mb-6 text-2xl font-black text-center text-white md:text-3xl">
          {title}
        </h2>
      )}

      <div className={`relative mx-auto w-full max-w-4xl ${className}`}>
        <div className="overflow-hidden relative rounded-lg aspect-video bg-zinc-900">
          {/* Always show Bunny.net Video Player */}
          <div
            className={`relative w-full h-full ${!isVideoLoaded ? 'cursor-pointer' : ''}`}
            onClick={!isVideoLoaded ? handleLoadVideo : undefined}
          >
            <iframe
              ref={iframeRef}
              src={iframeSrc}
              title="Video Player"
              className={`w-full h-full border-0 ${!isVideoLoaded ? 'pointer-events-none' : ''}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              scrolling="no"
            />
          </div>

          {/* Forced Choice Overlay */}
          {isVideoLoaded && forcedChoiceConfig && (
            <VideoForcedChoiceOverlay
              isVisible={overlayVisible}
              onMainAction={handleMainAction}
              onFinishVideoAction={() => {
                setOverlayVisible(false);
                // Resume video using postMessage
                if (iframeRef.current) {
                  iframeRef.current.contentWindow?.postMessage({ event: 'play' }, '*');
                }
              }}
              mainButtonText={forcedChoiceConfig.mainButtonText}
              overlayText={forcedChoiceConfig.overlayText}
              redirectUrl={forcedChoiceConfig.redirectUrl}
              onPauseVideo={() => {
                // Pause video using postMessage
                if (iframeRef.current) {
                  iframeRef.current.contentWindow?.postMessage({ event: 'pause' }, '*');
                }
                setOverlayVisible(true);
              }}
              onResumeVideo={() => {
                setOverlayVisible(false);
                // Resume video using postMessage
                if (iframeRef.current) {
                  iframeRef.current.contentWindow?.postMessage({ event: 'play' }, '*');
                }
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
