import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
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

  // Detectar si estamos en la página de login
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <header className="fixed inset-x-0 top-0 z-50 nav-blur">
      <nav className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl">
        {/* Logo with hover effect */}
        <Link
          href="/#home"
          className={clsx(
            "group flex items-center space-x-2 transition-transform duration-300 hover:scale-105",
            isLoginPage && "text-green-600" // Logo también verde en login
          )}
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
            className={clsx(
              "relative inline-flex items-center justify-center rounded-xl p-2.5 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200",
              isLoginPage
                ? "text-green-600 bg-green-50 hover:bg-green-100"
                : "text-gray-700 bg-white/80 backdrop-blur hover:bg-green-50"
            )}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-10">
          {navigation.map((item) =>
            item.name === "Reservation" ? (
              <ReservationNavLink key={item.name} isLoginPage={isLoginPage} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative py-2 text-sm font-medium transition-all duration-300 group",
                  // Estilos cuando está en login
                  isLoginPage
                    ? [
                        "text-green-600 font-semibold no-underline hover:text-green-700",
                        activeSection === item.name && "text-green-700",
                      ]
                    : [
                        // Estilos normales
                        "text-gray-700 hover:text-green-600",
                        activeSection === item.name &&
                          "text-green-600 font-semibold",
                      ]
                )}
              >
                <span className="relative z-10">{item.name}</span>

                {!isLoginPage && (
                  <span
                    className={clsx(
                      "absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-green-600 to-yellow-500 transition-all duration-300",
                      activeSection === item.name
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    )}
                  />
                )}

                {/* Background hover - diferente en login */}
                <span
                  className={clsx(
                    "absolute inset-0 -z-10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center",
                    isLoginPage ? "bg-green-100/50" : "bg-green-50/50"
                  )}
                />
              </Link>
            )
          )}
        </div>

        {/* Right Buttons (Cart + Login) */}
        <div className="hidden lg:flex items-center gap-4">
          <ShoppingCart />
          {/* Si ya está en login, no mostrar el botón o mostrarlo diferente */}
          {isLoginPage ? (
            <span className="px-5 py-2.5 text-sm font-semibold text-green-600 bg-green-50 rounded-full">
              Sign In Page
            </span>
          ) : (
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
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          )}
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
          <div
            className={clsx(
              "h-2",
              isLoginPage
                ? "bg-gradient-to-r from-green-600 to-green-500"
                : "bg-gradient-to-r from-green-600 via-yellow-500 to-green-600"
            )}
          ></div>

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

            {/* Navigation */}
            <div className="space-y-2">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setUnauthMobileMenuOpen(false)}
                  className={clsx(
                    "group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-all duration-200",
                    isLoginPage
                      ? [
                          "text-green-600 font-semibold",
                          activeSection === item.name
                            ? "bg-green-100 text-green-700"
                            : "hover:bg-green-50",
                        ]
                      : [
                          activeSection === item.name
                            ? "bg-gradient-to-r from-green-100 to-yellow-50 text-green-700 shadow-md"
                            : "text-gray-700 hover:bg-gray-50 hover:text-green-600",
                        ]
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <span className="flex items-center gap-3">
                    {/* Icons... */}
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

            {/* Login section */}
            {!isLoginPage ? (
              <Link
                href="/login"
                onClick={() => setUnauthMobileMenuOpen(false)}
                className="mt-6 group relative flex items-center justify-center gap-2 w-full rounded-full bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
            ) : (
              <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
                <p className="text-green-700 font-semibold">
                  You&#39;re on the login page
                </p>
                <p className="text-green-600 text-sm mt-1">
                  Enter your credentials to continue
                </p>
              </div>
            )}
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarUnauth;
