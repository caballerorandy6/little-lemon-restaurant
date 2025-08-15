"use client";

import Image from "next/image";
import useSectionObserver from "@/libs/hooks/useSectionObserver";
import ContactForm from "@/components/forms/ContactForm";

export default function Contact() {
  const ref = useSectionObserver({ sectionName: "Contact" });

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate bg-gradient-to-b from-white to-gray-50 px-6 py-24 sm:py-32 lg:px-8 overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      {/* Grid pattern background */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200/50"
      >
        <defs>
          <pattern
            x="50%"
            y={-64}
            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M100 200V.5M.5 .5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-64} className="overflow-visible fill-gray-50">
          <path
            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M299.5 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>

      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-16 animate-fadeIn">
          <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full">
            CONNECT WITH US
          </span>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Get in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-yellow-500">
              Touch
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            Have a question, want to make a reservation, or just want to say
            hello? We&apos;d love to hear from you. Reach out and our team will
            get back to you as soon as possible.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
            <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
            <div className="h-1 w-8 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <ContactForm />

          {/* Right side content */}
          <div className="lg:pl-8 animate-fadeInUp animation-delay-400">
            {/* Logo and quote card */}
            <div className="relative bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              {/* Decorative element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-green-400 to-yellow-400 rounded-full opacity-10 blur-2xl"></div>

              <Image
                priority={false}
                width={1000}
                height={1000}
                alt="Logo"
                src="/logo/logo4.webp"
                className="h-16 w-auto mb-8"
              />

              <figure>
                <svg
                  className="w-12 h-12 text-green-200 mb-4"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <blockquote className="text-lg text-gray-700 leading-relaxed italic">
                  <p>
                    &quot;From the moment you walk through our doors, we&apos;re
                    here to make you feel welcome. Whether you&apos;re planning
                    a private event or have a quick question, our team is ready
                    to assist you with anything you need.&quot;
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  <p className="text-sm font-semibold text-gray-600">
                    The Little Lemon Team
                  </p>
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                </figcaption>
              </figure>
            </div>

            {/* Contact info cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Call Us
                  </span>
                </div>
                <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
              </div>

              <div className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                    <svg
                      className="w-5 h-5 text-yellow-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Visit Us
                  </span>
                </div>
                <p className="text-gray-600 text-sm">123 Main St, City</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
