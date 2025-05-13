'use client';

import { Button } from "@/components/ui/button";
import { formatYouTubeUrl, getVideoType } from '@/lib/video-utils';
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import React from 'react';

export default function VideoSection() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  // You'll replace this with your actual video URL
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || '';
  const videoType = getVideoType(videoUrl);
  const thumbnailUrl = '/placeholder.svg'; // Replace with actual thumbnail

  const handlePlay = () => {
    setIsPlaying(true);
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

  return (
    <div className="w-full py-6 mx-auto">
      {/* Step 1 */}
      <div className="mt-16 mb-6 text-center">
        <p className="text-lg text-red-500">
          <span className="font-bold">Step 1:</span> <span className="font-normal">Watch The Video</span>
        </p>
      </div>

      {/* Main Headline */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[90%] sm:max-w-[90%] md:max-w-[70%] mx-auto" style={{ fontSize: "4.5rem", lineHeight: "1" }}>
        How I Got Jacked With All-Day Energy Using No Supplements, Still Eating Steak Dinners And Training 2 Days A Week
      </h1>

      <div className="w-full max-w-4xl px-4 mx-auto lg:max-w-3xl">
        <div className="relative w-full mb-10 lg:mb-6">
          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden relative lg:max-h-[480px]">
            {isPlaying ? (
              // If video is playing, show the appropriate player based on video type
              videoType === 'youtube' ? (
                <iframe
                  src={formatYouTubeUrl(videoUrl)}
                  title="Video"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  controls
                  autoPlay
                  className="absolute inset-0 object-cover w-full h-full"
                ></video>
              )
            ) : (
              // If not playing, show the thumbnail with play button
              <>
                <div className="relative w-full h-full">
                  <img
                    src={thumbnailUrl}
                    alt=""
                    className="absolute inset-0 object-cover w-full h-full"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={handlePlay}
                    className="flex items-center justify-center w-20 h-20 text-white transition-transform transform bg-red-600 rounded-full hover:bg-red-700 hover:scale-110"
                  >
                    <Play className="ml-1" size={28} />
                  </Button>
                </div>
              </>
            )}

            {/* Video controls - only show when playing HTML5 video */}
            {isPlaying && videoType !== 'youtube' && (
              <div className="absolute flex space-x-2 bottom-4 left-4">
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
