// import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "./CircularGallery";

// gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  //   const containerRef = useRef(null);
  //   useEffect(() => {
  //     const container = containerRef.current;

  //     gsap.to(container, {

  //     });
  //   }, []);

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] ">
      <h1 className="font-inter  text-[370px] font-semibold text-[#191919]">
        Styler
      </h1>
      <div className="position-relative w-[100%] ">
        <CircularGallery
          bend={50}
          textColor="#ffffff"
          borderRadius={0.25}
          scrollEase={0.02}
        />
      </div>
    </div>
  );
};

export default Landing;
