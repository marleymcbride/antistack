"use client";

import React from "react";
import { useRouter } from "next/navigation";
import BunnyVSLPlayer from "@/components/bunny-vsl-player";
import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import ProofSection from "@/components/proof-section";
import SystemUnlocks from "@/components/system-unlocks";
import The3TestimonialsBox from "@/components/the-3-testimonials-box";
import FinalCTAButton from "@/components/final-cta-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Create alias for EmailSignup without testimonials
const EmailSignupWithoutTestimonials = EmailSignup;

// ===== FORCED CHOICE COPY VARIATIONS =====
// Change the variation below to test different copy on your main page
const copyVariations = {
  // Variation A: Drag vs Glide Energy (Core concept) - CONCEPTUAL
  dragVsGlide: {
    triggerTime: 10,
    overlayText: "Tired of DRAG ENERGY? That 3pm crash, caffeine dependency, constant fatigue?",
    mainButtonText: "UNLOCK GLIDE ENERGY →",
    redirectUrl: "/blueprint-from-video"
  },

  // Variation B: 4% Trap (Scott's current situation) - SHORTENED
  fourPercentTrap: {
    triggerTime: 10,
    overlayText: "You're health-conscious, hit the gym, watch your diet... but stuck in the 4% TRAP.",
    mainButtonText: "BREAK INTO THE 1% →",
    redirectUrl: "/blueprint-from-video"
  },

  // Variation C: Anti-Stack Direct (Solution focused) - PUNCHY
  antiStackDirect: {
    triggerTime: 10,
    overlayText: "Ready to quit caffeine without the crashes? The Anti-Stack™ works.",
    mainButtonText: "GET THE ANTI-STACK →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation D: Executive Pain Point (Scott's morning struggle) - TARGETED
  executivePain: {
    triggerTime: 10,
    overlayText: "Wake up exhausted? Need 3 coffees to function? Brain fog at 4pm?",
    mainButtonText: "FIX MY ENERGY →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation E: Freedom > Frequency (Contrarian approach) - SHARP
  freedomOverFrequency: {
    triggerTime: 10,
    overlayText: "Stop training 5-7 days a week. Get better results with 2-3 sessions.",
    mainButtonText: "TRAIN LESS, ACHIEVE MORE →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation F: Natty Sweet Spot (Ultimate Male Form) - POWERFUL
  nattySweetSpot: {
    triggerTime: 10,
    overlayText: "The Natty Sweet Spot™: Where strength, energy, and aesthetics converge. No substances.",
    mainButtonText: "REACH THE SWEET SPOT →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation G: Lion vs Worker Bee (Lifestyle contrast) - IDENTITY
  lionVsWorkerBee: {
    triggerTime: 10,
    overlayText: "LION: Rest, recover, then dominate. WORKER BEE: Grind until burnout. Which are you?",
    mainButtonText: "BECOME THE LION →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation H: Time-focused (Scott's biggest constraint) - DIRECT
  timeFocused: {
    triggerTime: 10,
    overlayText: "Work 12-16 hour days? No time for complex diets? This system fits your schedule.",
    mainButtonText: "FITS MY SCHEDULE →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation I: Social Proof + Results (High conversion) - CREDIBLE
  socialProof: {
    triggerTime: 10,
    overlayText: "742+ executives ditched caffeine using this. Client L: -35lbs, 15 months sober.",
    mainButtonText: "JOIN THE 742 →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation J: ROI/Business Focus (Scott's language) - BUSINESS
  businessRoi: {
    triggerTime: 10,
    overlayText: "Your energy = your most valuable asset. Stop trading performance for quick fixes.",
    mainButtonText: "MAXIMIZE MY ROI →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation K: Direct Challenge (Polarizing) - PROVOCATIVE
  directChallenge: {
    triggerTime: 10,
    overlayText: "Still depending on caffeine like a crutch? Time to fuel your body properly.",
    mainButtonText: "EVOLVE NOW →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation L: Fear of Missing Out (Urgency) - COMPETITIVE
  fomo: {
    triggerTime: 10,
    overlayText: "While you crash at 3pm, the 1% operate at peak energy all day. Join them.",
    mainButtonText: "JOIN THE 1% →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation M: Short & Shocking - MINIMAL
  shocking: {
    triggerTime: 10,
    overlayText: "3 coffees a day = 30 years off your life expectancy.",
    mainButtonText: "BREAK THE CYCLE →",
    redirectUrl: "https://your-sales-page.com"
  },

  // Variation N: Question Hook - ENGAGING
  questionHook: {
    triggerTime: 10,
    overlayText: "What if you could have unlimited energy without caffeine, alcohol, or stimulants?",
    mainButtonText: "SHOW ME HOW →",
    redirectUrl: "https://your-sales-page.com"
  },

  // NEW Variation O: Energy Promise (Perfect for main page) - SMOOTH
  energyPromise: {
    triggerTime: 10,
    overlayText: "Ready to jump out of bed in the next 3 weeks? Get the complete system below:",
    mainButtonText: "JUMP OUT OF BED →",
    redirectUrl: "/blueprint-from-video"
  }
};

// ===== EASY CONFIGURATION - CHANGE THIS LINE TO TEST DIFFERENT COPY =====
const CURRENT_VARIATION = copyVariations.energyPromise; // ← Change "energyPromise" to any variation name above

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [videoKey, setVideoKey] = React.useState(0); // Key to force video restart
  const [videoCanPlay, setVideoCanPlay] = React.useState(false); // Video can only play after popup is dismissed

  // Handler when user clicks the video play button
  const handleVideoClick = () => {
    if (!videoCanPlay) {
      console.log('🎯 Video clicked - showing popup first');
      setShowPopup(true);
    }
  };

  // Function to restart video
  const restartVideo = () => {
    console.log('🔄 Restarting video...');
    setVideoKey(prev => prev + 1); // Force component remount with new key
  };

  // Function to enter fullscreen using Bunny.net's iframe
  const enterFullscreen = () => {
    console.log('🖥️ Entering fullscreen via Bunny.net iframe...');

    // Find the Bunny.net iframe and request fullscreen
    const bunnyIframe = document.querySelector('iframe[src*="mediadelivery.net"]') ||
                        document.querySelector('iframe[src*="b-cdn.net"]');

    if (bunnyIframe) {
      console.log('✅ Found Bunny.net iframe for fullscreen');
      if (bunnyIframe.requestFullscreen) {
        bunnyIframe.requestFullscreen();
      } else if ((bunnyIframe as any).webkitRequestFullscreen) {
        (bunnyIframe as any).webkitRequestFullscreen();
      } else if ((bunnyIframe as any).mozRequestFullScreen) {
        (bunnyIframe as any).mozRequestFullScreen();
      } else if ((bunnyIframe as any).msRequestFullscreen) {
        (bunnyIframe as any).msRequestFullscreen();
      } else {
        console.log('⚠️ Fullscreen not supported on this browser');
      }
    } else {
      console.log('❌ Bunny.net iframe not found, retrying in 1 second...');
      setTimeout(() => {
        enterFullscreen();
      }, 1000);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Validate email format
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      console.error('Invalid email format');
      return;
    }

    setIsSubmitting(true);

    try {
      // Get current video time before redirecting from Bunny.net player
      let currentVideoTime = 0;
      const bunnyIframe = document.querySelector('iframe[src*="mediadelivery.net"]') as HTMLIFrameElement;

      if (bunnyIframe && (window as any).playerjs) {
        // Try to get current time from Player.js instance
        try {
          const player = new (window as any).playerjs.Player(bunnyIframe);
          player.getCurrentTime((time: number) => {
            currentVideoTime = time;
            console.log(`🎬 Saving video timestamp: ${currentVideoTime}s`);
          });
        } catch (error) {
          console.log('⚠️ Could not get video time:', error);
        }
      }

      // Store video timestamp in localStorage
      if (currentVideoTime > 0) {
        localStorage.setItem('videoResumeTime', currentVideoTime.toString());
        console.log(`💾 Video time saved: ${currentVideoTime}s`);
      }

      // Submit to N8N webhook with dual-endpoint fallback
      const { submitToN8nWebhook } = await import('../lib/n8n-webhook-client');

      await submitToN8nWebhook(
        email,
        '', // firstName - empty for this form
        'main-page-section' // source tracking
      );

      // Success - redirect to signup-watch-video page
      router.push('/signup-watch-video');
      return;

    } catch (error) {
      console.error('N8N webhook error:', error);
      // Note: This maintains existing error handling pattern
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWatchVideo = () => {
    console.log('▶️ Dismissing popup - starting video and entering fullscreen');
    setShowPopup(false);
    setVideoCanPlay(true);

    // Auto-enter fullscreen after a short delay
    setTimeout(() => {
      enterFullscreen();
    }, 1200);
  };

  const handleClose = () => {
    console.log('▶️ Dismissing popup - starting video');
    setShowPopup(false);
    setVideoCanPlay(true);
  };

  return (
    <>
      {/* Full Page Email Popup */}
      {showPopup && (
        <div
          className="flex fixed inset-0 z-50 justify-center items-center backdrop-blur-sm duration-300 bg-black/80 animate-in fade-in"
          onClick={(e) => {
            if (e.target === e.currentTarget) handleClose();
          }}
        >
          <div className="relative w-full max-w-3xl mx-4 bg-[#940909] rounded-2xl p-9 md:p-11 animate-in zoom-in duration-300">
            {/* Top Right Corner */}
            <div className="flex absolute top-5 right-6 gap-4 items-center">
              <button
                onClick={handleWatchVideo}
                className="text-sm font-medium transition-colors text-white/70 hover:text-white"
              >
                See how it works first
              </button>
              <button
                onClick={handleClose}
                className="text-xl text-white/70 hover:text-white"
              >
                ×
              </button>
            </div>

            {/* Main Content */}
            <div className="pt-8">
              {/* Headline */}
              <h1 className="mb-6 text-3xl font-black text-center text-white md:text-4xl lg:text-4xl">
                Hey, quick one before you watch the video
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-center text-red-50 md:text-lg">
                If you want to get full access to a 3 week blueprint where I show you EXACTLY how you can triple your energy, pop your email in here and I&apos;ll start sending it over completely free from today.
              </p>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="px-5 py-5 w-full text-xl text-black bg-white rounded-lg border-0 placeholder:text-gray-500 focus:ring-2 focus:ring-white"
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-6 w-full text-lg font-bold text-white bg-black rounded-lg transition-colors hover:bg-gray-900"
                >
                  {isSubmitting ? 'Subscribing...' : 'Send Me The System →'}
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="flex gap-6 justify-center items-center mt-6 text-sm text-red-50">
                <span className="flex gap-1 items-center">
                  <span className="text-white">✓</span> Instant access
                </span>
                <span className="flex gap-1 items-center">
                  <span className="text-white">✓</span> No spam
                </span>
                <span className="flex gap-1 items-center">
                  <span className="text-white">✓</span> Unsubscribe anytime
                </span>
              </div>

              {/* Bottom Section */}
              <div className="mt-8 text-center">
                <p className="mb-2 font-medium text-white">
                  Wanna steal my entire system?
                </p>
                <p className="text-sm font-bold text-red-50">
                Pop your email in and you&apos;ll have the step first in your inbox by the time you&apos;ve finished the video.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-col items-center min-h-screen">
      {/* Video Section */}
      <section className="pb-6 w-full bg-white">
        <div className="pt-4 pb-2 mx-auto w-full">
          {/* Step 1 */}
          <div className="mt-4 mb-6 text-center">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 1:</span> <span className="font-normal">Watch The Video</span>
            </p>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-black text-center mb-6 px-4 max-w-[95%] sm:max-w-[90%] md:max-w-[70%] mx-auto">
            The Anti Stack: How I tripled my energy without coffee, crazy supplements or spending my life in the gym
          </h1>

          <h2 className="heading-mobile text-lg md:text-xl lg:text-xl xl:text-xl font-medium tracking-tight text-black text-center mt-8 mb-8 px-4 sm:px-4 md:px-4 max-w-[90%] sm:max-w-[85%] md:max-w-[60%] mx-auto leading-relaxed">
            Watch the video to learn the exact method I used to completely cure my chronic tiredness WITHOUT a single cup of coffee for 472 days, 0 expensive supplements stacks, or training more than twice per week:
          </h2>
        
      


          {/* Video Container - Bunny.net VSL Player */}
          <div className="px-4 mx-auto mt-8 w-full max-w-4xl lg:max-w-3xl">
            <div className="relative mb-4 w-full lg:mb-4" data-video-container="true">
              <BunnyVSLPlayer
                key={videoKey}
                libraryId={process.env.NEXT_PUBLIC_BUNNY_LIBRARY_ID || "your-library-id-here"}
                videoId={process.env.NEXT_PUBLIC_BUNNY_VIDEO_ID || "your-video-id-here"}
                title=""
                forcedChoiceConfig={CURRENT_VARIATION}
                autoPlay={videoCanPlay}
                startTime={0}
                onMainAction={handleVideoClick}
              />
            </div>
          </div>
        </div>
      </section>
      {/* Black Sections Container - Critical for no gaps */}
      <div className="w-full bg-zinc-900">
        {/* Step 2 Header - Black Bar */}
        <section className="w-full border-t border-black">
          <div className="pt-10 text-center">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 2:</span> Claim Your Offer (Limited time)
            </p>
          </div>
        </section>

        {/* Email Signup Section */}
        <section className="pt-8 pb-16 w-full text-white">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            {/* Main CTA Headline */}
            <h2 className="mx-0 mb-0 text-3xl font-bold text-center md:text-5xl lg:text-5xl">
              3 Weeks to Jumping Out Of Bed
              </h2>

            {/* Sub-eyebrow */}
            <p className="mx-2 mt-5 mb-6 text-center text-2x l md:mb-0 lg:mb-0 lg:mt-6 md:mt-6 md:text-2xl lg:text-3xl">
              Join 742+ other elite performers getting:
            </p>

            <EmailSignupWithoutTestimonials />
          </div>
        </section>
      </div>

      {/* Text Testimonials - FULL WIDTH */}
      <The3TestimonialsBox />

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <SystemUnlocks />

      {/* Cost question and email form */}
      <section className="pt-8 pb-16 w-full text-white bg-zinc-900">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          <h3 className="mt-2 mb-8 text-2xl font-normal leading-snug lg:text-4xl md:text-4xl">
            How much is waking up with no energy every morning costing you?
          </h3>

          <EmailCTA />
        </div>
      </section>

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
