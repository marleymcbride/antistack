import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";
import FinalCTAButton from "@/components/final-cta-button";

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
                <h1 className="mb-3 text-6xl font-bold md:text-7xl lg:text-8xl">3 Weeks to Jumping Out Of Bed</h1>

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

      {/* What this system unlocks - SOFT GREY SECTION */}
      <div style={{backgroundColor: '#f4f4f5'}}>
        <SystemUnlocks />
      </div>

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
  );
}
