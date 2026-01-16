export type VideoQuality = 'auto' | '1080p' | '720p' | '480p';

export interface VideoQualityOption {
  label: string;
  value: VideoQuality;
  description: string;
}

export interface VSLPlayerProps {
  libraryId: string;
  videoId?: string;
  className?: string;
  onReady?: () => void;
  onPlay?: () => void;
  onPause?: (currentTime: number) => void;
  onProgress?: (progress: VSLProgress) => void;
  onComplete?: () => void;
  onQualityChange?: (quality: VideoQuality) => void;
  autoplay?: boolean;
  muted?: boolean;
  controls?: boolean;
  preload?: boolean;
  showQualitySelector?: boolean;
  availableQualities?: VideoQuality[];
  pauseOverlayContainer?: string;
}

export interface VSLProgress {
  currentTime: number;
  duration: number;
  percentage: number;
  milestone?: 25 | 50 | 75 | 90 | 100;
}

export interface VSLAnalyticsEvent {
  type: "play" | "pause" | "progress" | "complete" | "drop_off";
  videoId: string;
  timestamp: number;
  userId?: string;
  sessionId: string;
  currentTime?: number;
  progress?: number;
  metadata?: Record<string, any>;
}

export interface PlayerJSPlayer {
  on: (event: string, callback: (data?: any) => void) => void;
  off: (event: string, callback?: (data?: any) => void) => void;
  play: () => void;
  pause: () => void;
  getPaused: (callback: (paused: boolean) => void) => void;
  mute: () => void;
  unmute: () => void;
  getMuted: (callback: (muted: boolean) => void) => void;
  setVolume: (volume: number) => void;
  getVolume: (callback: (volume: number) => void) => void;
  getDuration: (callback: (duration: number) => void) => void;
  setCurrentTime: (time: number) => void;
  getCurrentTime: (callback: (time: number) => void) => void;
  setLoop: (loop: boolean) => void;
  getLoop: (callback: (loop: boolean) => void) => void;
  supports: (method: string, value: string) => boolean;
}

declare global {
  interface Window {
    playerjs: {
      Player: new (element: HTMLIFrameElement | string) => PlayerJSPlayer;
    };
  }
}
