import React ,{ useEffect } from "react";
import { BrowserRouter, Routes, Route ,useLocation } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AnimatedText from "./components/AnimatedText";
import InfiniteImageGrid from "./components/InfiniteImageGrid";
import Footer from "./components/Footer";
import About from "./components/About";
import ImagesSection from "./components/ImagesSection";
import ScrollToTop from "./components/ScrollToTop";
const App = () => {

  return (
    <BrowserRouter>
       <ScrollToTop />
      <Navbar />
      <Routes>
     
        <Route
          path="/"
          element={
            <>
              <Landing />
              <AnimatedText />
              <InfiniteImageGrid />
              <ImagesSection />
              <Footer />
            </>
          }
        />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
