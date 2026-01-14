'use client';

import React from 'react';
import VideoSectionWithForcedChoice from "@/components/video-section-with-forced-choice";
import TestimonialSection from "@/components/testimonial-section";
import SuccessPopup from "@/components/success-popup";
import SystemUnlocks from "@/components/system-unlocks";

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
        {/* Video Section with Real Wistia Video */}
        <section className="w-full pb-0 bg-white">
          <div className="w-full pt-4 pb-2 mx-auto">
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

            {/* Real Wistia Video Container */}
            <div className="w-full max-w-4xl px-4 mx-auto lg:max-w-2xl">
              <div className="relative w-full mb-10 lg:mb-6">
                <VideoSectionWithForcedChoice
                  videoUrl="https://fast.wistia.com/embed/medias/nnbkix8deu"
                  forcedChoiceConfig={null} // Disable forced choice since they already signed up
                  autoPlay={true}
                  startTime={resumeTime} // Resume from where they left off
                  title=""
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
      <section className="w-full py-16 text-white bg-zinc-900">
        <div className="container max-w-4xl px-4 mx-auto text-center">
          {/* Narrower container just for the headline */}
          <div className="max-w-lg mx-auto">
            <p className="mb-10 text-2xl font-lg">Want the entire Limitless Systems to reach the top 1% over the next 90 days?</p>
          </div>

          {/* Wider container for the button */}
          <div className="w-4/5 px-4 mx-auto sm:px-0 md:px-0">
            <button className="w-full p-5 text-xl font-bold text-white bg-red-700 rounded hover:bg-red-800">
              Click here to gain 28 hours of energy each week, get your sex drive back and look better than guys half your age
            </button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
