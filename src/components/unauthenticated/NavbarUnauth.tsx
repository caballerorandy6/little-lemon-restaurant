import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import ReservationNavLink from "@/components/public/ReservationNavLink";
import ShoppingCart from "@/components/public/ShoppingCart";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "Menu", href: "/#public-menu" },
  { name: "Our History", href: "/#about" },
  { name: "Reservation", href: "/#reservation" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Contact", href: "/#contact" },
];

const NavbarUnauth = () => {
  const { unauthMobileMenuOpen, setUnauthMobileMenuOpen, activeSection } =
    useLittleLemonStore();

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-blur">
      <nav className="mx-auto flex items-center justify-between  px-6 py-4 max-w-7xl">
        {/* Logo with hover effect */}
        <Link
          href="/#home"
          className="group flex items-center space-x-2 transition-transform duration-300 hover:scale-105"
        >
          <Image
            priority
            width={1000}
            height={1000}
            alt="Little Lemon Logo"
            src="/logo/logo4.webp"
            className="h-12 w-auto"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setUnauthMobileMenuOpen(true)}
            className="relative inline-flex items-center justify-center rounded-xl p-2.5 text-gray-700 bg-white/80 backdrop-blur shadow-md hover:shadow-lg hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200"
          >
            <Bars3Icon className="w-6 h-6" />
            {/* Cart indicator for mobile */}
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">
              0
            </span>
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
          {navigation.map((item) =>
            item.name === "Reservation" ? (
              <ReservationNavLink key={item.name} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative py-2 text-sm font-medium text-emerald-900 transition-all duration-300 hover:text-green-600 group hover:p-2",
                  {
                    "text-green-600 font-semibold": activeSection === item.name,
                  }
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {/* Animated underline */}
                <span
                  className={clsx(
                    "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transition-all duration-300",
                    activeSection === item.name
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  )}
                />
                {/* Hover background */}
                <span className="absolute inset-0 -z-10 rounded-lg bg-green-50 scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
              </Link>
            )
          )}
        </div>

        {/* Right Buttons (Cart + Login) */}
        <div className="hidden lg:flex items-center gap-4">
          <ShoppingCart />
          <Link
            href="/login"
            className="group relative inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold overflow-hidden rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="relative z-10">Log in</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <Dialog
        open={unauthMobileMenuOpen}
        onClose={setUnauthMobileMenuOpen}
        className="lg:hidden"
      >
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-2xl transform transition-transform duration-300">
          {/* Decorative gradient header */}
          <div className="h-2 bg-gradient-to-r from-green-600 via-yellow-500 to-green-600"></div>

          <div className="px-6 py-6 overflow-y-auto h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <Link
                href="/#home"
                onClick={() => setUnauthMobileMenuOpen(false)}
                className="transition-transform duration-300 hover:scale-105"
              >
                <Image
                  priority
                  width={500}
                  height={500}
                  alt="Little Lemon Logo"
                  src="/logo/logo6.webp"
                  className="h-14 w-auto"
                />
              </Link>
              <button
                onClick={() => setUnauthMobileMenuOpen(false)}
                className="rounded-xl p-2.5 text-gray-700 bg-gray-100 hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
              >
                <XMarkIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Welcome message */}
            <div className="mb-6 p-4 bg-gradient-to-br from-green-50 to-yellow-50 rounded-xl">
              <p className="text-sm font-semibold text-gray-700">
                Welcome to Little Lemon
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Discover our delicious Mediterranean cuisine
              </p>
            </div>

            {/* Navigation */}
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setUnauthMobileMenuOpen(false)}
                  className={clsx(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                    activeSection === item.name
                      ? "bg-gradient-to-r from-green-100 to-yellow-50 text-green-700 shadow-md"
                      : "text-gray-700 hover:bg-gray-50 hover:text-green-600"
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center gap-3">
                    {/* Icon for each menu item */}
                    {item.name === "Home" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    {item.name === "Menu" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    )}
                    {item.name === "Our History" && (
                      <svg
                        className="w-5 h-5"
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
                    {item.name === "Reservation" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {item.name === "Reviews" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                    )}
                    {item.name === "Contact" && (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {item.name}
                  </span>
                  {activeSection === item.name && (
                    <svg
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </Link>
              ))}
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Shopping Cart for mobile */}
            <div className="mb-4">
              <ShoppingCart />
            </div>

            {/* Login button */}
            <Link
              href="/login"
              onClick={() => setUnauthMobileMenuOpen(false)}
              className="group relative flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>Log in to your account</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>

            {/* Footer info */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl text-center">
              <p className="text-xs text-gray-500">
                New to Little Lemon?
                <Link
                  href="/register"
                  className="ml-1 text-green-600 font-semibold hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarUnauth;
