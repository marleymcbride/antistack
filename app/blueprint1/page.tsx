import EmailCTA from "@/components/email-cta";
import EmailSignup from "@/components/email-signup";
import TestimonialSection from "@/components/testimonial-section";
import SystemUnlocks from "@/components/system-unlocks";

export default function Blueprint1Page() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Black Sections Container - Direct signup focus */}
      <div className="w-full bg-zinc-900">
        {/* Email Signup Section - Centered as ATF */}
        <section className="w-full py-20 text-white">
          <div className="container max-w-4xl px-4 mx-auto text-center">
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
      <section className="w-full text-white py-14 bg-zinc-900 ">
        <div className="max-w-xl px-4 mx-auto mb-10 text-center">
          <h3 className="mt-2 mb-8 text-2xl font-bold leading-snug 0">
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
