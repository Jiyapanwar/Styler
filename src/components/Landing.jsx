import React from "react";
import CircularGallery from "./CircularGallery";

const Landing = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <h1 className="font-inter  text-[370px] font-semibold text-[#191919]">
        Styler
      </h1>
      <div style={{ height: "600px", position: "relative" }}>
        4{" "}
        <CircularGallery
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
          scrollEase={0.02}
        />
        5
      </div>
    </div>
  );
};

export default Landing;
