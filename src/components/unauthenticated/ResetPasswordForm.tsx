"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ErrorMessage } from "@hookform/error-message";
import { resetPasswordSchema, ResetPasswordFormData } from "@/libs/zod";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    const token = searchParams.get("token");

    if (!token) {
      toast.error("Invalid or expired reset link");
      return;
    }

    // Include the token in the request body?
    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, token }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to reset password");
        return;
      }

      reset();
      router.push("/login");

      toast.success("Password has been successfully reset.");
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred while resetting the password");
    }
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          priority
          width={500}
          height={500}
          alt="Logo"
          src="/logo/logo6.webp"
          className="mx-auto h-40 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Reset your password
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 p-6 bg-white border-gray-300 rounded-md shadow-sm border"
        >
          {/* New Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              New Password
            </label>
            <div className="mt-2">
              <input
                {...register("password")}
                id="password"
                type="password"
                autoComplete="password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
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
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                autoComplete="confirmPassword"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
              <ErrorMessage
                errors={errors}
                name="confirmPassword"
                render={({ message }) => (
                  <p className="text-red-500 text-sm mt-1">{message}</p>
                )}
              />
            </div>
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors cursor-pointer"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
