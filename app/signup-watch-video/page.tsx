'use client';

import React from 'react';
import VideoSectionWithForcedChoice from "@/components/video-section-with-forced-choice";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";
import SuccessPopup from "@/components/success-popup";

export default function SignupWatchVideo() {
  const [showSuccessPopup, setShowSuccessPopup] = React.useState(true);

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
                <span className="font-bold">✅ You're In!</span> <span className="font-normal">Watch The Full Training</span>
              </p>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-5.3xl font-extrabold tracking-tight text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-[70%] mx-auto">
              How I tripled my energy without coffee, crazy supplements or spending my life in the gym
            </h1>
            <h2 className="text-lg md:text-2xl lg:text-2xl xl:text-2xl font-medium tracking-tight text-black text-center mb-6 px-4 sm:px-4 md:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-[60%] mx-auto leading-relaxed">
              Watch the video to steal the full "Anti Stack" method I used to completely cure my chronic tiredness without a single cup of coffee for 386 days, 0 expensive supplements stacks, and only training 2 days per week:
            </h2>

            {/* Real Wistia Video Container */}
            <div className="w-full max-w-4xl px-4 mx-auto lg:max-w-2xl">
              <div className="relative w-full mb-10 lg:mb-6">
                <VideoSectionWithForcedChoice
                  videoUrl="https://fast.wistia.com/embed/medias/nnbkix8deu"
                  forcedChoiceConfig={null} // Disable forced choice since they already signed up
                  autoPlay={true}
                  title=""
                />
              </div>
            </div>
          </div>
        </section>

      {/* What high performers are saying - LIGHTER GRAY SECTION */}
      <section className="w-full pb-8 text-white bg-zinc-800 pt-14">
        <div className="max-w-2xl px-4 mx-auto">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <section className="w-full pt-6 pb-16 text-white bg-zinc-800">
        <div className="max-w-xl px-4 mx-auto mb-8">
          <h3 className="mb-6 text-2xl font-bold text-center">What this system unlocks:</h3>

          <div className="p-6 mb-10 rounded-lg bg-zinc-900/70">
            <ul className="space-y-6">
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold">Master The Limitless Morning™ (Days 1-7)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  Discover the exact 5-minute energy sequence that makes cocaine feel like a J20.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold">Outdoctrinate with The Anti-Stack™ (Days 8-14)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  Learn the system that gives you all-day energy from within and makes &apos;supplement stacks&apos; obsolete.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold">Unlock the The Natty Sweet Spot™ (Days 15-21)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  The system to build a leaner, stronger physique in 2 sessions a week, your mental peace reduces while your testosterone skyrockets — the great crossover of the male life.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

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
  );
}
