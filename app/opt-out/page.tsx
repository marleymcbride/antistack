export default function Unsubscribed() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-neutral-900/60 text-white text-center px-6">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        You&apos;ve been removed from the shortlist.
      </h1>
      <p className="text-lg md:text-xl font-light text-white/80 max-w-md">
        Sorry to see you go. If you want to get back in,{" "}
        <a href="/" className="underline hover:text-white transition-colors">
          click here
        </a>
      </p>
    </main>
  );
}
