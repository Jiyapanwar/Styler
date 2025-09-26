import { useEffect, useRef } from "react";
import gsap from "gsap";

const AnimatedText = () => {
  const containerRef = useRef(null);

  const textLines = [
    [
      { type: "word", content: "We" },
      { type: "word", content: "blend" },
      {
        type: "image",
        content:
          "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
        alt: "creativity",
      },
      { type: "word", content: "creativity" },
    ],
    [
      { type: "word", content: "with" },
      { type: "word", content: "technology" },
      { type: "word", content: "to" },
      {
        type: "image",
        content:
          "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
        alt: "technology",
      },
    ],
    [
      { type: "word", content: "revolutionize" },
      { type: "word", content: "how" },
      { type: "word", content: "design" },
    ],
    [
      {
        type: "image",
        content:
          "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
        alt: "design",
      },
      { type: "word", content: "meets" },
      { type: "word", content: "reality." },
    ],
  ];

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(".anim-item");

    // Animate words: slide up + fade
    gsap.fromTo(
      elements,
      {
        y: 40,
        opacity: 0,
        scale: (i, el) => (el.querySelector("img") ? 0 : 1), // images start small
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.12, // each word/image 120ms after the previous
      }
    );
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-8 ">
      <div className="text-center max-w-6xl" ref={containerRef}>
        <div className="text-5xl md:text-6xl lg:text-7xl font-semibold space-y-4 leading-tight">
          {textLines.map((line, lineIndex) => (
            <div
              key={lineIndex}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              {line.map((element, idx) => (
                <span key={idx} className="inline-flex items-center anim-item">
                  {element.type === "word" ? (
                    element.content
                  ) : (
                    <img
                      src={element.content}
                      alt={element.alt}
                      className="inline-block w-24 h-12 md:h-14 lg:h-16 object-cover rounded-3xl"
                    />
                  )}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedText;
