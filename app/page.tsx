import VideoSection from "@/components/video-section";
import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";
import ProofSection from "@/components/proof-section";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Video Section - Light */}
      <VideoSection />

      {/* Email Signup Section - Dark Gray */}
      <section className="w-full bg-zinc-900 text-white">
        <div className="container max-w-4xl mb-0 mx-auto pt-14 pb-6 px-4">
          {/* Step 2 */}
          <div className="mb-4 text-center">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 2:</span> <span className="font-normal">Claim Your Offer</span>
            </p>
          </div>

          {/* Main CTA Headline */}
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-5">3X Your Energy in 3 Weeks</h2>

          {/* Sub-eyebrow */}
          <p className="text-center text-lg mt-7 mb-6">
            Join 742+ high-earning men using this 21-day system getting:
          </p>

          <EmailSignup />
        </div>
      </section>

      {/* What high performers are saying - LIGHTER GRAY SECTION */}
      <section className="w-full bg-zinc-800 text-white pb-8 pt-14">
        <div className="max-w-2xl mx-auto px-4">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <section className="w-full bg-zinc-800 text-white pt-6 pb-0">
        <div className="max-w-xl mx-auto mb-8 px-4">
          <h3 className="text-2xl text-center font-bold mb-6">What this system unlocks:</h3>

          <div className="bg-zinc-900/70 p-6 rounded-lg mb-10">
            <ul className="space-y-6">
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="text-red-500 mr-2">✓</span>
                  <span className="font-bold">Master The Limitless Morning™ (Days 1-7)</span>
                </div>
                <p className="text-sm text-zinc-300 pl-6">
                  Discover the exact 5-minute energy sequence that makes cocaine feel like a J20.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="text-red-500 mr-2">✓</span>
                  <span className="font-bold">Outdoctrinate with The Anti-Stack™ (Days 8-14)</span>
                </div>
                <p className="text-sm text-zinc-300 pl-6">
                  Learn the system that gives you all-day energy from within and makes &apos;supplement stacks&apos; obsolete.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="text-red-500 mr-2">✓</span>
                  <span className="font-bold">Unlock the The Natty Sweet Spot™ (Days 15-21)</span>
                </div>
                <p className="text-sm text-zinc-300 pl-6">
                  The system to build a leaner, stronger physique in 2 sessions a week, your mental peace reduces while your testosterone skyrockets — the great crossover of the male life.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Slanted divider */}
        <div className="h-20 bg-zinc-800 relative">
          <div className="absolute bottom-0 left-0 w-full h-20 bg-zinc-900 slanted-divider"></div>
        </div>
      </section>

      {/* Cost question and email form */}
      <section className="w-full bg-zinc-900 text-white">
        <div className="max-w-xl mx-auto mt-14 mb-8 px-4">
          <h3 className="text-2xl text-center font-bold mb-2 mt-12 max-w-4xl mx-auto">
            How much is waking up with no energy every morning costing you?
          </h3>
        </div>
      </section>

      {/* Call to action - Dark Gray Section */}
      <section className="w-full bg-zinc-900 text-white pt-0 pb-10">
        <div className="max-w-md mx-auto mt-2 mb-14 px-4">
          <EmailCTA />
        </div>
      </section>

      {/* Testimonials Section - Light */}
      <TestimonialSection />

      {/* Ready to go faster - Moved to bottom with dark background */}
      <section className="w-full bg-zinc-900 text-white py-16">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          {/* Narrower container just for the headline */}
          <div className="max-w-lg mx-auto">
            <p className="text-2xl font-lg mb-10">Want the entire Limitless Systems to reach the top 1% over the next 90 days?</p>
          </div>

          {/* Wider container for the button */}
          <div className="w-4/5 mx-auto px-4 sm:px-0 md:px-0">
            <button className="w-full bg-red-700 hover:bg-red-800 text-white p-5 rounded font-bold text-xl">
              Click here to gain 28 hours of energy each week, get your sex drive back and look better than guys half your age
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
