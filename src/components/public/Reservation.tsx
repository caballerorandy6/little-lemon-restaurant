"use client";

import useSectionObserver from "@/libs/hooks/useSectionObserver";

const Reservation = () => {
  const ref = useSectionObserver({ sectionName: "Reservation" });
  return (
    <section id="reservation" ref={ref} className="min-h-screen">
      Reservation
    </section>
  );
};

export default Reservation;
