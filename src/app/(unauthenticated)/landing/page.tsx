import Hero from "@/components/unauthenticated/Hero";
import PublicMenu from "@/components/public/PublicMenu";
import About from "@/components/unauthenticated/About";
import Reservation from "@/components/public/Reservation";
import Review from "@/components/public/Review";
import Contact from "@/components/public/Contact";
import ScrollToHandler from "@/components/public/ScrollToHandler";
import { Suspense } from "react";

const LandingPage = () => {
  return (
    <main className="bg-white">
      <Suspense fallback={null}>
        <ScrollToHandler />
      </Suspense>

      <Hero />
      <PublicMenu />
      <About />
      <Reservation />
      <Review />
      <Contact />
    </main>
  );
};

export default LandingPage;
