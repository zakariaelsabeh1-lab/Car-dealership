import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import Assembly from "./components/Assembly.jsx";
import Showcase from "./components/Showcase.jsx";
import Stats from "./components/Stats.jsx";
import Experience from "./components/Experience.jsx";
import CTA from "./components/CTA.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.085, smoothWheel: true });
    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Assembly />
        <Showcase />
        <Stats />
        <Experience />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
