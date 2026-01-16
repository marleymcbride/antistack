import { useEffect, useRef, useState } from "react";
import { VSLProgress } from "@/types/vsl.types";
import {
  getSessionId,
  getUserId,
  shouldTrackMilestone,
  trackVSLEvent,
} from "@/lib/vslAnalytics";
import { n8nEvents } from "@/lib/vslN8nWebhooks";

export const useVSLTracking = (videoId: string) => {
  const sessionId = useRef(getSessionId());
  const userId = useRef(getUserId());
  const startTime = useRef<number>(0);
  const [hasStarted, setHasStarted] = useState(false);

  const trackPlay = () => {
    if (!hasStarted) {
      setHasStarted(true);
      startTime.current = Date.now();

      trackVSLEvent({
        type: "play",
        videoId,
        timestamp: Date.now(),
        userId: userId.current,
        sessionId: sessionId.current,
      });

      n8nEvents.vslPlayStarted({
        userId: userId.current,
        videoId,
      });
    }
  };

  const trackPause = (currentTime: number) => {
    trackVSLEvent({
      type: "pause",
      videoId,
      timestamp: Date.now(),
      userId: userId.current,
      sessionId: sessionId.current,
      currentTime,
    });
  };

  const trackProgress = (progress: VSLProgress) => {
    if (shouldTrackMilestone(progress.percentage)) {
      const watchDuration = Math.floor((Date.now() - startTime.current) / 1000);

      trackVSLEvent({
        type: "progress",
        videoId,
        timestamp: Date.now(),
        userId: userId.current,
        sessionId: sessionId.current,
        progress: progress.percentage,
        currentTime: progress.currentTime,
      });

      n8nEvents.vslProgressMilestone({
        userId: userId.current,
        videoId,
        progress: progress.percentage,
        watchDuration,
      });
    }
  };

  const trackComplete = () => {
    const totalWatchTime = Math.floor((Date.now() - startTime.current) / 1000);

    trackVSLEvent({
      type: "complete",
      videoId,
      timestamp: Date.now(),
      userId: userId.current,
      sessionId: sessionId.current,
      metadata: { totalWatchTime },
    });

    n8nEvents.vslCompleted({
      userId: userId.current,
      videoId,
      totalWatchTime,
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted) {
        trackVSLEvent({
          type: "drop_off",
          videoId,
          timestamp: Date.now(),
          userId: userId.current,
          sessionId: sessionId.current,
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted, videoId]);

  return {
    trackPlay,
    trackPause,
    trackProgress,
    trackComplete,
  };
};
