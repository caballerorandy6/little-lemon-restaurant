"use client";

import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/libs/zod";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useLittleLemonStore } from "@/store/little-lemon-store";

const RegisterForm = () => {
  const router = useRouter();
  const { setUser } = useLittleLemonStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setUser(result.user); // Set user in the store

      if (!response.ok) {
        toast.error(result.error || "Error creating account"); // Display error message from server
        return;
      }

      toast.success("Account created successfully!"); // Display success message
      reset();
      router.push("/login");
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-1 h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/">
            <Image
              priority
              width={1000}
              height={1000}
              alt="Little Lemon Logo"
              src="/logo/logo4.webp"
              className="h-20 w-auto object-contain"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Create new account
            </h2>
          </Link>

          <div className="mt-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 p-6 rounded-md shadow-sm bg-white border-gray-300 border"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Full Name"
                    id="fullName"
                    {...register("name")}
                    autoComplete="name"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                  />
                  <ErrorMessage
                    name="name"
                    errors={errors}
                    render={({ message }) => (
                      <p className="text-sm text-red-600">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email Address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                  />
                  <ErrorMessage
                    name="email"
                    errors={errors}
                    render={({ message }) => (
                      <p className="text-sm text-red-600">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    id="password"
                    type="password"
                    {...register("password")}
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                  />
                  <ErrorMessage
                    name="password"
                    errors={errors}
                    render={({ message }) => (
                      <p className="text-sm text-red-600">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    autoComplete="new-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 sm:text-sm focus:outline-none focus:ring-1 focus:ring-gray-200 focus:border-gray-300"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    errors={errors}
                    render={({ message }) => (
                      <p className="text-sm text-red-600">{message}</p>
                    )}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors cursor-pointer"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Image side */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          priority
          height={1000}
          width={1000}
          alt=""
          src="/login/login.webp"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </div>
  );
};

export default RegisterForm;
