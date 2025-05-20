import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLittleLemonStore } from "@/store/little-lemon-store";

interface UseSectionObserverProps {
  sectionName: string;
}

export default function useSectionObserver({
  sectionName,
}: UseSectionObserverProps) {
  const { setActiveSection } = useLittleLemonStore();

  const { ref, inView } = useInView({
    threshold: 0.4,
  });

  useEffect(() => {
    if (inView) {
      setActiveSection(sectionName);
    }
  }, [inView, sectionName, setActiveSection]);

  return ref;
}
