import React from 'react'

type WhatsAppMessage = {
  sender: string;
  content: string;
  time: string;
  isClient?: boolean;
}

export default function TestimonialSection() {
  const messages: WhatsAppMessage[] = [
    {
      sender: "Scott M.",
      content: "I've been following the Limitless Protocol for 3 weeks now and I'm absolutely blown away. My energy levels have never been this consistent.",
      time: "9:42 AM",
      isClient: true
    },
    {
      sender: "Marley",
      content: "That's amazing Scott! How are you feeling without caffeine?",
      time: "9:45 AM"
    },
    {
      sender: "Scott M.",
      content: "Honestly, I thought I'd be struggling but I feel better than when I was having 3-4 coffees a day. No afternoon crashes, no jitters. Just clean, consistent energy.",
      time: "9:48 AM",
      isClient: true
    },
    {
      sender: "Scott M.",
      content: "My team has even noticed the difference in my focus and productivity. One of my colleagues has already signed up after seeing my transformation!",
      time: "9:49 AM",
      isClient: true
    },
    {
      sender: "Marley",
      content: "This is exactly why I created this system. Elite performance without the dependency on stimulants. You're crushing it!",
      time: "9:52 AM"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Real Conversations with Real Clients</h2>

        <div className="max-w-2xl mx-auto bg-zinc-100 rounded-xl p-4 shadow-md">
          <div className="bg-zinc-200 rounded-lg py-2 px-4 mb-4">
            <p className="text-center text-zinc-700 font-medium">Today</p>
          </div>

          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isClient ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-3 relative ${
                    message.isClient
                      ? 'bg-green-100 rounded-tr-none'
                      : 'bg-white rounded-tl-none shadow'
                  }`}
                >
                  {!message.isClient && (
                    <p className="text-sm font-medium text-red-700">{message.sender}</p>
                  )}
                  <p className="text-zinc-800">{message.content}</p>
                  <p className="text-right text-xs text-zinc-500 mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
