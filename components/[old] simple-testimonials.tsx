
export default function SimpleTestimonials() {
  return (
    <>
      <h3 className="mb-6 text-2xl font-bold text-center">What high performers are saying:</h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">
            &quot;It&apos;s mad to think how much more energy you have. I was feeling good, but now it&apos;s 10 fold.&quot;
          </p>
          <p className="text-xs text-zinc-300">— Luis, Energy Sector, UK</p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">&quot;I don&apos;t feel I&apos;ve ever had this much natural energy before than in the last few weeks.&quot;</p>
          <p className="text-xs text-zinc-300">— Aaron, Business Exec, 42</p>
        </div>

        <div className="p-4 rounded-lg bg-zinc-800/80">
          <p className="mb-3 text-sm text-white">&quot;Noticed more energy coming in, sleep has been better and I&apos;m feeling more focused.&quot;</p>
          <p className="text-xs text-zinc-300">— Laurence, 52, ZH</p>
        </div>
      </div>
    </>
  );
}
