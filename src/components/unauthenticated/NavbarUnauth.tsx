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
  { name: "Review", href: "/#review" },
  { name: "Contact", href: "/#contact" },
];

const NavbarUnauth = () => {
  const { unauthMobileMenuOpen, setUnauthMobileMenuOpen, activeSection } =
    useLittleLemonStore();

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav className="mx-auto flex items-center justify-between px-8 py-4 fixed w-full transition-all nav-blur duration-300">
        <div className="flex lg:flex-1">
          <Link href="/#home" className="-m-1.5 p-1.5">
            <Image
              priority
              width={1000}
              height={1000}
              alt="Little Lemon Logo"
              src="/logo/logo4.webp"
              className="h-10 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden ">
          <button
            type="button"
            onClick={() => setUnauthMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <Bars3Icon className="size-6 cursor-pointer" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) =>
            item.name === "Reservation" ? (
              <ReservationNavLink key={item.name} />
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "relative text-sm text-gray-500 font-sans transition-colors duration-300 ease-in-out hover:text-green-600 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all after:duration-300 hover:after:w-full",
                  {
                    "text-green-600 after:w-full font-semibold":
                      activeSection === item.name,
                  }
                )}
              >
                {item.name}
              </Link>
            )
          )}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center gap-4">
          <ShoppingCart />
          <div>
            <Link
              href="/login"
              className="text-sm text-gray-900 bg-transparent hover:bg-gray-200 hover:text-green-600 rounded px-3 py-1 transition-colors"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </nav>
      <Dialog
        open={unauthMobileMenuOpen}
        onClose={setUnauthMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link
              href="/#home"
              className="-m-1.5 p-1.5"
              onClick={() => setUnauthMobileMenuOpen(false)}
            >
              <span className="sr-only">Little Lemon</span>
              <Image
                priority
                width={500}
                height={500}
                alt="Little Lemon Logo"
                src="/logo/logo6.webp"
                className="h-20 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setUnauthMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon
                aria-hidden="true"
                className="size-6 cursor-pointer hover:bg-gray-100 rounded transition-colors"
              />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    onClick={() => setUnauthMobileMenuOpen(false)}
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "-mx-3 block rounded-lg px-3 py-2 text-base/7 text-gray-900 hover:bg-gray-50 transition-colors hover:text-green-600",
                      {
                        "bg-gray-50 text-green-600 font-semibold":
                          activeSection === item.name,
                      }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <ShoppingCart />
              </div>
              <div className="py-6">
                <Link
                  onClick={() => setUnauthMobileMenuOpen(false)}
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 text-gray-900 hover:text-green-600 hover:bg-gray-50 transition-colors"
                >
                  Log in
                </Link>
              </div>
              <div className="py-6"></div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};

export default NavbarUnauth;
