"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export const useScrollTo = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const scrolled = useRef(false);

  useEffect(() => {
    if (scrolled.current) return;

    const params = searchParams.get("scrollTo");
    if (params) {
      const element = document.getElementById(params);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("scrollTo");
        router.replace(`?${newParams.toString()}`, { scroll: false });

        scrolled.current = true;
      }
    }
  }, [searchParams, router]);
};
