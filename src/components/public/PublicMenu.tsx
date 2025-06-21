"use client";

import Link from "next/link";
import Image from "next/image";
import CategoryModal from "@/components/public/CategoryModal";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import useSectionObserver from "@/libs/hooks/useSectionObserver";

const PublicMenu = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    landingCategoryDialog,
    setLandingCategoryDialog,
  } = useLittleLemonStore();

  const limitedCategories = categories.slice(0, 4);
  const ref = useSectionObserver({ sectionName: "Menu" });

  return (
    <section
      id="public-menu"
      ref={ref}
      className="mx-auto max-w-7xl px-6 py-20 lg:px-8 bg-white"
    >
      {/* Título */}
      <h2 className="text-4xl font-bold tracking-tight text-center text-gray-900 sm:text-5xl mb-16">
        Our Menu
      </h2>

      {/* Lista de categorías */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
        {limitedCategories.map((category) => (
          <li
            key={category.id}
            className="relative group rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
          >
            <Image
              priority
              width={500}
              height={500}
              src={category.thumb}
              alt={category.strCategory}
              className="w-full h-64 object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black/40">
              <button
                onClick={() => {
                  setSelectedCategory(category);
                  setLandingCategoryDialog(true);
                }}
                className="rounded-lg bg-white/90 px-5 py-2 text-sm font-semibold text-gray-900 backdrop-blur-md hover:bg-white transition-all cursor-pointer"
              >
                View Info
              </button>
            </div>

            <h3 className="mt-4 mb-4 text-center text-lg font-medium text-gray-800">
              {category.strCategory}
            </h3>
          </li>
        ))}

        {/* Modal condicional */}
        {landingCategoryDialog && selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => {
              setLandingCategoryDialog(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </ul>

      {/* Botón para ver menú completo */}
      <div className="flex justify-center mb-14">
        <Link
          href="/menu"
          className="rounded-md bg-green-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition-colors"
        >
          View Full Menu
        </Link>
      </div>

      {/* Texto descriptivo final */}
      <div className="grid gap-10 lg:grid-cols-2 text-gray-700 text-lg leading-relaxed">
        <p>
          The Little Lemon menu offers a carefully curated experience that
          emphasizes refinement and warmth, inviting guests into a space where
          dining becomes more than just a meal. Each component of the menu is
          selected to reflect the restaurant&#39;s commitment to quality,
          consistency, and culinary artistry.
        </p>
        <p>
          At Little Lemon, the menu represents more than a list of dishes—it is
          an expression of the restaurant&rsquo;s philosophy of hospitality and
          taste. From the initial welcome to the final bite, guests are guided
          through a dining journey designed to be memorable, relaxed, and
          engaging.
        </p>
      </div>
    </section>
  );
};

export default PublicMenu;
