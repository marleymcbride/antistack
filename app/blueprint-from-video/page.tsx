import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";
import FinalCTAButton from "@/components/final-cta-button";

// Create alias for EmailSignup without testimonials
const EmailSignupWithoutTestimonials = EmailSignup;

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
            <h2 className="mx-0 mb-0 text-4xl font-bold text-center lg:text-5xl">3 Weeks to Jumping Out Of Bed</h2>

            {/* Sub-eyebrow */}
            <p className="mx-2 mt-10 mb-6 text-2xl text-center md:text-2xl lg:text-3xl">
              Join 742+ other elite performers getting:
            </p>

            <EmailSignupWithoutTestimonials />
          </div>
        </section>
      </div>

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
  );
}
