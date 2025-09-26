import React from "react";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import AnimatedText from "./components/AnimatedText";
import InfiniteImageGrid from "./components/InfiniteImageGrid";
// import SecondSection from "./components/SecondSection";

const App = () => {
  return (
    <div>
      <Navbar />
      <Landing />
      <AnimatedText />
      <InfiniteImageGrid />
    </div>
  );
};

export default App;
