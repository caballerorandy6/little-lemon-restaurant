"use client";

import useSectionObserver from "@/libs/hooks/useSectionObserver";
import CategoryList from "@/components/public/CategoryList";

const Menu = () => {
  const ref = useSectionObserver({ sectionName: "Menu" });

  return (
    <section id="menu" className="min-h-screen bg-white py-16" ref={ref}>
      <CategoryList />
    </section>
  );
};

export default Menu;
