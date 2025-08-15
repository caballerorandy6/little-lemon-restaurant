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
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <div className="text-center mb-20 animate-fadeIn">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            ESTABLISHED WITH PASSION
          </span>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
              History
            </span>
          </h2>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
            <div className="h-1 w-8 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-2 items-center">
          <div className="lg:pr-8 animate-fadeInUp animation-delay-200">
            <div className="relative">
              <svg
                className="absolute -top-8 -left-8 w-24 h-24 text-green-100 -z-10"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>

              <p className="text-xl leading-relaxed text-gray-700 font-light">
                Little Lemon was born from the desire to create a welcoming
                space where people could come together to enjoy great food in a
                warm, inviting atmosphere. From the beginning, we&apos;ve been
                committed to serving dishes made with care, attention to detail,
                and a passion for hospitality.
              </p>

              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl border border-green-200/50">
                <p className="text-lg leading-relaxed text-gray-600 italic">
                  Over the years, we&apos;ve grown into a local favorite thanks
                  to our dedicated team and the trust of our guests. Whether
                  you&apos;re joining us for a casual lunch or a special evening
                  out, every visit to Little Lemon is designed to offer a
                  memorable experience filled with flavor, comfort, and
                  connection.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="grid gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`group relative p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fadeInUp animation-delay-${400 + index * 200}`}
                  style={{ animationDelay: `${400 + index * 200}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-yellow-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="relative flex items-center justify-between">
                    <div className="flex-1">
                      <dd className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500 mb-2">
                        {stat.value}
                      </dd>
                      <dt className="text-base text-gray-600 font-medium">
                        {stat.label}
                      </dt>
                    </div>

                    <div className="ml-6 p-3 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full group-hover:scale-110 transition-transform duration-300">
                      {index === 0 && (
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {index === 1 && (
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      )}
                      {index === 2 && (
                        <svg
                          className="w-6 h-6 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-24 relative group animate-fadeIn animation-delay-1000">
        <div className="absolute -inset-4 bg-gradient-to-r from-green-600 to-yellow-500 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-300"></div>

        <div className="relative overflow-hidden rounded-2xl shadow-2xl">
          <Image
            width={1000}
            height={1000}
            priority={false}
            alt="Restaurant Interior"
            src="/landing/restaurantInterior.webp"
            className="aspect-[5/2] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-2">Welcome to Our Home</h3>
              <p className="text-white/90">
                Where every meal tells a story and every guest becomes family
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
