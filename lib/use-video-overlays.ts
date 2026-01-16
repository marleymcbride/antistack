import React from 'react';
import { VideoType } from './video-utils';
import { VideoOverlay } from '@/components/video-overlay';

interface UseVideoOverlaysProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
  videoType: VideoType;
  videoId?: string;
  overlays: VideoOverlay[];
  onOverlayActive: (overlay: VideoOverlay, isActive: boolean) => void;
  onTimeUpdate: (currentTime: number) => void;
}

export const useVideoOverlays = ({
  videoRef,
  iframeRef,
  videoType,
  videoId,
  overlays,
  onOverlayActive,
  onTimeUpdate,
}: UseVideoOverlaysProps) => {
  const currentTime = React.useRef<number>(0);
  const activeOverlays = React.useRef<Set<string>>(new Set());

  React.useEffect(() => {
    if (!overlays.length) return;

    const checkOverlays = (time: number) => {
      currentTime.current = time;
      onTimeUpdate(time);

      overlays.forEach((overlay) => {
        const isInTimeRange = time >= overlay.startTime &&
          (!overlay.endTime || time <= overlay.endTime);

        const isCurrentlyActive = activeOverlays.current.has(overlay.id);

        if (isInTimeRange && !isCurrentlyActive) {
          // Overlay should become active
          activeOverlays.current.add(overlay.id);
          onOverlayActive(overlay, true);
        } else if (!isInTimeRange && isCurrentlyActive) {
          // Overlay should become inactive
          activeOverlays.current.delete(overlay.id);
          onOverlayActive(overlay, false);
        }
      });
    };

    if (videoType === 'html5' && videoRef.current) {
      // HTML5 video tracking
      const video = videoRef.current;

      const handleTimeUpdate = () => {
        checkOverlays(video.currentTime);
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
            if (event.data && typeof event.data === 'string') {
              const data = JSON.parse(event.data);
              if (data.event === 'video-progress' && data.info?.currentTime) {
                currentTime = data.info.currentTime;
              }
            }
          } else if (videoType === 'vimeo') {
            if (event.data && typeof event.data === 'string') {
              const data = JSON.parse(event.data);
              if (data.event === 'timeupdate' && data.data?.seconds) {
                currentTime = data.data.seconds;
              }
            }
          } else if (videoType === 'wistia') {
            if (event.data?.type === 'wistia_event' && event.data.event === 'timechange') {
              currentTime = event.data.time || 0;
            }
          }

          if (currentTime > 0) {
            checkOverlays(currentTime);
          }
        } catch (error) {
          // Ignore parsing errors from other iframe messages
        }
      };

      window.addEventListener('message', handleMessage);

      // Setup platform-specific listening
      if (videoType === 'vimeo' && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ method: 'addEventListener', value: 'timeupdate' }),
          '*'
        );
      }

      if (videoType === 'wistia' && videoId) {
        const setupWistia = () => {
          if (window.Wistia && window.Wistia.api) {
            const wistiaApi = window.Wistia.api(videoId);
            if (wistiaApi) {
              wistiaApi.bind('timechange', (time: number) => {
                checkOverlays(time);
              });
            }
          }
        };

        if (window.Wistia) {
          setupWistia();
        } else {
          window.addEventListener('wistia-ready', setupWistia);
        }
      }

      // Polling fallback
      const pollInterval = setInterval(() => {
        if (videoType === 'youtube' && iframeRef.current?.contentWindow) {
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
  }, [videoType, videoRef, iframeRef, videoId, overlays, onOverlayActive, onTimeUpdate]);

  const resetOverlays = () => {
    activeOverlays.current.clear();
    currentTime.current = 0;
  };

  const getCurrentTime = () => currentTime.current;

  return { resetOverlays, getCurrentTime };
};
