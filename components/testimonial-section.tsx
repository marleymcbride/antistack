import React from 'react'

export default function TestimonialSection() {
  return (
    <section className="w-full bg-white text-black">
      <div className="container max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center mb-10">What Guys Like You Are Saying...</h2>

        {/* WhatsApp Screenshots - More authentic, messy layout with 6 testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-5xl mx-auto">
          {/* Testimonial 1 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.5deg]">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <p className="font-semibold">Client</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  I have noticed and felt a significant step change in my strength, mental health and overall
                  appearance since working with Marley.
                </p>
                <p className="text-[10px] text-gray-500 text-right">10:42</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.3deg]">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <p className="font-semibold">David N.</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  I'd hit snooze 6 times every morning. Now I'm up before my alarm, no caffeine needed.
                </p>
                <p className="text-[10px] text-gray-500 text-right">08:32</p>
              </div>
            </div>
          </div>

          {/* Joke Testimonial - NEW */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[0.5deg] md:col-span-2">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
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
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  "Wow this is the greatest thing I've ever seen. This system single-handedly made me a billionaire and my wife keeps checking if
                  I'm having an affair because I actually have energy to f**k her again."
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
            <div className="flex items-center justify-between p-2 border-b border-gray-200 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <p className="font-semibold">Michael R.</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  After 8 weeks, I've lost 22 pounds, doubled my output, and haven't touched caffeine in 37 days.
                </p>
                <p className="text-[10px] text-gray-500 text-right">14:15</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="bg-gray-100 rounded-lg p-2 border border-gray-300 shadow-sm transform rotate-[-0.3deg]">
            <div className="flex items-center justify-between p-2 border-b border-gray-200 mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                <p className="font-semibold">Client</p>
              </div>
              <div className="flex space-x-2">
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                <div className="w-4 h-4 rounded-full bg-gray-300"></div>
              </div>
            </div>

            <div className="space-y-2 p-2">
              <div className="bg-white p-2 rounded-lg max-w-[80%] shadow-sm">
                <p className="text-sm">
                  Right now I'm in the best phase of my life thanks to the foundations we set at the very beginning
                  bro 🙏
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
