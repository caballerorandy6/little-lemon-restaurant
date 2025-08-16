"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryModal from "@/components/public/CategoryModal";
import useSectionObserver from "@/libs/hooks/useSectionObserver";
import { useCategoryStore } from "@/store/category-store";

const PublicMenu = () => {
  const {
    setSelectedCategory,
    selectedCategory,
    categories,
    openCategoryListDialog,
    setOpenCategoryListDialog,
  } = useCategoryStore();

  const limitedCategories = categories.slice(0, 4);
  const ref = useSectionObserver({ sectionName: "Menu" });

  return (
    <section
      id="public-menu"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 overflow-hidden"
    >
      {/* Background Decoration usando las clases CSS personalizadas */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-yellow-200 rounded-full decoration-blob animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-green-200 rounded-full decoration-blob animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-lime-200 rounded-full decoration-blob animate-blob animation-delay-4000"></div>
      </div>

      {/* Título con animaciones CSS */}
      <div className="text-center mb-20">
        <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-700 bg-green-100 rounded-full animate-fadeIn">
          DISCOVER OUR FLAVORS
        </span>
        <h2 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl animate-fadeInUp animation-delay-200">
          Our <span className="text-gradient-green">Menu</span>
        </h2>
        <div className="flex items-center justify-center gap-4 mt-6">
          <div className="h-1 w-16 bg-gradient-to-r from-green-600 to-yellow-500 rounded-full"></div>
          <div className="h-1 w-12 bg-gradient-to-r from-yellow-500 to-green-400 rounded-full"></div>
          <div className="h-1 w-8 bg-green-400 rounded-full"></div>
        </div>
        <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto animate-fadeInUp animation-delay-400">
          Experience a culinary journey through Mediterranean flavors, crafted
          with passion and served with love
        </p>
      </div>

      {/* Lista de categorías usando clases CSS personalizadas */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
        {limitedCategories.map((category, index) => (
          <li
            key={category.id}
            className={`group relative animate-fadeInUp ${
              index === 0
                ? "animation-delay-200"
                : index === 1
                  ? "animation-delay-400"
                  : index === 2
                    ? "animation-delay-600"
                    : "animation-delay-800"
            }`}
          >
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg card-hover-lift">
              {/* Badge de categoría */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium badge-premium text-gray-800">
                  Premium Selection
                </span>
              </div>

              {/* Imagen con zoom effect */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  priority
                  width={500}
                  height={500}
                  src={category.thumb}
                  alt={category.strCategory}
                  className="w-full h-full object-cover image-hover-zoom"
                />
                <div className="absolute inset-0 image-overlay-gradient opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
              </div>

              {/* Contenido de la tarjeta */}
              <div className="relative p-6 bg-white">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {category.strCategory}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Explore our delicious selection
                </p>

                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setOpenCategoryListDialog(true);
                  }}
                  className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-green-600 hover:to-green-500 btn-shine cursor-pointer"
                >
                  <span>View Details</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute top-4 right-4 pointer-events-none">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
              </div>
            </div>
          </li>
        ))}

        {openCategoryListDialog && selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => {
              setOpenCategoryListDialog(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </ul>

      <div className="flex justify-center mb-20 animate-fadeInUp animation-delay-1000">
        <Link
          href="/menu"
          className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 to-green-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 hover:from-green-600 hover:to-green-500 btn-shine"
        >
          <span>Explore Full Menu</span>
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-green-50 via-yellow-50 to-green-50 p-12 shadow-inner animate-fadeIn animation-delay-1200">
        <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-300 rounded-full decoration-blob animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-300 rounded-full decoration-blob animate-pulse animation-delay-2000"></div>

        <div className="relative grid gap-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-green-700 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm font-semibold uppercase tracking-wider">
                Our Philosophy
              </span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              The Little Lemon menu offers a carefully curated experience that
              emphasizes refinement and warmth, inviting guests into a space
              where dining becomes more than just a meal. Each component of the
              menu is selected to reflect the restaurant&#39;s commitment to
              quality, consistency, and culinary artistry.
            </p>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-green-700 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold uppercase tracking-wider">
                The Experience
              </span>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              At Little Lemon, the menu represents more than a list of dishes—it
              is an expression of the restaurant&#39;s philosophy of hospitality
              and taste. From the initial welcome to the final bite, guests are
              guided through a dining journey designed to be memorable, relaxed,
              and engaging.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PublicMenu;
