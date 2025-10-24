import { Canvas } from "@react-three/fiber"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import Scene from "./components/Scene"
import ScrollSection from "./components/ScrollSection"
import LoadingScreen from "./components/LoadingScreen"
import ParticlesBackground from "./components/ParticlesBackground"
import Particles from "./components/Particles"
import { useState } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <>
      {/* Pantalla de carga */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}

      {/* Contenido principal */}
      <div style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#0a0a0f",
        opacity: isLoading ? 0 : 1,
        transition: 'opacity 0.5s ease-in'
      }}>
      {/* Partículas de fondo - Three.js (sistema original) */}
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
          pointerEvents: "none"
        }}
        camera={{ position: [0, 0, 30], fov: 75 }}
        eventSource={document.documentElement}
        eventPrefix="client"
      >
        <Particles count={2000} />
      </Canvas>

      {/* Contenido de la página - POR ENCIMA del canvas con z-index mayor */}
      <main style={{ position: "relative", zIndex: 10, color: "white" }}>
        <Hero isAppLoaded={!isLoading} />
        <ScrollSection />
        <Footer />
      </main>
      </div>
    </>
  )
}

export default App
