import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function BlueprintFromVideoPage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Step 2 Header - Added from main page */}
      <div className="w-full bg-zinc-900">
        <section className="w-full border-t border-black">
          <div className="pt-10 text-center">
            <p className="text-lg text-red-500">
              <span className="font-bold">Step 2:</span> Claim Your Offer
            </p>
          </div>
        </section>

        {/* Email Signup Section - Added from main page */}
        <section className="pt-8 pb-16 w-full text-white">
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
  );
}
