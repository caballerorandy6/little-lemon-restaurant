"use client";

import useSectionObserver from "@/libs/hooks/useSectionObserver";

const Review = () => {
  const ref = useSectionObserver({ sectionName: "Review" });
  return (
    <section id="review" ref={ref} className="min-h-screen">
      Review
    </section>
  );
};

export default Review;
