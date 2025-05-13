import React from 'react'
import { Card, CardContent } from './ui/card'

type Testimonial = {
  name: string;
  role: string;
  quote: string;
}

export default function SimpleTestimonials() {
  const testimonials: Testimonial[] = [
    {
      name: "James T.",
      role: "Finance Executive",
      quote: "After following Marley's protocol, my energy levels are consistently high throughout the day. I've ditched coffee and still outperform my colleagues."
    },
    {
      name: "Mike R.",
      role: "Tech Entrepreneur",
      quote: "The Limitless Protocol completely changed my relationship with energy. I'm focused, productive, and feel better than I have in years."
    },
    {
      name: "Daniel H.",
      role: "Sales Director",
      quote: "I was skeptical at first, but the results speak for themselves. No more afternoon crashes, no more relying on stimulants. This is life-changing."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What High Performers Are Saying</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg">
              <CardContent className="p-6">
                <p className="text-lg mb-4">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-zinc-500">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
