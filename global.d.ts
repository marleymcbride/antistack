// Global type declarations for anti-stack project

// Wistia Player API
declare global {
  interface Window {
    Wistia?: {
      api: {
        (videoId: string): {
          bind: (event: string, callback: (time: number) => void) => void;
          currentTime: () => number;
          duration: () => number;
          play: () => void;
          pause: () => void;
          hashedId: () => string;
          time: (seconds?: number) => number; // Get or set current time
        };
        all(): Array<{
          bind: (event: string, callback: (time: number) => void) => void;
          currentTime: () => number;
          duration: () => number;
          play: () => void;
          pause: () => void;
          hashedId: () => string;
          time: (seconds?: number) => number; // Get or set current time
        }>;
      };
    };
  }

  // Cross-browser fullscreen API declarations
  interface Document {
    webkitFullscreenElement?: Element;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitExitFullscreen?: () => void;
    mozCancelFullScreen?: () => void;
    msExitFullscreen?: () => void;
  }

  interface Element {
    webkitRequestFullscreen?: (options?: FullscreenOptions) => Promise<void>;
    mozRequestFullScreen?: (options?: any) => Promise<void>;
    msRequestFullscreen?: (options?: any) => Promise<void>;
  }
}

export {};
