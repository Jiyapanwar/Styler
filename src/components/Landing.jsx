// src/Landing.js

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "./CircularGallery";
import CardCarousel from "./CardCarousel";

gsap.registerPlugin(ScrollTrigger);

const Landing = () => {
  const containerRef = useRef(null);
  // Create a ref for the timeline so it can be passed to children
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Create the master timeline
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          // Pin the entire container
          pin: true,
          // Start the animation when the top of the container hits the top of the viewport
          start: "top top",
          // End the animation after scrolling 2000px
          end: "+=1500",
          // Link the animation progress to the scrollbar
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Add a ref to the main container
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-[100vh] bg-white overflow-hidden"
    >
      {/* Card Carousel overlayed on text */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[600px] h-[400px]">
        {/* Pass the timeline down as a prop */}
        <CardCarousel timeline={tl} />
      </div>

      {/* Main Text */}
      <h1 className="font-inter text-[380px] font-semibold text-[#191919] z-10">
        Styler
      </h1>

      {/* Circular Gallery */}
      <div>
        {/* Pass the timeline down as a prop */}
        <CircularGallery timeline={tl} />
      </div>
    </div>
  );
};

export default Landing;