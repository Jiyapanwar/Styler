import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  easeInOut,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LearnMoreButton from "./LearnMoreButton";

gsap.registerPlugin(ScrollTrigger);

const ExpandingImageSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Parallax effect
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // slower
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]); // faster
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // text animation (wave-in words for the next section)
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paraRef = useRef(null);

  // 👇 Added state for rotating words
  const words = ["boosting", "powering", "launching"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const headingEl = headingRef.current;
    const paraEl = paraRef.current;

    if (!headingEl || !paraEl) return;

    if (!headingEl.dataset.split) {
      headingEl.dataset.split = "true";
      const text = headingEl.textContent || "";
      headingEl.innerHTML = "";
      text.split(" ").forEach((word, i) => {
        const span = document.createElement("span");
        span.className = "inline-block opacity-0 mr-2";
        span.textContent = word;
        headingEl.appendChild(span);
      });
    }

    const words = headingEl.querySelectorAll("span");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      words,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.09,
        ease: "power3.out",
      },
      0
    );

    tl.fromTo(
      paraEl,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
      },
      0
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[150vh] bg-white font-inter"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute top-0 left-0 w-full h-[120vh] bg-cover bg-no-repeat"
        style={{
          y: imageY,
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('https://cdn.prod.website-files.com/689989c2270f878736e77521/68a05f24dfe3241d0a83bab0_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Foreground Text */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-[100vh] flex flex-col justify-center px-15 text-white max-w-lg"
      >
        <h1 className="text-6xl mb-6">
          We're focused on{" "}
          <span
            className="inline-flex relative overflow-hidden align-topline"
            style={{ width: "9ch", height: "1.05em" }} // fixed width + height for alignment
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.5,
                  ease: easeInOut, // smooth, no bounce (material design ease)
                }}
                className="absolute left-0 top-0 "
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          your brand.
        </h1>

        <p className="mb-6 text-lg">
          Let's create something extraordinary together. Your vision, our
          commitment to excellence.
        </p>
        {/* <button className="px-6 py-3 bg-black text-white rounded-full">
          LEARN MORE
        </button> */}
        <LearnMoreButton />
      </motion.div>

      {/* Next Section */}
      <section
        ref={sectionRef}
        className="relative z-10 min-h-screen font-inter bg-gray-50 px-6 py-30 md:px-12 lg:px-24"
      >
        <div className="flex flex-col md:flex-row">
          <div className="space-y-6 md:w-[60%]">
            <h1 className="text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
              <span className="text-[15px] pr-10 leading-relaxed">
                • Next Level
              </span>
              <span ref={headingRef}>
                Transform Your Brand With Our Innovative Strategies & Discover
                New Opportunities.
              </span>
            </h1>
          </div>

          <div ref={paraRef} className="pt-30 md:w-[40%] font-light">
            <p className="md:text-md lg:text-md">
              Our team combines strategic thinking with creative execution to
              build brands that stand out in today's competitive landscape. From
              visual identity to digital campaigns, we partner with you to
              create meaningful connections that drive engagement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExpandingImageSection;
