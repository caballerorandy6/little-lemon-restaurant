"use client";

import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ContactFormData, contactSchema } from "@/libs/zod";
import SmallSpinner from "@/components/spinners/SmallSpinner";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const ContactForm = () => {
  const { isLoading, setIsLoading } = useLittleLemonStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full md:w-5/12 bg-white/80 backdrop-blur p-8 rounded-lg shadow-md max-w-xl mx-auto  mb-20"
    >
      {/* Name input  */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-900"
        >
          Full Name
        </label>
        <div className="mt-2">
          <input
            {...register("name")}
            placeholder="Name"
            id="name"
            type="name"
            autoComplete="name"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
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
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <div className="mt-2">
          <input
            {...register("email")}
            placeholder="Email"
            id="email"
            type="email"
            autoComplete="email"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
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
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-gray-900"
        >
          Phone Number
        </label>
        <div className="mt-2">
          <input
            {...register("phone")}
            placeholder="Phone"
            id="phone"
            type="phone"
            autoComplete="phone"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
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
        <label
          htmlFor="message"
          className="block text-sm font-medium text-gray-900"
        >
          Message
        </label>
        <div className="mt-2">
          <textarea
            {...register("message")}
            placeholder="Message"
            id="message"
            autoComplete="message"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
          />
        </div>
      </div>

      {/* Submit button */}
      <div>
        <button
          disabled={!isValid || isLoading}
          type="submit"
          className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors cursor-pointer"
        >
          {isLoading ? <SmallSpinner /> : "Send Message"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
