import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";
import FinalCTAButton from "@/components/final-cta-button";

// Create alias for EmailSignup without testimonials
const EmailSignupWithoutTestimonials = EmailSignup;

export default function Blueprint1Page() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Black Sections Container */}
      <div className="w-full bg-neutral-900/60">
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
          <div className="container px-4 mx-auto max-w-4xl w-[85%]">
            <EmailSignupWithoutTestimonials />
          </div>
        </section>
      </div>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <SystemUnlocks />

      {/* Cost question and email form */}
      <section className="pt-8 pb-16 w-full text-white bg-neutral-900/60">
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
