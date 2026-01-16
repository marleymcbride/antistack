export default function SystemUnlocks() {
  return (
    <section className="w-full text-white bg-zinc-800">
      <div className="pt-6 pb-8 mx-6 max-w-xl md:pb-0 lg:pb-0 lg:mx-auto md:mx-auto lg:max-w-5xl md:max-w-5xl">
        <h3 className="mx-0 mt-8 mb-2 text-4xl font-bold text-center md:text-4xl lg:text-4.5xl md:mb-10 lg:mb-10 lg:mx-0 md:mx-0">
          What you get with this course
          </h3>

            {/* Sub-headlinew */}
            <p className="mx-2 mt-10 mb-6 text-xl text-center md:text-2xl lg:text-3xl">
              A 3-4 minute daily lesson over the next 21 days:
            </p>

        <div className="p-4 pl-5 mx-4 mb-20 max-w-full rounded-lg md:mx-4 lg:mx-4 bg-zinc-900/70 md:pl-10 lg:pl-10">
          <ul className="py-6 space-y-6">
            <li className="flex flex-col">
              <div className="flex items-start mb-1">
                <span className="self-center mr-[10px] md:mr-3 text-red-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-xl font-bold md:text-2xl">
                  Week 1: Limitless Morning™ (Day 1-7)
                  </span>
              </div>
              <p className="pl-8 text-base md:text-lg text-zinc-300">
                Discover the exact 5-minute energy sequence that makes cocaine feel like a J20.
              </p>
            </li>
            <li className="flex flex-col">
              <div className="flex items-start mt-2 mb-1">
                <span className="self-center mr-[10px] md:mr-3 text-red-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-xl font-bold md:text-2xl">Week 2: The Anti-Stack™ (Day 8-14)</span>
              </div>
              <p className="pl-8 text-base md:text-lg text-zinc-300">
                Learn the system that gives you all-day energy from within and makes &apos;supplement stacks&apos; obsolete.
              </p>
            </li>
            <li className="flex flex-col">
              <div className="flex items-start mt-2 mb-1">
                <span className="self-center mr-[10px] md:mr-3 text-red-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span className="text-xl font-bold md:text-2xl">Week 3: The Natty Sweet Spot™ (15-21)</span>
              </div>
              <p className="pl-8 text-base md:text-lg text-zinc-300">
                The system to build a leaner, stronger physique in 2 sessions a week, your mental peace reduces while your testosterone skyrockets — the great crossover of the male life.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* Slanted divider - FULL WIDTH */}
      <div className="relative w-full h-19 md:h-20 lg:h-20 bg-zinc-800">
        <div className="absolute bottom-0 left-0 w-full h-20 md:h-20 lg:h-20 bg-zinc-900 slanted-divider"></div>
      </div>
    </section>
  );
}
