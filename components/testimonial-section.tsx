import Image from "next/image";

export default function TestimonialSection() {
  return (
    <section className="w-full text-black bg-white">
      <div className="py-16 md:container md:px-4 md:mx-auto">
        <h2 className="mb-10 text-4xl font-medium text-center heading-mobile md:font-medium lg:font-medium">
          More results from guys using this system:
          </h2>

        {/* Real Testimonial Screenshots - MOBILE */}
        <div className="grid grid-cols-1 gap-6 mx-[15%] md:hidden">
          {/* Testimonial 1 - Lewis */}
          <Image
            src="/images/Testimonials/Lewis hits 168 feels great.png"
            alt="Lewis hits 168 feels great"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />

          {/* Testimonial 2 - Luke */}
          <Image
            src="/images/Testimonials/Luke social proof.png"
            alt="Luke noticed significant step change in strength and mental health"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />

          {/* Testimonial 3 - Rob */}
          <Image
            src="/images/Testimonials/Rob down 17lbs and clothes dont fit copy.PNG"
            alt="Rob down 17lbs and clothes don't fit"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />

          {/* Testimonial 4 - Aaron */}
          <Image
            src="/images/Testimonials/Aaron testimonial - great energy.png"
            alt="Aaron has great energy"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />

          {/* Testimonial 5 - Gav */}
          <Image
            src="/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png"
            alt="Gav down 10lbs in 8 weeks"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />

          {/* Testimonial 6 - Matty */}
          <Image
            src="/images/Testimonials/Matty down 19kg.jpeg"
            alt="Matty down 19kg"
            width={224}
            height={179}
            sizes="100vw"
            className="mx-auto w-full rounded-lg shadow-md"
            style={{ maxWidth: '338px' }}
          />
        </div>

        {/* Real Testimonial Screenshots - DESKTOP */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-4 md:px-12 md:mx-auto md:max-w-4xl lg:px-12 lg:max-w-auto">
          {/* Testimonial 1 - Lewis */}
          <Image
            src="/images/Testimonials/Lewis hits 168 feels great.png"
            alt="Lewis hits 168 feels great"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />

          {/* Testimonial 2 - Luke */}
          <Image
            src="/images/Testimonials/Luke social proof.png"
            alt="Luke noticed significant step change in strength and mental health"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />

          {/* Testimonial 3 - Rob */}
          <Image
            src="/images/Testimonials/Rob down 17lbs and clothes dont fit copy.PNG"
            alt="Rob down 17lbs and clothes don't fit"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />

          {/* Testimonial 4 - Aaron */}
          <Image
            src="/images/Testimonials/Aaron testimonial - great energy.png"
            alt="Aaron has great energy"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />

          {/* Testimonial 5 - Gav */}
          <Image
            src="/images/Testimonials/Gav social proof - 10lbs in 8 weeks.png"
            alt="Gav down 10lbs in 8 weeks"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />

          {/* Testimonial 6 - Matty */}
          <Image
            src="/images/Testimonials/Matty down 19kg.jpeg"
            alt="Matty down 19kg"
            width={338}
            height={270}
            sizes="50vw"
            className="mx-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </section>
  );
}
