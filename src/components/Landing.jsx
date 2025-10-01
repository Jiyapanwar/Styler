// src/Landing.js

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CardCarousel from "./CardCarousel";
import ResponsiveGallery from "./ResponsiveGallery";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const containerRef = useRef(null);
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          end: "+=1500",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-screen bg-white overflow-hidden"
    >
      {/* Card Carousel */}
      <div
        className="
        absolute 
        top-[15%]  
        left-1/2 -translate-x-1/2 
        z-50 
        w-[90%] max-w-[600px] h-[50vh] max-h-[400px]
        "
      >
        <CardCarousel timeline={tl} />
      </div>

      {/* Main Text */}
      <h1
        className="
          font-inter font-semibold text-[#191919] z-10 text-center
          relative -top-6
          text-[64px] sm:text-[120px] md:text-[200px] lg:text-[280px] xl:text-[360px]
        "
      >
        Styler
      </h1>

      {/* Circular Gallery */}
      <div className="w-full mt-6 sm:mt-10">
        <ResponsiveGallery timeline={tl} />
      </div>
    </div>
  );
};

export default Landing;
