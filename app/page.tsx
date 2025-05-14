import VideoSection from "@/components/video-section";
import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";
import ProofSection from "@/components/proof-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Video Section */}
      <section className="w-full pb-0 bg-white">
        <VideoSection />
      </section>

      {/* Black Sections Container - Critical for no gaps */}
      <div className="w-full bg-zinc-900">
        {/* Step 2 Header - Black Bar */}
        <section className="w-full border-t border-black">
          <div className="text-center pt-14">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 2:</span> Claim Your Offer
            </p>
          </div>
        </section>

        {/* Email Signup Section */}
        <section className="w-full pt-2 pb-16 text-white">
          <div className="container max-w-4xl px-4 mx-auto text-center">
            {/* Main CTA Headline */}
            <h2 className="mb-4 text-5xl font-bold text-center">3X Your Energy in 3 Weeks</h2>

            {/* Sub-eyebrow */}
            <p className="mb-8 text-base text-3.2xl md:text-5xl lg:text-6xl xl:text-lg text-center">
              Join 742+ high-earning men using this 21-day system getting:
            </p>

            <EmailSignup />
          </div>
        </section>
      </div>

      {/* What high performers are saying - LIGHTER GRAY SECTION */}
      <section className="w-full bg-zinc-800 text-white pb-8 pt-14">
        <div className="max-w-2xl mx-auto px-4">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <section className="w-full pt-6 pb-0 text-white bg-zinc-800">
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

        {/* Slanted divider */}
        <div className="relative h-20 bg-zinc-800">
          <div className="absolute bottom-0 left-0 w-full h-20 bg-zinc-900 slanted-divider"></div>
        </div>
      </section>

      {/* Cost question and email form */}
      <section className="w-full text-white bg-zinc-900 py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-12">
            How much is waking up with no energy every morning costing you?
          </h3>

          <div className="max-w-md mx-auto">
            <EmailCTA />
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
