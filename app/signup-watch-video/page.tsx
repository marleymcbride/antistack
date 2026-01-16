'use client';

import React from 'react';
import BunnyVSLPlayer from "@/components/bunny-vsl-player";
import TestimonialSection from "@/components/testimonial-section";
import SuccessPopup from "@/components/success-popup";
import SystemUnlocks from "@/components/system-unlocks";
import FinalCTAButton from "@/components/final-cta-button";

// Copy variations for forced choice overlay
const copyVariations = {
  energyPromise: {
    triggerTime: 10,
    overlayText: "Ready to jump out of bed in the next 3 weeks? Get the complete system below:",
    mainButtonText: "JUMP OUT OF BED →",
    redirectUrl: "/blueprint-from-video"
  }
};

const CURRENT_VARIATION = copyVariations.energyPromise;

export default function SignupWatchVideo() {
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(true);
  const [resumeTime, setResumeTime] = React.useState(0);

  // Get stored video timestamp on page load
  React.useEffect(() => {
    const storedTime = localStorage.getItem('videoResumeTime');
    if (storedTime) {
      const timeInSeconds = parseFloat(storedTime);
      if (timeInSeconds > 0) {
        setResumeTime(timeInSeconds);
        console.log(`📺 Resuming video from ${timeInSeconds}s`);
        // Clear the stored time after using it
        localStorage.removeItem('videoResumeTime');
      }
    }
  }, []);

  return (
    <>
      {/* Success Popup */}
      <SuccessPopup
        isVisible={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
      />

      <main className="flex flex-col items-center min-h-screen">
        {/* Video Section with Bunny.net Video */}
        <section className="pb-6 w-full bg-white">
          <div className="pt-4 pb-2 mx-auto w-full">
            {/* Success Message replacing Step 1 */}
            <div className="mt-8 mb-6 text-center">
              <p className="text-lg text-green-600">
                <span className="font-bold">✅ Access Granted</span> <span className="font-normal">Continue Your Exclusive Training</span>
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-black text-center mb-6 px-4 max-w-[90%] sm:max-w-[85%] md:max-w-[70%] mx-auto">
              How I tripled my energy without coffee, crazy supplements or spending my life in the gym
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium tracking-tight text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-[60%] mx-auto leading-relaxed">
              Watch the video to steal the full &quot;Anti Stack&quot; method I used to completely cure my chronic tiredness without a single cup of coffee for 386 days, 0 expensive supplements stacks, and only training 2 days per week:
            </h2>

            {/* Video Container - Bunny.net VSL Player */}
            <div className="px-4 mx-auto mt-8 w-full max-w-4xl lg:max-w-3xl">
              <div className="relative mb-4 w-full lg:mb-4" data-video-container="true">
                <BunnyVSLPlayer
                  libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || "your-library-id-here"}
                  videoId={process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID || "your-video-id-here"}
                  title=""
                  forcedChoiceConfig={CURRENT_VARIATION}
                  autoPlay={true}
                  startTime={resumeTime}
                />
              </div>
            </div>
          </div>
        </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <SystemUnlocks />

      {/* Testimonials Section - Light */}
      <TestimonialSection />

      {/* Ready to go faster - Moved to bottom with dark background */}
      <section className="py-24 w-full text-white bg-zinc-900">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          {/* Narrower container just for the headline */}
          <div className="mx-auto max-w-3xl">
            <p className="mx-6 mb-10 text-2xl font-thin md:font-medium lg:font-medium">
              Want the shortcut to gain 28 hours of energy each week, get your sex drive back and look better than guys half your age?
              </p>
          </div>

          {/* Button container - same width as email forms */}
          <div className="mx-auto max-w-[290px] md:max-w-md">
            <FinalCTAButton />
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
