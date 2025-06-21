"use client";

import Image from "next/image";
import useSectionObserver from "@/libs/hooks/useSectionObserver";

const stats = [
  { label: "Years of culinary experience", value: "25+" },
  { label: "Dishes served last year", value: "120K+" },
  { label: "Happy customers", value: "15,000+" },
];

const About = () => {
  const ref = useSectionObserver({ sectionName: "Our History" });

  return (
    <section
      id="about"
      ref={ref}
      className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8"
    >
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none mb-10 sm:mt-20">
        <h2 className="text-4xl font-bold tracking-tight text-center text-gray-900 sm:text-5xl mb-20">
          Our History
        </h2>

        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-lg/8 text-gray-600">
              Little Lemon was born from the desire to create a welcoming space
              where people could come together to enjoy great food in a warm,
              inviting atmosphere. From the beginning, we&apos;ve been committed
              to serving dishes made with care, attention to detail, and a
              passion for hospitality.
            </p>
            <p className="mt-10 text-lg/8 text-gray-600">
              Over the years, we&apos;ve grown into a local favorite thanks to
              our dedicated team and the trust of our guests. Whether
              you&apos;re joining us for a casual lunch or a special evening
              out, every visit to Little Lemon is designed to offer a memorable
              experience filled with flavor, comfort, and connection.
            </p>
          </div>

          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base/7 text-gray-600">{stat.label}</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div className="xl:mx-auto xl:max-w-7xl xl:px-8">
        <Image
          width={1000}
          height={1000}
          priority={false}
          alt="Restaurant Interior"
          src="/landing/restaurantInterior.webp"
          className="aspect-5/2 w-full object-cover rounded-lg"
        />
      </div>
    </section>
  );
};

export default About;
