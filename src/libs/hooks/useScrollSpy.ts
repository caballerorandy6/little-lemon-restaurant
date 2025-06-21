"use client";

import { useEffect } from "react";

const sectionTitles: Record<string, string> = {
  home: "Little Lemon | Home",
  about: "Little Lemon | Menu",
  services: "Little Lemon | Our History",
  testimonials: "Little Lemon | Reservation",
  contact: "Little Lemon | Reviews",
  faq: "Little Lemon | Contact",
};

export function useScrollSpy(sectionIds: string[]) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              // Cambia la URL sin recargar la página
              history.replaceState(null, "", `#${id}`);

              // Cambia dinámicamente el título
              const newTitle = sectionTitles[id] || "Little Lemon";
              if (document.title !== newTitle) {
                document.title = newTitle;
              }
            }
            break; // solo uno visible a la vez
          }
        }
      },
      {
        rootMargin: "-50% 0px -50% 0px", // activa cuando la sección esté centrada
        threshold: 0,
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    elements.forEach((el) => observer.observe(el!));

    return () => observer.disconnect();
  }, [sectionIds]);
}
