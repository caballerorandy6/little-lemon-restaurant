"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/libs/zod";
import { toast } from "sonner";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import { ErrorMessage } from "@hookform/error-message";
import Spinner from "@/components/public/Spinner";
import { getCartFromDB } from "@/libs/utils";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const {
    setIsAuthenticated,
    setUser,
    isLoadingAuth,
    setIsLoadingAuth,
    setCart,
  } = useLittleLemonStore();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoadingAuth(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error("Login failed, please check your password or email");
        return;
      }

      // Guardar token en localStorage
      localStorage.setItem("token", result.token);

      // Guardar usuario y estado autenticado en el store
      setUser(result.user);
      setIsAuthenticated(true);

      await getCartFromDB().then((cart) => {
        setCart(cart);

        // 3. Esperar brevemente y redirigir
        setTimeout(() => {
          toast.success("Login successful");
          reset();

          // Redirige según el rol
          if (result.user.role === "ADMIN") {
            router.replace("/admin-dashboard");
          } else {
            router.replace("/dashboard");
          }
        }, 200);
      });
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("An error occurred while logging in");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-y-hidden flex-1 h-screen bg-white">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <Link href="/">
            <Image
              priority
              width={1000}
              height={1000}
              alt="Little Lemon Logo"
              src="/logo/logo6.webp"
              className="h-40 w-auto object-contain"
            />
            <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </Link>

          <div className="mt-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6 border border-gray-300 bg-white p-6 rounded-md shadow-sm"
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    {...register("email")}
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
                  />
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm mt-1">{message}</p>
                    )}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    {...register("password")}
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm"
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

              <div className="flex items-center justify-between">
                <Link
                  href="/signup"
                  className="text-sm font-semibold text-yellow-500 hover:text-yellow-600 transition-colors"
                >
                  Create new account!
                </Link>

                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-green-600 hover:text-green-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div>
                <button
                  disabled={!isValid}
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-800 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
                >
                  {isLoadingAuth ? <Spinner /> : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          priority
          height={1000}
          width={1000}
          alt=""
          src="/login/login.webp"
          className="absolute inset-0 size-full object-cover mt-22"
        />
      </div>
    </div>
  );
}
