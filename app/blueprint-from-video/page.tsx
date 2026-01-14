import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";

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
            <h2 className="mb-4 text-5xl font-bold text-center">3 Weeks to Jumping Out Of Bed</h2>

            {/* Sub-eyebrow */}
            <p className="mb-8 text-3.2xl md:text-5xl lg:text-6xl xl:text-lg text-center">
              Join 742+ high-performers using this 21-day system getting:
            </p>

            <EmailSignup />
          </div>
        </section>
      </div>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <SystemUnlocks />

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
