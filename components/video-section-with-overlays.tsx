'use client';

import { Button } from "@/components/ui/button";
import { getVideoType, getEmbedUrl, extractVideoId, VideoType } from '@/lib/video-utils';
import { useVideoOverlays } from '@/lib/use-video-overlays';
import VideoOverlayComponent, { VideoOverlay } from '@/components/video-overlay';
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import React from 'react';
import { useRouter } from 'next/navigation';

// Example overlay configurations for Anti-Stack video
const defaultOverlays: VideoOverlay[] = [
  {
    id: 'early-engagement',
    startTime: 60, // 1 minute
    endTime: 75, // 15 seconds duration
    position: 'bottom-right',
    type: 'cta',
    title: '🔥 Ready to Quit Caffeine?',
    subtitle: 'Join 742+ who ditched coffee addiction',
    buttonText: 'Get The Method',
    icon: 'mail',
    autoHide: false,
  },
  {
    id: 'transformation-proof',
    startTime: 180, // 3 minutes
    endTime: 200, // 20 seconds duration
    position: 'top-right',
    type: 'email',
    title: '⚡ Triple Your Energy',
    subtitle: 'Get the complete 21-day system',
    buttonText: 'Start Transformation',
    icon: 'external',
    autoHide: false,
  },
  {
    id: 'method-reveal',
    startTime: 300, // 5 minutes
    endTime: 320, // 20 seconds duration
    position: 'bottom-center',
    type: 'email',
    title: '🎯 The Anti-Stack Method',
    subtitle: 'Unlock what you just saw in the video',
    buttonText: 'Get Full System',
    icon: 'cart',
    autoHide: false,
  },
  {
    id: 'final-cta',
    startTime: 420, // 7 minutes
    endTime: 450, // 30 seconds duration
    position: 'center',
    type: 'email',
    title: '🚀 Don\'t Just Watch - ACT',
    subtitle: 'Get everything needed to transform like them',
    buttonText: 'Claim Your Spot',
    icon: 'mail',
    autoHide: false,
    className: 'scale-110', // Larger for final CTA
  },
];

interface VideoSectionWithOverlaysProps {
  overlays?: VideoOverlay[];
  showOverlays?: boolean;
  videoUrl?: string;
}

export default function VideoSectionWithOverlays({
  overlays = defaultOverlays,
  showOverlays = true,
  videoUrl: propVideoUrl
}: VideoSectionWithOverlaysProps) {
  const router = useRouter();
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [activeOverlays, setActiveOverlays] = React.useState<Map<string, VideoOverlay>>(new Map());
  const [currentTime, setCurrentTime] = React.useState(0);

  const videoUrl = propVideoUrl || process.env.NEXT_PUBLIC_VIDEO_URL || '';
  const videoType = getVideoType(videoUrl);
  const videoId = extractVideoId(videoUrl, videoType);
  const embedUrl = getEmbedUrl(videoUrl, true);
  const thumbnailUrl = '/placeholder.svg';

  const handleOverlayActive = (overlay: VideoOverlay, isActive: boolean) => {
    setActiveOverlays(prev => {
      const newMap = new Map(prev);
      if (isActive) {
        newMap.set(overlay.id, overlay);
      } else {
        newMap.delete(overlay.id);
      }
      return newMap;
    });
  };

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const closeOverlay = (overlayId: string) => {
    setActiveOverlays(prev => {
      const newMap = new Map(prev);
      newMap.delete(overlayId);
      return newMap;
    });
  };

  const { resetOverlays } = useVideoOverlays({
    videoRef,
    iframeRef,
    videoType,
    videoId: videoId || undefined,
    overlays: showOverlays ? overlays : [],
    onOverlayActive: handleOverlayActive,
    onTimeUpdate: handleTimeUpdate,
  });

  const handlePlay = () => {
    setIsPlaying(true);
    resetOverlays();
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Load platform-specific scripts
  React.useEffect(() => {
    if (videoType === 'wistia' && !window.Wistia) {
      const script = document.createElement('script');
      script.src = 'https://fast.wistia.net/assets/external/E-v1.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, [videoType]);

  const renderVideoPlayer = () => {
    if (!isPlaying) {
      // Show thumbnail with play button
      return (
        <>
          <div className="relative w-full h-full">
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Button
              onClick={handlePlay}
              className="flex items-center justify-center w-20 h-20 text-white transition-transform transform bg-red-600 rounded-full hover:bg-red-700 hover:scale-110"
            >
              <Play className="ml-1" size={28} />
            </Button>
          </div>
        </>
      );
    }

    // Show appropriate player based on video type
    switch (videoType) {
      case 'youtube':
        return (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title="YouTube Video"
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        );

      case 'vimeo':
        return (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title="Vimeo Video"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />
        );

      case 'wistia':
        return (
          <iframe
            ref={iframeRef}
            src={embedUrl}
            title="Wistia Video"
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        );

      case 'html5':
      default:
        return (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              autoPlay
              className="absolute inset-0 object-cover w-full h-full"
            />
            {/* Custom controls for HTML5 */}
            <div className="absolute flex space-x-2 bottom-4 left-4 z-20">
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-black/50 hover:bg-black/70"
                onClick={togglePlay}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-0 bg-black/50 hover:bg-black/70"
                onClick={toggleMute}
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </Button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="w-full pt-4 pb-8 mx-auto">
      {/* Step 1 */}
      <div className="mt-10 mb-6 text-center">
        <p className="text-lg text-red-500">
          <span className="font-bold">Step 1:</span> <span className="font-normal">Watch The Video</span>
        </p>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl md:text-5xl lg:text-6xl xl:text-5.3xl font-extrabold tracking-tight text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[30%] sm:max-w-[30%] md:max-w-[70%] mx-auto">
        How I tripled my energy without coffee, crazy supplements or spending my life in the gym
      </h1>

      <h2 className="text-1xl md:text-2xl lg:text-2xl xl:text-2xl font-medium tracking-tight text-sm/7 text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[30%] sm:max-w-[30%] md:max-w-[60%] mx-auto">
        Watch the video to steal the full &quot;Anti Stack&quot; method I used to completely cure my chronic tiredness without a single cup of coffee for 386 days, 0 expensive supplements stacks, and only training 2 days per week:
      </h2>

      {/* Video Container with Overlays */}
      <div className="w-full max-w-4xl px-4 mx-auto lg:max-w-2xl">
        <div className="relative w-full mb-10 lg:mb-6">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative lg:max-h-[480px]">
            {renderVideoPlayer()}

            {/* Video Overlays */}
            {Array.from(activeOverlays.values()).map((overlay) => (
              <VideoOverlayComponent
                key={overlay.id}
                overlay={overlay}
                isVisible={true}
                currentTime={currentTime}
                onClose={() => closeOverlay(overlay.id)}
              />
            ))}

            {/* Development indicator */}
            {process.env.NODE_ENV === 'development' && (
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded z-40">
                {videoType.toUpperCase()} | {Math.floor(currentTime)}s | {activeOverlays.size} overlays
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
