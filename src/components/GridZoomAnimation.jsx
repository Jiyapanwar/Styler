import React, { useState, useEffect, useRef } from "react";

const GridZoomAnimation = ({ imageUrls, borderRadius = "30px" }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      const clampedProgress = Math.min(1, Math.max(0, progress));
      setScrollProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initialize on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scale animation
  const initialScale = 4;
  const finalScale = 1;
  const scale = initialScale - (initialScale - finalScale) * scrollProgress;

  // Opacity animation per item
  const getItemOpacity = (index, progress) => {
    const isCenter = index === 4;
    const isNeighbor = [1, 3, 5, 7].includes(index);
    let startProgress = 0;
    const animationDuration = 0.4;

    if (isCenter) startProgress = 0;
    else if (isNeighbor) startProgress = 0.1;
    else startProgress = 0.2;

    const itemProgress = Math.max(0, progress - startProgress) / animationDuration;
    return Math.min(itemProgress, 1);
  };

  if (!imageUrls || imageUrls.length !== 9) {
    return <div className="text-red-500">Error: Provide exactly 9 images</div>;
  }

  return (
    <div
      ref={containerRef}
      className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden p-8"
    >
      <div
        className="grid grid-cols-3 gap-12 w-full h-full"
        style={{
          transform: `scale(${scale})`,
          willChange: "transform",
          gridTemplateRows: "1.4fr 1.4fr 1.4fr", // taller rows to make images closer
        }}
      >
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className="w-full h-full overflow-hidden bg-gray-800 shadow-lg"
            style={{
              opacity: getItemOpacity(index, scrollProgress),
              willChange: "opacity",
              borderRadius: borderRadius,
            }}
          >
            <img
              src={url}
              alt={`Grid item ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/cccccc/FFFFFF?text=Error";
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridZoomAnimation;





// import React from "react";

// const GridZoomAnimation = ({ imageUrls }) => {
//   if (!imageUrls || imageUrls.length !== 9) {
//     console.error("GridZoomAnimation requires exactly 9 images");
//     return <div style={{ color: "red" }}>Error: 9 images needed</div>;
//   }

//   return (
//     <div
//       className="h-screen w-full flex items-center justify-center bg-black"
//       style={{ border: "3px solid lime" }}
//     >
//       <div className="grid grid-cols-3 grid-rows-3 gap-4">
//         {imageUrls.map((url, index) => (
//           <div
//             key={index}
//             className="w-32 h-32 bg-gray-700"
//             style={{ border: "2px solid red" }}
//           >
//             <img
//               src={url}
//               alt={`Grid item ${index + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default GridZoomAnimation;
