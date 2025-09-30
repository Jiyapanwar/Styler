import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ExpandingImageSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const contentY = useTransform(scrollYProgress, [0.3, 1], ["0%", "-100%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.3, 0.7], [1, 0]);

  return (
    <div ref={containerRef} className="relative w-full h-[200vh] bg-white">
      <motion.div
        className="sticky top-0 mx-30 my-12 rounded-4xl h-[90vh] flex items-center justify-start px-15 bg-cover bg-no-repeat"
        style={{
          height: "90vh",
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0)), url('https://cdn.prod.website-files.com/689989c2270f878736e77521/68a05f24dfe3241d0a83bab0_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          className="text-white font-inter max-w-sm"
        >
          <h1 className="text-6xl mb-6">
            We're focused on launching your brand.
          </h1>
          <p className="mb-6 text-lg">
            Let's create something extraordinary together. Your vision, our
            commitment to excellence.
          </p>
          <button className="px-6 py-3 bg-black text-white rounded-full">
            LEARN MORE
          </button>
        </motion.div>
      </motion.div>

      <section className="relative z-10 min-h-screen font-inter bg-gray-50 px-6 py-30 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row">
          <div className="space-y-6 md:w-[60%]">
            <h1 className="text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
              <span className="text-[15px] pr-10 leading-relaxed">
                • Next Level
              </span>
              Transform Your Brand With Our Innovative Strategies & Discover New
              Opportunities.
            </h1>
          </div>

          <div className="pt-30 md:w-[40%] font-light">
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
