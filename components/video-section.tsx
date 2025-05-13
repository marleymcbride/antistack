'use client';

import React from 'react';
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { getVideoType, formatYouTubeUrl } from '@/lib/video-utils';

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
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm text-red-700 font-medium mb-2">STEP 1: WATCH THE VIDEO</p>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] font-bold max-w-4xl mx-auto">
            Discover How To Triple Your Energy In Just 21 Days Without Caffeine, Supplements, Or Stimulants
          </h1>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative aspect-video rounded-xl overflow-hidden shadow-xl">
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
                  className="absolute inset-0 w-full h-full object-cover"
                ></video>
              )
            ) : (
              // If not playing, show the thumbnail with play button
              <>
                <div className="relative w-full h-full">
                  <img
                    src={thumbnailUrl}
                    alt="Video thumbnail"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={handlePlay}
                    className="bg-red-700 hover:bg-red-800 text-white rounded-full w-16 h-16 flex items-center justify-center transition-transform transform hover:scale-110"
                  >
                    <Play className="ml-1" size={24} />
                  </Button>
                </div>
              </>
            )}

            {/* Video controls - only show when playing HTML5 video */}
            {isPlaying && videoType !== 'youtube' && (
              <div className="absolute bottom-4 left-4 flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black/50 border-0 hover:bg-black/70"
                  onClick={togglePlay}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-black/50 border-0 hover:bg-black/70"
                  onClick={toggleMute}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
