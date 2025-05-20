import Hero from "@/components/unauthenticated/Hero";
import Menu from "@/components/public/Menu";
import About from "@/components/unauthenticated/About";
import Reservation from "@/components/public/Reservation";
import Review from "@/components/public/Review";
import Contact from "@/components/public/Contact";

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Hero />
      <Menu />
      <About />
      <Reservation />
      <Review />
      <Contact />
    </div>
  );
};

export default LandingPage;
