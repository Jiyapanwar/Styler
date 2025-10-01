import { useEffect, useState } from "react";
import CircularGallery from "./CircularGallery";
import MobileGallery from "./MobileGallery";
// import MobileGallery from "./MobileGallery"; // <-- You’ll add this later

const ResponsiveGallery = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 768);
    checkScreen(); // initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <>
      {isMobile ? (
        <div className="mobile-gallery-wrapper">
          {/* Place your MobileGallery component here */}
          <MobileGallery />
        </div>
      ) : (
        <div className="desktop-gallery-wrapper">
          <CircularGallery />
        </div>
      )}
    </>
  );
};

export default ResponsiveGallery;
