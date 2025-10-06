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
      // Enable pin/scrub animations only on desktop, disable on small screens
      ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
          if (tl.current) tl.current.kill();
          tl.current = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              pin: true,
              start: "top top",
              end: "+=1500",
              scrub: 1,
            },
          });
        },
        "(max-width: 767px)": () => {
          if (tl.current) {
            tl.current.kill();
            tl.current = null;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden"
    >
      {/* Main Text */}
      <h1
        className="
          font-inter font-semibold text-[#191919] z-10 text-center
          text-[48px] sm:text-[80px] md:text-[200px] lg:text-[280px] xl:text-[360px]
          mb-1 sm:mb-2 md:mb-0
        "
      >
        Styler
      </h1>

      {/* Card Carousel */}
      <div
        className="
          relative w-full flex justify-center 
          z-50 
          h-[200px] sm:h-[250px] md:h-[50vh] md:max-h-[400px]
          px-4
          mt-1 sm:mt-2 md:mt-0
          md:absolute md:left-1/2 md:-translate-x-1/2 md:top-[28%]
          lg:top-[22%] xl:top-[18%]
        "
      >
        <CardCarousel timeline={tl} />
      </div>

      {/* Circular/Responsive Gallery */}
      <div className="w-full mt-6 sm:mt-8 md:mt-10">
        <ResponsiveGallery timeline={tl} />
      </div>
    </div>
  );
};

export default Landing;
