import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AnimatedText from "./components/AnimatedText";
import InfiniteImageGrid from "./components/InfiniteImageGrid";
import Footer from "./components/Footer";
import About from "./components/About";
import ImagesSection from "./components/ImagesSection";

const App = () => {
  return (
    <BrowserRouter>
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
