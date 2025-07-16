import React from 'react'

export default function SimpleTestimonials() {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold text-center">What high performers are saying:</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">
            &quot;Down 22lbs. Haven&apos;t touched caffeine in 6 weeks. Closing my biggest deals at 8pm.&quot;
          </p>
          <p className="text-xs text-zinc-300">- Investment Banker, NYC</p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">&quot;Energy at 6pm matches my old 9am. Wife thinks I&apos;m 25 again.&quot;</p>
          <p className="text-xs text-zinc-300">- Tech CEO, 42</p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">&quot;Saved $400/month on supplements. Feel better than I did in college.&quot;</p>
          <p className="text-xs text-zinc-300">- Sales Director, Chicago</p>
        </div>
      </div>
    </>
  );
}
