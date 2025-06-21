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
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur border-gray-200">
      <nav className="mx-auto flex items-center justify-between px-6 py-3 max-w-7xl">
        {/* Logo */}
        <Link href="/#home" className="flex items-center space-x-2">
          <Image
            priority
            width={1000}
            height={1000}
            alt="Little Lemon Logo"
            src="/logo/logo4.webp"
            className="h-10 w-auto"
          />
        </Link>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setUnauthMobileMenuOpen(true)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) =>
            item.name === "Reservation" ? (
              <ReservationNavLink key={item.name} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative text-sm font-medium text-gray-600 transition hover:text-green-600 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full",
                  {
                    "text-green-600 font-semibold after:w-full":
                      activeSection === item.name,
                  }
                )}
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        {/* Right Buttons (Cart + Login) */}
        <div className="hidden lg:flex items-center gap-4">
          <ShoppingCart />
          <Link
            href="/login"
            className="text-sm font-medium text-gray-900 rounded px-4 py-1.5 hover:bg-gray-100 hover:text-green-600 transition"
          >
            Log in <span aria-hidden="true">&rarr;</span>
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
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-xl px-6 py-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Link href="/#home" onClick={() => setUnauthMobileMenuOpen(false)}>
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
              className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setUnauthMobileMenuOpen(false)}
                className={clsx(
                  "block rounded px-3 py-2 text-base text-gray-800 hover:bg-gray-100 hover:text-green-600 transition",
                  {
                    "bg-gray-100 text-green-600 font-semibold":
                      activeSection === item.name,
                  }
                )}
              >
                {item.name}
              </Link>
            ))}
            <ShoppingCart />
            <Link
              href="/login"
              onClick={() => setUnauthMobileMenuOpen(false)}
              className="block mt-4 text-center rounded bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition"
            >
              Log in
            </Link>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarUnauth;
