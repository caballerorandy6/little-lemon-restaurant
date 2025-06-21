import Hero from "@/components/unauthenticated/Hero";
import PublicMenu from "@/components/public/PublicMenu";
import About from "@/components/unauthenticated/About";
import Reviews from "@/components/public/Reviews";
import Contact from "@/components/public/Contact";
import ScrollToHandler from "@/components/public/ScrollToHandler";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landing Page",
  description:
    "Welcome to our restaurant's landing page. Explore our menu, make reservations, and learn more about us.",
};

const LandingPage = () => {
  return (
    <main className="bg-white">
      <Suspense fallback={null}>
        <ScrollToHandler />
      </Suspense>

      <Hero />
      <PublicMenu />
      <About />
      <Reviews />
      <Contact />
    </main>
  );
};

export default LandingPage;
