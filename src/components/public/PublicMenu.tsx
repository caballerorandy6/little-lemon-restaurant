"use client";

import useSectionObserver from "@/libs/hooks/useSectionObserver";
import LandingCategories from "../unauthenticated/LandingCategoryList";

const PublicMenu = () => {
  const ref = useSectionObserver({ sectionName: "Menu" });

  return (
    <section id="public-menu" className="min-h-screen bg-white py-16" ref={ref}>
      <LandingCategories />
    </section>
  );
};

export default PublicMenu;
