// src/MobileGallery.js
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "src/assets/6899f66baf162b757a39b091_Tennis_20Net_20Close-Up.jpg", // left wide
  "src/assets/6899f66b1594a697a2ef4c3e_Modern_20Digital_20Alarm_20Clock.jpg", // small top
  "src/assets/6899f66bd60d48c5c5315745_Matte_20Black_20Circular_20Object_20on_20Red.jpg", // small bottom
  "https://cdn.prod.website-files.com/689989c2270f878736e77521/68a061f4c6476b52f101c546_Tennis%20Court%20Smiley-p-800.webp", // big center
  "src/assets/6899f66d6417165e842c0883_Portrait_20of_20a_20Young_20Woman.jpg", // right big
  "src/assets/6899f66ced2610f6911fafcf_Glossy_20Tote_20Bags_20on_20Vibrant_20Background.jpg", // right small
];

const ImagesSection = () => {
  const containerRef = useRef(null);
  const centerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(
        centerRef.current,
        { width: "40%" },
        {
          width: "100%",
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",     // start when section hits top
            end: "+=100%",        // lock scroll until animation ends
            scrub: true,          // smooth scroll link
            pin: true,            // pin section while animating
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center w-full overflow-hidden min-h-screen px-4"
    >
      <div className="flex gap-4 items-center w-full justify-center">
        {/* Left wide */}
        <img
          src={images[0]}
          alt="Left wide"
          className="object-cover rounded-3xl flex-shrink-0
            w-32 h-40 sm:w-40 sm:h-48 md:w-52 md:h-64 lg:w-60 lg:h-68"
        />

        {/* Two stacked small cards */}
        <div className="flex flex-col gap-4 flex-shrink-0 relative -top-4 sm:-top-6">
          <img
            src={images[1]}
            alt="Small top"
            className="object-cover rounded-3xl
              w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-50 lg:h-50"
          />
          <img
            src={images[2]}
            alt="Small bottom"
            className="object-cover rounded-3xl
              w-28 h-36 sm:w-36 sm:h-44 md:w-44 md:h-52 lg:w-50 lg:h-64"
          />
        </div>

        {/* Big center card with reveal effect */}
        <div
          ref={centerRef}
          className="relative h-[22rem] sm:h-[28rem] md:h-[36rem] lg:h-[40rem] flex-shrink-0 overflow-hidden rounded-3xl"
        >
          <img
            src={images[3]}
            alt="Big center"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Right tall card */}
        <img
          src={images[4]}
          alt="Right tall"
          className="object-cover rounded-3xl flex-shrink-0 relative top-2 sm:top-4
            w-32 h-44 sm:w-44 sm:h-64 md:w-52 md:h-80 lg:w-64 lg:h-118"
        />

        {/* Right small card */}
        <img
          src={images[5]}
          alt="Right small"
          className="object-cover rounded-3xl flex-shrink-0 relative -top-10 sm:-top-16 md:-top-20 lg:-top-24
            w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 lg:w-78 lg:h-68"
        />
      </div>
    </div>
  );
};

export default ImagesSection;
