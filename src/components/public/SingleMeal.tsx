"use client";

import { Fragment } from "react";
// import { StarIcon } from "@heroicons/react/20/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import Link from "next/link";
import { CartItem } from "@/libs/types";
import { MealAPI } from "@/libs/types";

export const faq = [];

interface ClassNames {
  (...classes: (string | undefined | null | false)[]): string;
}

const classNames: ClassNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export default function SingleMeal() {
  const { singleMeal, addToCart, removeFromCart, specificItemQuantity, cart } =
    useLittleLemonStore();

  // Remove unwanted keys from the meal object
  const keysToRemove = ["tags", "video"];
  const item = Object.fromEntries(
    Object.entries(singleMeal || {}).filter(
      ([key]) => !keysToRemove.includes(key)
    )
  );

  // Create a new object with the remaining keys
  const cartItem: CartItem = {
    item: item as MealAPI,
    quantity: specificItemQuantity,
    image: singleMeal?.strMealThumb || "",
  };

  const quantityItemCart = cart.find(
    (item: CartItem) => item?.item?.id === singleMeal?.id
  );

  return (
    <div className="bg-white mt-20">
      <div className="mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        {/* Product */}
        <div className="lg:grid lg:grid-cols-7 lg:grid-rows-1 lg:gap-x-8 lg:gap-y-10 xl:gap-x-16">
          {/* Product image */}
          <div className="lg:col-span-4 lg:row-end-1">
            {singleMeal && singleMeal.strMealThumb ? (
              <Image
                priority
                width={500}
                height={500}
                alt={singleMeal.strMeal}
                src={singleMeal.strMealThumb}
                className="aspect-4/3 w-full rounded-lg bg-gray-100 object-cover"
              />
            ) : (
              <div className="aspect-4/3 w-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-400">
                No image available
              </div>
            )}
            <div className="mt-6">
              <Link
                href="/cart"
                className="sm:w-1/2 lg:w-1/3 flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors"
              >
                Go to Cart
              </Link>
            </div>
          </div>

          {/* meal details */}
          <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:row-span-2 lg:row-end-2 lg:mt-0 lg:max-w-none">
            <div className="flex flex-col-reverse">
              <div className="mt-4">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {singleMeal?.strMeal}
                </h1>
                <p className="mt-2 text-sm text-gray-500">
                  Last Update:{" "}
                  {singleMeal?.updatedAt &&
                    new Date(singleMeal.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  (Tags: {singleMeal?.strTags})
                </p>
              </div>

              <div>
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  {/* {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        meal?.reviews.average > rating
                          ? "text-yellow-400"
                          : "text-gray-300",
                        "size-5 shrink-0"
                      )}
                    />
                  ))} */}
                </div>
                {/* <p className="sr-only">{reviews.average} out of 5 stars</p> */}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <button
                onClick={() => addToCart(cartItem)}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-800 px-8 py-3 text-base font-medium text-white hover:bg-green-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors"
              >
                Add To Cart
              </button>
              <button
                onClick={() => removeFromCart(cartItem.item.id)}
                type="button"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors"
              >
                Remove
              </button>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">Quantity</h3>
              <p className="mt-4 text-sm">{quantityItemCart?.quantity ?? 0}</p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">Price</h3>
              <p className="mt-4 text-sm">
                ${(singleMeal?.price ?? 0) * (quantityItemCart?.quantity ?? 0)}
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">Watch Video</h3>
              <Link
                target="_blank"
                href={singleMeal?.strYoutube ?? "#"}
                className="mt-4 text-blue-500 hover:text-blue-700 transition-colors text-sm"
              >
                {singleMeal?.strYoutube ?? "No video available"}
              </Link>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">Instructions</h3>
              <p className="mt-4 text-sm text-gray-500">
                {singleMeal?.strInstructions}{" "}
              </p>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h3 className="text-sm font-bold text-gray-900">Share</h3>
              <ul role="list" className="mt-4 flex items-center space-x-6">
                <li>
                  <Link
                    href="#"
                    className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Facebook</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-5"
                    >
                      <path
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on Instagram</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="size-6"
                    >
                      <path
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                        fillRule="evenodd"
                      />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex size-6 items-center justify-center text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Share on X</span>
                    <svg
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                      className="size-5"
                    >
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-16 w-full max-w-2xl lg:col-span-4 lg:mt-0 lg:max-w-none">
            <TabGroup>
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8">
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    Customer Reviews
                  </Tab>
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    FAQ
                  </Tab>
                  <Tab className="border-b-2 border-transparent py-6 text-sm font-medium whitespace-nowrap text-gray-700 hover:border-gray-300 hover:text-gray-800 data-selected:border-indigo-600 data-selected:text-indigo-600">
                    License
                  </Tab>
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                <TabPanel className="-mb-10">
                  <h3 className="sr-only">Customer Reviews</h3>

                  {singleMeal?.reviews.map((review, reviewIdx) => (
                    <div
                      key={review.id}
                      className="flex space-x-4 text-sm text-gray-500"
                    >
                      <div className="flex-none py-10">
                        <Image
                          priority={false}
                          width={500}
                          height={500}
                          alt=""
                          src="#"
                          className="size-10 rounded-full bg-gray-100"
                        />
                      </div>
                      <div
                        className={classNames(
                          reviewIdx === 0 ? "" : "border-t border-gray-200",
                          "py-10"
                        )}
                      >
                        <h3 className="font-medium text-gray-900">
                          {/* {review.author} */}
                        </h3>
                        <p>
                          {/* <time dateTime={review.datetime}>{review.date}</time> */}
                        </p>

                        <div className="mt-4 flex items-center">
                          {/* {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                              key={rating}
                              aria-hidden="true"
                              className={classNames(
                                review.rating > rating
                                  ? "text-yellow-400"
                                  : "text-gray-300",
                                "size-5 shrink-0"
                              )}
                            />
                          ))} */}
                        </div>
                        <p className="sr-only">
                          {/* {review.rating} out of 5 stars */}
                        </p>

                        <div
                          // dangerouslySetInnerHTML={{ __html: review.content }}
                          className="mt-4 text-sm/6 text-gray-500"
                        />
                      </div>
                    </div>
                  ))}
                </TabPanel>

                <TabPanel className="text-sm text-gray-500">
                  <h3 className="sr-only">Frequently Asked Questions</h3>

                  <dl>
                    {/* {faqs.map((faq) => (
                      <Fragment key={faq.question}>
                        <dt className="mt-10 font-medium text-gray-900">
                          {faq.question}
                        </dt>
                        <dd className="mt-2 text-sm/6 text-gray-500">
                          <p>{faq.answer}</p>
                        </dd>
                      </Fragment>
                    ))} */}
                  </dl>
                </TabPanel>

                <TabPanel className="pt-10">
                  <h3 className="sr-only">License</h3>

                  <div
                    // dangerouslySetInnerHTML={{ __html: license.content }}
                    className="text-sm text-gray-500 [&_h4]:mt-5 [&_h4]:font-medium [&_h4]:text-gray-900 [&_li]:pl-2 [&_li::marker]:text-gray-300 [&_p]:my-2 [&_p]:text-sm/6 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-sm/6 [&>:first-child]:mt-0"
                  />
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
