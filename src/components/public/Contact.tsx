"use client";

import Image from "next/image";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ContactFormData, contactSchema } from "@/libs/zod";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import useSectionObserver from "@/libs/hooks/useSectionObserver";

export default function Contact() {
  const { isLoading, setIsLoading } = useLittleLemonStore();

  const ref = useSectionObserver({ sectionName: "Contact" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      console.log("Form data:", data);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative isolate bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
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
      <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
        <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          Get in Touch
        </h2>
        <p className="mt-2 text-lg/8 text-gray-600">
          Have a question, want to make a reservation, or just want to say
          hello? We&#39;d love to hear from you. Reach out and our team will get
          back to you as soon as possible.
        </p>

        <div className="mt-16 flex flex-col gap-16 sm:gap-y-20 md:flex-row md:items-start md:gap-24">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 w-full md:w-5/12"
          >
            {/* Name input  */}
            <div>
              <div className="mt-2">
                <input
                  {...register("name")}
                  placeholder="Name"
                  id="name"
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
                <ErrorMessage
                  name="name"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />
              </div>
            </div>

            {/* Email input */}
            <div>
              <div className="mt-2">
                <input
                  {...register("email")}
                  placeholder="Email"
                  id="email"
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
                <ErrorMessage
                  name="email"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />
              </div>
            </div>

            {/* Phone input */}
            <div>
              <div className="mt-2">
                <input
                  {...register("phone")}
                  placeholder="Phone"
                  id="phone"
                  type="phone"
                  autoComplete="phone"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
                <ErrorMessage
                  name="phone"
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-sm text-red-500">{message}</p>
                  )}
                />
              </div>
            </div>

            <div>
              <div className="mt-2">
                <textarea
                  {...register("message")}
                  placeholder="Message"
                  id="message"
                  autoComplete="message"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors cursor-pointer"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          {/* Image and text */}
          <div className="w-full md:w-7/12">
            <Image
              priority={false}
              width={1000}
              height={1000}
              alt="Logo"
              src="/logo/logo4.webp"
              className="h-12 w-auto"
            />
            <figure className="mt-10">
              <blockquote className="text-lg/8">
                <p>
                  “From the moment you walk through our doors, we’re here to
                  make you feel welcome. Whether you’re planning a private event
                  or have a quick question, our team is ready to assist you with
                  anything you need.”
                </p>
              </blockquote>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
