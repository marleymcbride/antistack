import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";
import FinalCTAButton from "@/components/final-cta-button";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Black Sections Container */}
      <div className="w-full bg-neutral-900/60">
        {/* Email Signup Section */}
        <section className="pt-20 pb-16 w-full text-white">
          <div className="container px-4 mx-auto max-w-4xl w-[85%]">
            <EmailSignup />
          </div>
        </section>
      </div>

      {/* What this system unlocks - SOFT GREY SECTION */}
      <div style={{backgroundColor: '#f4f4f5'}}>
        <SystemUnlocks />
      </div>

      {/* Cost question and email form */}
      <section className="py-14 w-full text-white bg-neutral-900/60">
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
      <section className="py-24 w-full text-white bg-neutral-900/60">
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
