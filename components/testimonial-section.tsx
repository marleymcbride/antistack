
export default function TestimonialSection() {
  return (
    <section className="w-full text-black bg-white">
      <div className="container px-4 py-12 mx-auto max-w-5xl">
        <h2 className="mb-10 text-3xl font-bold text-center">What Guys Like You Are Saying</h2>

        {/* WhatsApp Screenshots - More authentic, messy layout with 6 testimonials */}
        <div className="grid grid-cols-1 gap-4 mx-auto max-w-5xl md:grid-cols-2 md:gap-6">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.5deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Lewis</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                &quot;Felt like I could run through walls this morning!&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">10:42</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.3deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Luke</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                &quot;I&apos;ve noticed and felt a significant step change in my strength, mental health and overall appearance since starting!&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">08:32</p>
              </div>
            </div>
          </div>

          {/* Joke Testimonial - NEW */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.5deg] md:col-span-2">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="flex justify-center items-center mr-2 w-8 h-8 bg-gray-300 rounded-full">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="black" strokeWidth="1.5" />
                    <path
                      d="M8 15C8 15 9 17 12 17C15 17 16 15 16 15"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8.5 10C8.5 10.2761 8.27614 10.5 8 10.5C7.72386 10.5 7.5 10.2761 7.5 10C7.5 9.72386 7.72386 9.5 8 9.5C8.27614 9.5 8.5 9.72386 8.5 10Z"
                      fill="black"
                    />
                    <path
                      d="M16.5 10C16.5 10.2761 16.2761 10.5 16 10.5C15.7239 10.5 15.5 10.2761 15.5 10C15.5 9.72386 15.7239 9.5 16 9.5C16.2761 9.5 16.5 9.72386 16.5 10Z"
                      fill="black"
                    />
                  </svg>
                </div>
                <p className="font-semibold">Definitely the real Beff Jezos</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  &quot;Wow this is the greatest thing I&apos;ve ever seen. This system single-handedly made me a billionaire and my wife keeps checking if
                  I&apos;m having an affair because I actually have energy to f**k her again.&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">04:20</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm ml-auto">
                  <p className="text-sm">⭐⭐⭐⭐⭐</p>
                  <p className="text-[10px] text-gray-500 text-right">04:21</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.7deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold">Rob</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                &quot;I don&apos;t feel I&apos;ve ever had this much natural energy before than in the last few weeks. But yeah I&apos;m doing a lot but shit man my energy is good&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">14:15</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.3deg]">
            <div className="flex justify-between items-center p-2 mb-2 border-b border-gray-200">
              <div className="flex items-center">
                <div className="mr-2 w-8 h-8 bg-gray-300 rounded-full"></div>
                <p className="font-semibold"></p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              </div>
            </div>

            <div className="p-2 space-y-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                &quot;Man, I feel fucking great&quot;
                </p>
                <p className="text-[10px] text-gray-500 text-right">06:50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
