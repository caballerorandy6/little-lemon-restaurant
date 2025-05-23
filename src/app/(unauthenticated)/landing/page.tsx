import Hero from "@/components/unauthenticated/Hero";
import PublicMenu from "@/components/public/PublicMenu";
import About from "@/components/unauthenticated/About";
import Reservation from "@/components/public/Reservation";
import Review from "@/components/public/Review";
import Contact from "@/components/public/Contact";
import ScrollToHandler from "@/components/public/ScrollToHandler";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <ScrollToHandler />
      <Hero />
      <PublicMenu />
      <About />
      <Reservation />
      <Review />
      <Contact />
    </div>
  );
};

export default LandingPage;
