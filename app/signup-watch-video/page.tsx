import VideoSectionNoStep from "@/components/video-section-no-step";
import SimpleTestimonials from "@/components/simple-testimonials";
import TestimonialSection from "@/components/testimonial-section";

export default function SignupWatchVideo() {
  return (
    <main className="flex flex-col items-center min-h-screen">
      {/* Video Section */}
      <section className="w-full pb-0 bg-white">
        <VideoSectionNoStep />
      </section>

      {/* What high performers are saying - LIGHTER GRAY SECTION */}
      <section className="w-full pb-8 text-white bg-zinc-800 pt-14">
        <div className="max-w-2xl px-4 mx-auto">
          <SimpleTestimonials />
        </div>
      </section>

      {/* What this system unlocks - LIGHTER GRAY SECTION */}
      <section className="w-full pt-6 pb-16 text-white bg-zinc-800">
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
