import React, { useRef } from "react";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AnimatedText from "./components/AnimatedText";
import InfiniteImageGrid from "./components/InfiniteImageGrid";
// import AboutPage from "./components/AboutPage";
// import SecondSection from "./components/SecondSection";
// import GridZoom from "./components/GridZoom";
// import ScrollImageGrid from "./components/ScrollImageGrid";
import GridZoomAnimation from "./components/GridZoomAnimation";

const App = () => {
  const triggerRef = useRef(null);

  const imageUrls = [
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bbac017f6a400b614_Stylized%20Graffiti-Inspired%20Robot.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66bdd829a2fb5a6dc35_Fashion%20Portrait%20with%20Vibrant%20Hat.webp",
    "https://cdn.prod.website-files.com/689989c2270f878736e77521/6899f66a24a7a04635323b86_Cheerful%20Young%20Woman%20with%20Colorful%20Attire.webp",
  
  ];

  return (
    <div  >
      <Navbar />
      <Landing />
      <AnimatedText />
      <InfiniteImageGrid />
      <GridZoomAnimation imageUrls={imageUrls}   />
      {/* <InfiniteImageGrid /> */}
    </div>
  );
};

export default App;
