import { Canvas } from "@react-three/fiber";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ScrollSection from "./components/ScrollSection";
import LoadingScreen from "./components/LoadingScreen";
import Particles from "./components/Particles";
import HowItWorks from "./components/HowItWorks";
import { useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      <div
        style={{
          position: "relative",
          minHeight: "100vh",
          backgroundColor: "#0a0a0f",
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease-in",
        }}
      >
        {/* Sistema de partículas con Three.js */}
        <Canvas
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
          camera={{ position: [0, 0, 30], fov: 75 }}
          eventSource={document.documentElement}
          eventPrefix="client"
        >
          <Particles count={2000} />
        </Canvas>

        <main style={{ position: "relative", zIndex: 10, color: "white" }}>
          <Hero isAppLoaded={!isLoading} />
          <HowItWorks />
          <ScrollSection />
          <Footer />
        </main>
      </div>
    </>
  );
}

export default App;
