"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CategoryModal from "@/components/public/CategoryModal";
import { useLittleLemonStore } from "@/store/little-lemon-store";
import useSectionObserver from "@/libs/hooks/useSectionObserver";

export default function LandingCategories() {
  const { categories, fetchCategories, selectedCategory, setSelectedCategory } =
    useLittleLemonStore();
  const limitedCategories = categories.slice(0, 4);

  const ref = useSectionObserver({ sectionName: "Menu" });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <section
      id="menu"
      ref={ref}
      className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8"
    >
      <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl mb-16">
        Our Menu
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {limitedCategories.map((category) => (
          <div
            key={category.id}
            className="relative group rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              priority
              width={500}
              height={500}
              src={category.thumb}
              alt={category.strCategory}
              className="w-full h-64 object-cover"
            />

            {/* Botón que aparece al hacer hover */}
            <div className="absolute inset-0 flex items-center justify-center mt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={() => setSelectedCategory(category)}
                className="rounded-md bg-white/80 px-4 py-2 text-sm font-medium text-gray-900 backdrop-blur-sm backdrop-filter hover:bg-white transition-colors cursor-pointer"
              >
                View Side Info
              </button>
            </div>

            {/* Título debajo de la imagen */}
            <h3 className="mt-2 text-sm text-gray-900 text-center mb-4">
              {category.strCategory}
            </h3>
          </div>
        ))}

        {selectedCategory && (
          <CategoryModal
            category={selectedCategory}
            onClose={() => setSelectedCategory(null)}
          />
        )}
      </div>
      <div className="mt-6">
        <Link
          href="/menu"
          className="sm:w-1/2 lg:w-1/3 flex justify-center items-center rounded-md border border-transparent bg-blue-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden cursor-pointer transition-colors mx-auto mt-10"
        >
          View Full Menu
        </Link>
      </div>
      <div className="mt-10 flex flex-col lg:flex-row lg:gap-10">
        <p>
          The Little Lemon menu offers a carefully curated experience that
          emphasizes refinement and warmth, inviting guests into a space where
          dining becomes more than just a meal. Each component of the menu is
          selected to reflect the restaurant&#39;s commitment to quality,
          consistency, and culinary artistry. Rather than overwhelming guests
          with excessive variety, the menu presents a balanced offering that
          speaks to thoughtful preparation and a clear vision. The ambiance,
          service, and presentation are all seamlessly aligned to create a
          cohesive atmosphere that enhances every visit. This unified approach
          to dining ensures that guests leave not only satisfied but genuinely
          impressed by the experience.
        </p>
        At Little Lemon, the menu represents more than a list of dishes—it is an
        expression of the restaurant&rsquo;s philosophy of hospitality and
        taste. With a focus on delivering comfort through elegance, the team
        works to provide meals that resonate on both emotional and sensory
        levels. Each offering is part of a deliberate and well-structured
        presentation that avoids excess while maximizing flavor and
        satisfaction. From the initial welcome to the final bite, guests are
        guided through a dining journey designed to be memorable, relaxed, and
        engaging. This thoughtful experience encourages return visits and
        lasting appreciation without needing to rely on specific descriptions of
        the cuisine.
      </div>
    </section>
  );
}
