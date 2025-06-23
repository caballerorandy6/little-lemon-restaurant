"use client";

import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  //CheckIcon,
  //ClockIcon,
  QuestionMarkCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/libs/hooks/useAuth";
import Spinner from "./Spinner";

export default function Cart() {
  const { cart, updateQuantity, emptyCart, removeItems } =
    useLittleLemonStore();
  const { isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  //Subtotal calculation
  const subTotal = cart
    .reduce((acc, product) => {
      return acc + product?.item?.price * product.quantity;
    }, 0)
    .toFixed(2);

  //Tax calculation
  const taxCalculation = (Number(subTotal) * 0.075).toFixed(2);

  //Shipping calculation
  const shippingCalculation = (Number(subTotal) * 0.05).toFixed(2);

  //Total calculation
  const totalCalculation = (
    Number(subTotal) +
    Number(taxCalculation) +
    Number(shippingCalculation)
  ).toFixed(2);

  return (
    <section id="cart" className="bg-white mt-20">
      <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" className="lg:col-span-7">
            <h2 id="cart-heading" className="sr-only">
              Items in your shopping cart
            </h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-t border-b border-gray-200"
            >
              {cart.map((product, productIdx) => (
                <li
                  key={product?.item?.id + Math.random()}
                  className="flex py-6 sm:py-10"
                >
                  <Link
                    href={`/meals-by-category/${encodeURIComponent(
                      product?.item?.category?.strCategory
                    )}/${product?.item?.strMeal}`}
                    className="shrink-0"
                  >
                    <Image
                      priority
                      width={500}
                      height={500}
                      alt={product?.item?.strMeal || "Meal Image"}
                      src={product?.image}
                      className="size-24 rounded-md object-cover sm:size-48"
                    />
                  </Link>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm">
                            <Link
                              href={`/meals-by-category/${encodeURIComponent(
                                product?.item?.category?.strCategory ||
                                  "unknown"
                              )}/${encodeURIComponent(product?.item?.strMeal || "meal")}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product?.item?.strMeal}
                            </Link>
                          </h3>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          {product?.item?.price}
                        </p>
                      </div>

                      <div className="mt-4 sm:mt-0 sm:pr-9">
                        <div className="grid w-full max-w-16 grid-cols-1">
                          <select
                            name={`quantity-${productIdx}`}
                            aria-label={`Quantity, ${product?.quantity}`}
                            value={product?.quantity}
                            className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            onChange={(e) => {
                              const newQuantity = Number(e.target.value);
                              updateQuantity(product.item.id, newQuantity);
                            }}
                          >
                            {[...Array(10).keys()].map((n) => (
                              <option key={n + 1} value={n + 1}>
                                {n + 1}
                              </option>
                            ))}
                          </select>
                          <ChevronDownIcon
                            aria-hidden="true"
                            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                          />
                        </div>

                        <div className="absolute top-0 right-0">
                          <button
                            onClick={() => removeItems(product.item.id)}
                            type="button"
                            className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500 cursor-pointer"
                          >
                            <span className="sr-only">Remove</span>
                            <XMarkIcon aria-hidden="true" className="size-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                      {product.inStock ? (
                        <CheckIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-green-500"
                        />
                      ) : (
                        <ClockIcon
                          aria-hidden="true"
                          className="size-5 shrink-0 text-gray-300"
                        />
                      )}

                      <span>
                        {product.inStock
                          ? "In stock"
                          : `Ships in ${product.leadTime}`}
                      </span>
                    </p> */}
                  </div>
                </li>
              ))}
            </ul>
            {cart.length > 0 ? (
              <div className="mt-6">
                <Link
                  onClick={emptyCart}
                  href="/cart"
                  className="sm:w-1/2 lg:w-1/3 flex justify-center items-center rounded-md border border-transparent bg-red-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-red-500 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors"
                >
                  Empty Cart
                </Link>
              </div>
            ) : (
              <h1>No items</h1>
            )}
          </section>

          {/* Order summary */}
          <section
            aria-labelledby="summary-heading"
            className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2
              id="summary-heading"
              className="text-lg font-medium text-gray-900"
            >
              Order summary
            </h2>

            <dl className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <dt className="text-sm text-gray-600">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {subTotal}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <Link
                    href="#"
                    className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how shipping is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </Link>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {shippingCalculation}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="flex text-sm text-gray-600">
                  <span>Tax estimate</span>
                  <Link
                    href="#"
                    className="ml-2 shrink-0 text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">
                      Learn more about how tax is calculated
                    </span>
                    <QuestionMarkCircleIcon
                      aria-hidden="true"
                      className="size-5"
                    />
                  </Link>
                </dt>
                <dd className="text-sm font-medium text-gray-900">
                  {taxCalculation}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt className="text-base font-medium text-gray-900">
                  Order total
                </dt>
                <dd className="text-base font-medium text-gray-900">
                  {totalCalculation}
                </dd>
              </div>
            </dl>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-green-800 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-green-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors"
              >
                Checkout
              </button>
            </div>
          </section>
        </form>
      </div>
    </section>
  );
}
