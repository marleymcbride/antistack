/**
 * Video utilities for handling video playback, embedding, and responsive behavior
 */

export interface VideoConfig {
  src: string;
  type?: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
}

/**
 * Creates HTML5 video attributes from a video configuration
 */
export function getVideoAttributes(config: VideoConfig) {
  return {
    src: config.src,
    poster: config.poster,
    autoPlay: config.autoplay || false,
    controls: config.controls !== false, // Default to true
    loop: config.loop || false,
    muted: config.muted || false,
    preload: config.preload || 'metadata',
  };
}

/**
 * Formats a YouTube URL into an embed URL
 */
export function formatYouTubeUrl(url: string): string {
  if (!url) return '';

  // Extract video ID from various YouTube URL formats
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;

  if (!videoId) return url;

  return `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
}

/**
 * Determines if the URL is for YouTube, Vimeo, or other video sources
 */
export function getVideoType(url: string): 'youtube' | 'vimeo' | 'html5' {
  if (!url) return 'html5';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }

  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }

  return 'html5';
}
