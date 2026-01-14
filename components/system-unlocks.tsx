export default function SystemUnlocks() {
  return (
    <section className="w-full text-white bg-zinc-800">
      <div className="px-0 pt-6 mx-auto mb-8 max-w-xl md:max-w-5xl">
        <h3 className="mt-7 mt-8 mb-10 text-4xl font-bold text-center">What you will get with this system</h3>

        <div className="p-6 pl-8 mb-20 max-w-full rounded-lg bg-zinc-900/70">
          <ul className="py-6 space-y-6">
            <li className="flex flex-col">
              <div className="flex items-start mb-1">
                <span className="mr-3 text-3xl leading-none text-red-500">✓</span>
                <span className="text-2xl font-bold">Master The Limitless Morning™ (Days 1-7)</span>
              </div>
              <p className="pl-6 text-lg text-zinc-300">
                Discover the exact 5-minute energy sequence that makes cocaine feel like a J20.
              </p>
            </li>
            <li className="flex flex-col">
              <div className="flex items-start mt-2 mb-1">
                <span className="mr-3 text-3xl leading-none text-red-500">✓</span>
                <span className="text-3xl font-bold">Outdoctrinate with The Anti-Stack™ (Days 8-14)</span>
              </div>
              <p className="pl-6 text-lg text-zinc-300">
                Learn the system that gives you all-day energy from within and makes &apos;supplement stacks&apos; obsolete.
              </p>
            </li>
            <li className="flex flex-col">
              <div className="flex items-start mt-2 mb-1">
                <span className="mr-3 text-3xl leading-none text-red-500">✓</span>
                <span className="text-3xl font-bold">Unlock the The Natty Sweet Spot™ (Days 15-21)</span>
              </div>
              <p className="pl-6 text-lg text-zinc-300">
                The system to build a leaner, stronger physique in 2 sessions a week, your mental peace reduces while your testosterone skyrockets — the great crossover of the male life.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Slanted divider - FULL WIDTH */}
      <div className="relative w-full h-20 bg-zinc-800">
        <div className="absolute bottom-0 left-0 w-full h-20 bg-zinc-900 slanted-divider"></div>
      </div>
    </section>
  );
}
