import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function BlueprintPage() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Black Sections Container - MINIMAL red & black energy */}
      <div className="flex overflow-hidden relative items-center w-full min-h-screen bg-black">
        {/* Subtle background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full" style={{background: 'radial-gradient(ellipse 120% 100% at 30% 0%, rgba(220, 38, 38, 0.25) 0%, rgba(220, 38, 38, 0.1) 35%, rgba(220, 38, 38, 0.05) 60%, transparent 85%)'}}></div>
          <div className="absolute top-1/4 right-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent rotate-45 blur-sm"></div>
        </div>

        {/* Email Signup Section - Contained ATF */}
        <section className="relative z-10 py-6 w-full">
          <div className="container px-4 mx-auto max-w-6xl">
            {/* Contained signup box - wider and 20% smaller overall */}
            <div className="p-5 mx-auto max-w-5xl rounded-xl border backdrop-blur bg-zinc-800/50 border-zinc-700/50 md:p-6">
              <div className="text-center text-white">
                {/* Main CTA Headline */}
                <h1 className="mb-3 text-3xl font-bold md:text-4xl">3X Your Energy in 3 Weeks</h1>

                {/* Sub-eyebrow */}
                <p className="mb-5 text-sm md:text-base text-zinc-300">
                  Join 742+ high-performers using this 21-day system getting:
                </p>

                <EmailSignup />
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* What high performers are saying - SOFT GREY SECTION */}
      <section className="pt-14 pb-8 w-full text-zinc-900" style={{backgroundColor: '#f4f4f5'}}>
        <div className="px-4 mx-auto max-w-2xl">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - SOFT GREY SECTION */}
      <section className="pt-6 pb-0 w-full text-black" style={{backgroundColor: '#f4f4f5'}}>
        <div className="px-4 mx-auto mb-8 max-w-2xl">
          <h3 className="mb-6 text-2xl font-bold text-center">What this system unlocks:</h3>

          <div className="p-6 mb-10 rounded-lg bg-zinc-800/95">
            <ul className="space-y-6">
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold text-white">Master The Limitless Morning™ (Days 1-7)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  Discover the exact 5-minute energy sequence that makes cocaine feel like a J20.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold text-white">Outdoctrinate with The Anti-Stack™ (Days 8-14)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  Learn the system that gives you all-day energy from within and makes &apos;supplement stacks&apos; obsolete.
                </p>
              </li>
              <li className="flex flex-col">
                <div className="flex items-start mb-1">
                  <span className="mr-2 text-red-500">✓</span>
                  <span className="font-bold text-white">Unlock the The Natty Sweet Spot™ (Days 15-21)</span>
                </div>
                <p className="pl-6 text-sm text-zinc-300">
                  The system to build a leaner, stronger physique in 2 sessions a week, your mental peace reduces while your testosterone skyrockets — the great crossover of the male life.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Slanted divider */}
        <div className="relative h-20" style={{backgroundColor: '#f4f4f5'}}>
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
