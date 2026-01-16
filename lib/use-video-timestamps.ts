import React from 'react';
import { VideoType } from './video-utils';

export interface VideoTimestamp {
  time: number; // in seconds
  id: string;
  type: 'popup' | 'cta' | 'content' | 'redirect';
  content?: React.ReactNode;
  url?: string;
  autoTrigger?: boolean;
}

interface UseVideoTimestampsProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
  videoType: VideoType;
  videoId?: string;
  timestamps: VideoTimestamp[];
  onTimestampReached: (timestamp: VideoTimestamp) => void;
}

export const useVideoTimestamps = ({
  videoRef,
  iframeRef,
  videoType,
  videoId,
  timestamps,
  onTimestampReached,
}: UseVideoTimestampsProps) => {
  const triggeredTimestamps = React.useRef<Set<string>>(new Set());
  const currentTime = React.useRef<number>(0);

  React.useEffect(() => {
    if (!timestamps.length) return;

    const checkTimestamps = (time: number) => {
      currentTime.current = time;
      timestamps.forEach((timestamp) => {
        if (
          time >= timestamp.time &&
          !triggeredTimestamps.current.has(timestamp.id)
        ) {
          triggeredTimestamps.current.add(timestamp.id);
          if (timestamp.autoTrigger !== false) {
            onTimestampReached(timestamp);
          }
        }
      });
    };

    if (videoType === 'html5' && videoRef.current) {
      // HTML5 video tracking
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        checkTimestamps(video.currentTime);
      };

      video.addEventListener('timeupdate', handleTimeUpdate);

      return () => {
        video.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }

    if ((videoType === 'youtube' || videoType === 'vimeo' || videoType === 'wistia') && iframeRef?.current) {
      // PostMessage API for iframe-based players
      const handleMessage = (event: MessageEvent) => {
        try {
          let currentTime = 0;

          if (videoType === 'youtube') {
            // YouTube iframe API
            if (event.data && typeof event.data === 'string') {
              const data = JSON.parse(event.data);
              if (data.event === 'video-progress' && data.info?.currentTime) {
                currentTime = data.info.currentTime;
              }
            }
          } else if (videoType === 'vimeo') {
            // Vimeo postMessage API
            if (event.data && typeof event.data === 'string') {
              const data = JSON.parse(event.data);
              if (data.event === 'timeupdate' && data.data?.seconds) {
                currentTime = data.data.seconds;
              }
            }
          } else if (videoType === 'wistia') {
            // Wistia postMessage API
            if (event.data?.type === 'wistia_event' && event.data.event === 'timechange') {
              currentTime = event.data.time || 0;
            }
          }

          if (currentTime > 0) {
            checkTimestamps(currentTime);
          }
        } catch (error) {
          // Ignore parsing errors from other iframe messages
        }
      };

      window.addEventListener('message', handleMessage);

      // Setup platform-specific listening
      if (videoType === 'vimeo' && iframeRef.current.contentWindow) {
        // Enable Vimeo API listening
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'timeupdate' }),
          '*'
        );
      }

      if (videoType === 'wistia' && videoId) {
        // Wistia setup - enable API tracking
        const setupWistia = () => {
          if (window.Wistia && window.Wistia.api) {
            const wistiaApi = window.Wistia.api(videoId);
            if (wistiaApi) {
              wistiaApi.bind('timechange', (time: number) => {
                checkTimestamps(time);
              });
            }
          }
        };

        // Try setup immediately, or wait for Wistia to load
        if (window.Wistia) {
          setupWistia();
        } else {
          window.addEventListener('wistia-ready', setupWistia);
        }
      }

      // Polling fallback for platforms that don't support reliable events
      const pollInterval = setInterval(() => {
        if (videoType === 'youtube' && iframeRef.current?.contentWindow) {
          // YouTube polling fallback
          iframeRef.current.contentWindow.postMessage(
            '{"event":"command","func":"getCurrentTime","args":""}',
            '*'
          );
        }
      }, 1000);

      return () => {
        window.removeEventListener('message', handleMessage);
        clearInterval(pollInterval);
      };
    }
  }, [videoType, videoRef, iframeRef, videoId, timestamps, onTimestampReached]);

  const resetTimestamps = () => {
    triggeredTimestamps.current.clear();
    currentTime.current = 0;
  };

  const getCurrentTime = () => currentTime.current;

  return { resetTimestamps, getCurrentTime };
};
