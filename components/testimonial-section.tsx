import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section className="w-full text-black bg-white">
      <div className="container px-4 py-16 mx-auto">
        <h2 className="mb-10 text-4xl font-bold text-center">More results from guys using this system:</h2>

        {/* Real Testimonial Screenshots - Two column layout on desktop */}
        <div className="grid grid-cols-1 gap-2 mx-auto max-w-2xl md:grid-cols-2 md:gap-4">
          {/* Testimonial 1 - Lewis */}
          <Image
            src="/images/Testimonials/Lewis hits 168 feels great.png"
            alt="Lewis hits 168 feels great"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />

          {/* Testimonial 2 - Luke */}
          <Image
            src="/images/Testimonials/Luke social proof.png"
            alt="Luke noticed significant step change in strength and mental health"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />

          {/* Testimonial 3 - Rob */}
          <Image
            src="/images/Testimonials/Rob down 17lbs and clothes dont fit copy.PNG"
            alt="Rob down 17lbs and clothes don't fit"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />

          {/* Testimonial 4 - Aaron */}
          <Image
            src="/images/Testimonials/Aaron testimonial - great energy.png"
            alt="Aaron has great energy"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />

          {/* Testimonial 5 - Gav */}
          <Image
            src="/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png"
            alt="Gav down 10lbs in 8 weeks"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />

          {/* Testimonial 6 - Matty */}
          <Image
            src="/images/Testimonials/Matty down 19kg.jpeg"
            alt="Matty down 19kg"
            width={224}
            height={179}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="mx-auto rounded-lg shadow-md"
            style={{ maxWidth: '338px', width: '100%' }}
          />
        </div>
      </div>
    </section>
  );
}
