"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Image from "next/image";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import Link from "next/link";
import { CartItem } from "@/libs/types";
import { MealAPI } from "@/libs/types";
import { toast } from "sonner";

export const faq = [];

export default function SingleMeal() {
  const { singleMeal, addToCart, removeFromCart, specificItemQuantity, cart } =
    useLittleLemonStore();

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

  const handleAddToCart = () => {
    addToCart(cartItem);
    toast.success(`${singleMeal?.strMeal} added to cart!`);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(cartItem.item.id);
    toast.info(`${singleMeal?.strMeal} removed from cart`);
  };

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 min-h-screen">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-yellow-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="mx-auto px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 animate-fadeIn">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link
                href="/menu"
                className="text-gray-500 hover:text-green-600 transition-colors"
              >
                Menu
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-gray-900 font-medium">{singleMeal?.strMeal}</li>
          </ol>
        </nav>

        {/* Product */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          {/* Product image */}
          <div className="animate-fadeInUp">
            <div className="relative group">
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-md text-gray-800 shadow-md">
                  {singleMeal?.category?.strCategory || "Category"}
                </span>
              </div>

              {/* Price Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md">
                  ${singleMeal?.price || "12.99"}
                </span>
              </div>

              {singleMeal && singleMeal.strMealThumb ? (
                <Image
                  priority
                  width={800}
                  height={600}
                  alt={singleMeal.strMeal}
                  src={singleMeal.strMealThumb}
                  className="w-full aspect-4/3 rounded-2xl bg-gray-100 object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                />
              ) : (
                <div className="aspect-4/3 w-full rounded-2xl bg-gray-100 flex items-center justify-center text-gray-400">
                  No image available
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              <Link
                href="/cart"
                className="group flex justify-center items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                View Cart
              </Link>
              <Link
                href="/menu"
                className="group flex justify-center items-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Menu
              </Link>
            </div>
          </div>

          {/* meal details */}
          <div className="mt-10 lg:mt-0 animate-fadeInUp animation-delay-200">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      {singleMeal?.strMeal}
                    </h1>
                    <div className="mt-3 flex items-center gap-4">
                      {/* Rating */}
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 text-yellow-400 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-2 text-sm text-gray-600">
                          (4.8)
                        </span>
                      </div>
                      {/* Tags */}
                      {singleMeal?.strTags && (
                        <div className="flex gap-2">
                          {singleMeal.strTags
                            .split(",")
                            .slice(0, 2)
                            .map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full"
                              >
                                {tag.trim()}
                              </span>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  Last Updated:{" "}
                  {singleMeal?.updatedAt &&
                    new Date(singleMeal.updatedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </p>
              </div>

              {/* Quantity and Price */}
              <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Quantity in Cart
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-gray-900">
                        {quantityItemCart?.quantity ?? 0}
                      </span>
                      <span className="text-sm text-gray-500">items</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                      Total Price
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-green-600">
                        $
                        {(
                          (singleMeal?.price ?? 12.99) *
                          (quantityItemCart?.quantity ?? 0)
                        ).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-400 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                >
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add to Cart
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-xl overflow-hidden">
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                </button>
                <button
                  onClick={handleRemoveFromCart}
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-red-200 bg-red-50 px-6 py-3 text-base font-semibold text-red-600 hover:bg-red-100 hover:border-red-300 transition-all duration-200 cursor-pointer"
                >
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>

              {/* Video Link */}
              {singleMeal?.strYoutube && (
                <div className="mt-8 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    📹 Watch Tutorial
                  </h3>
                  <Link
                    target="_blank"
                    href={singleMeal.strYoutube}
                    className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors text-sm font-medium"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    Watch on YouTube
                  </Link>
                </div>
              )}

              {/* Share */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Share this meal
                </h3>
                <div className="flex items-center gap-3">
                  <Link
                    href="#"
                    className="p-2 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-2 rounded-lg bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </Link>
                  <Link
                    href="#"
                    className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-16 animate-fadeIn animation-delay-400">
          <TabGroup>
            <div className="border-b border-gray-200">
              <TabList className="-mb-px flex space-x-8">
                <Tab className="border-b-2 border-transparent py-4 px-1 text-base font-semibold whitespace-nowrap text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200 data-[selected]:border-green-600 data-[selected]:text-green-600">
                  Instructions
                </Tab>
                <Tab className="border-b-2 border-transparent py-4 px-1 text-base font-semibold whitespace-nowrap text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200 data-[selected]:border-green-600 data-[selected]:text-green-600">
                  Reviews
                </Tab>
                <Tab className="border-b-2 border-transparent py-4 px-1 text-base font-semibold whitespace-nowrap text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all duration-200 data-[selected]:border-green-600 data-[selected]:text-green-600">
                  Nutrition
                </Tab>
              </TabList>
            </div>
            <TabPanels>
              <TabPanel className="py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    How to Prepare
                  </h3>
                  <div className="prose prose-green max-w-none">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {singleMeal?.strInstructions ||
                        "Instructions will be available soon."}
                    </p>
                  </div>
                </div>
              </TabPanel>

              <TabPanel className="py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Customer Reviews
                  </h3>
                  {singleMeal?.reviews && singleMeal.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {singleMeal.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="border-b border-gray-200 pb-6 last:border-0"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold">
                              {review.user?.name[0] || "U"}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <h4 className="font-semibold text-gray-900">
                                  {review.user?.name || "Anonymous"}
                                </h4>
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <svg
                                      key={i}
                                      className={`w-4 h-4 ${i < (review.rating || 4) ? "text-yellow-400" : "text-gray-300"} fill-current`}
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="mt-2 text-gray-600">
                                {review.comment || "Great meal!"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                      <p className="text-gray-500">
                        No reviews yet. Be the first to review!
                      </p>
                      <button className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        Write a Review
                      </button>
                    </div>
                  )}
                </div>
              </TabPanel>

              <TabPanel className="py-8">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Nutritional Information
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">320</p>
                      <p className="text-sm text-gray-600 mt-1">Calories</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">24g</p>
                      <p className="text-sm text-gray-600 mt-1">Protein</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">18g</p>
                      <p className="text-sm text-gray-600 mt-1">Carbs</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                      <p className="text-2xl font-bold text-purple-600">12g</p>
                      <p className="text-sm text-gray-600 mt-1">Fat</p>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
}
