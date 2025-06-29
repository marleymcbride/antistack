"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import VideoSection from "@/components/video-section";
import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";
import ProofSection from "@/components/proof-section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(true);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: '',
        }),
      });

      if (response.ok) {
        // Redirect to signup-watch-video page on success
        router.push('/signup-watch-video');
        return;
      }

      // Handle errors if needed
      console.error('Subscription failed');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWatchVideo = () => {
    setShowPopup(false);
  };

  const handleClose = () => {
    setShowPopup(false);
  };
  return (
    <>
      {/* Email Capture Popup Modal */}
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
                Get the 21-Day to 3X Energy System
              </h1>

              {/* Subheadline */}
              <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-center text-red-50 md:text-lg">
                Full access to the 3 week transformation blueprint, sent straight to your inbox. Watch the video, then dive deeper with a system that simply fucks.
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
                  Want the full system for free after watching?
                </p>
                <p className="text-sm font-bold text-red-50">
                  Pop your email in and the first step will in your inbox by the time you've finished the video
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-col items-center min-h-screen">
      {/* Video Section */}
      <section className="pb-0 w-full bg-white">
        <VideoSection />
      </section>

      {/* Black Sections Container - Critical for no gaps */}
      <div className="w-full bg-zinc-900">
        {/* Step 2 Header - Black Bar */}
        <section className="w-full border-t border-black">
          <div className="pt-14 text-center">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 2:</span> Claim Your Offer
            </p>
          </div>
        </section>

        {/* Email Signup Section */}
        <section className="pt-2 pb-16 w-full text-white">
          <div className="container px-4 mx-auto max-w-4xl text-center">
            {/* Main CTA Headline */}
            <h2 className="mb-4 text-5xl font-bold text-center">3X Your Energy in 3 Weeks</h2>

            {/* Sub-eyebrow */}
            <p className="mb-8 text-3.2xl md:text-5xl lg:text-6xl xl:text-lg text-center">
              Join 742+ high-performers using this 21-day system getting:
            </p>

            <EmailSignup />
          </div>
        </section>
      </div>

      {/* What high performers are saying - LIGHTER GRAY SECTION */}
      <section className="pt-14 pb-8 w-full text-white bg-zinc-800">
        <div className="px-4 mx-auto max-w-2xl">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <section className="pt-6 pb-0 w-full text-white bg-zinc-800">
        <div className="px-4 mx-auto mb-8 max-w-xl">
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

        {/* Slanted divider */}
        <div className="relative h-20 bg-zinc-800">
          <div className="absolute bottom-0 left-0 w-full h-20 bg-zinc-900 slanted-divider"></div>
        </div>
      </section>

      {/* Cost question and email form */}
      <section className="py-14 w-full text-white bg-zinc-900">
        <div className="px-4 mx-auto mb-10 max-w-xl text-center">
          <h3 className="mt-2 mb-8 text-2xl font-bold leading-snug 0">
            How much is waking up with no energy every morning costing you?
          </h3>

          <div className="mx-auto max-w-md">
            <EmailCTA />
          </div>
        </div>
      </section>

      {/* Testimonials Section - Light */}
      <TestimonialSection />

      {/* Ready to go faster - Moved to bottom with dark background */}
      <section className="py-16 w-full text-white bg-zinc-900">
        <div className="container px-4 mx-auto max-w-4xl text-center">
          {/* Narrower container just for the headline */}
          <div className="mx-auto max-w-lg">
            <p className="mb-10 text-2xl font-lg">Want the entire Limitless Systems to reach the top 1% over the next 90 days?</p>
          </div>

          {/* Wider container for the button */}
          <div className="px-4 mx-auto w-4/5 sm:px-0 md:px-0">
            <button className="p-5 w-full text-xl font-bold text-white bg-red-700 rounded hover:bg-red-800">
              Click here to gain 28 hours of energy each week, get your sex drive back and look better than guys half your age
            </button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
