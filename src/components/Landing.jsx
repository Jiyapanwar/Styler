import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "./CircularGallery";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const containerRef = useRef(null);
  useEffect(() => {
    const container = containerRef.current;

    gsap.to(container, {
      //   scrollTrigger: {
      //     trigger: container,
      //     // start: "top top",
      //     end: "+=2000",
      //     pin: true,
      //     scrub: 0.1,
      //   },
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] ">
      <h1 className="font-inter  text-[370px] font-semibold text-[#191919]">
        Styler
      </h1>
      <div ref={containerRef} className="w-full  ">
        <CircularGallery
          bend={15}
          textColor="#ffffff"
          borderRadius={0.25}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default Landing;
