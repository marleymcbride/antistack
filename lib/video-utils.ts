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
 * Formats a YouTube URL into an embed URL with API support
 */
export function formatYouTubeUrl(url: string, enableApi: boolean = false): string {
  if (!url) return '';

  // Extract video ID from various YouTube URL formats
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;

  if (!videoId) return url;

  const apiParams = enableApi ? '&enablejsapi=1&origin=' + window.location.origin : '';
  return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1${apiParams}`;
}

/**
 * Formats a Vimeo URL into an embed URL with API support
 */
export function formatVimeoUrl(url: string, enableApi: boolean = false): string {
  if (!url) return '';

  // Extract video ID from Vimeo URL
  const regExp = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
  const match = url.match(regExp);
  const videoId = match ? match[1] : null;

  if (!videoId) return url;

  const apiParams = enableApi ? '&player_id=vimeo-player&api=1' : '';
  return `https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0${apiParams}`;
}

/**
 * Formats a Wistia URL into an embed URL
 */
export function formatWistiaUrl(url: string): string {
  if (!url) return '';

  // Extract video ID from Wistia URL
  const regExp = /(?:wistia\.(?:com|net))\/(?:medias|embed)\/([a-zA-Z0-9]+)/;
  const match = url.match(regExp);
  const videoId = match ? match[1] : null;

  if (!videoId) return url;

  return `https://fast.wistia.net/embed/iframe/${videoId}?videoFoam=true&autoPlay=true`;
}

/**
 * Extracts video ID from various platform URLs
 */
export function extractVideoId(url: string, platform: VideoType): string | null {
  if (!url) return null;

  switch (platform) {
    case 'youtube':
      const youtubeRegex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      const youtubeMatch = url.match(youtubeRegex);
      return youtubeMatch && youtubeMatch[7].length === 11 ? youtubeMatch[7] : null;

    case 'vimeo':
      const vimeoRegex = /(?:vimeo)\.com.*(?:videos|video|channels|)\/([\d]+)/i;
      const vimeoMatch = url.match(vimeoRegex);
      return vimeoMatch ? vimeoMatch[1] : null;

    case 'wistia':
      const wistiaRegex = /(?:wistia\.(?:com|net))\/(?:medias|embed)\/([a-zA-Z0-9]+)/;
      const wistiaMatch = url.match(wistiaRegex);
      return wistiaMatch ? wistiaMatch[1] : null;

    default:
      return null;
  }
}

/**
 * Video platform types
 */
export type VideoType = 'youtube' | 'vimeo' | 'wistia' | 'html5';

/**
 * Determines the video platform type from URL
 */
export function getVideoType(url: string): VideoType {
  if (!url) return 'html5';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube';
  }

  if (url.includes('vimeo.com')) {
    return 'vimeo';
  }

  if (url.includes('wistia.com') || url.includes('wistia.net')) {
    return 'wistia';
  }

  return 'html5';
}

/**
 * Get the appropriate embed URL for any video platform
 */
export function getEmbedUrl(url: string, enableApi: boolean = false): string {
  const type = getVideoType(url);

  switch (type) {
    case 'youtube':
      return formatYouTubeUrl(url, enableApi);
    case 'vimeo':
      return formatVimeoUrl(url, enableApi);
    case 'wistia':
      return formatWistiaUrl(url);
    default:
      return url;
  }
}
