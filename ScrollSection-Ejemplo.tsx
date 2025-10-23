"use client"

import { useEffect, useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import FloatingCards from "./FloatingCards"

export default function ScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calcular progreso del scroll (0 a 1)
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))

      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Llamar una vez al montar

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"
    >
      {/* Canvas 3D fijo en viewport */}
      <div className="sticky top-0 h-screen w-full">
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} style={{ background: "transparent" }}>
          <FloatingCards scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* Contenido de scroll */}
      <div className="relative z-10 flex min-h-screen items-end justify-center pb-20">
        <div className="text-center">
          {/* Indicador de progreso */}
          <div className="mb-8 flex justify-center">
            <div className="flex gap-2">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-12 rounded-full bg-gray-800 transition-all duration-300"
                  style={{
                    background: scrollProgress > i * 0.15 ? "linear-gradient(to right, #22d3ee, #3b82f6)" : "#1f2937",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Texto motivacional */}
          <div className="mb-12 space-y-4">
            <h2 className="text-5xl font-bold text-white">Tu Racha Ganadora</h2>
            <p className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Empieza Aquí
            </p>
          </div>

          {/* CTA Principal */}
          <div className="relative inline-block">
            {/* Brillo de fondo */}
            <div className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-50 blur-2xl" />

            {/* Botón */}
            <button className="relative group overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 px-12 py-6 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/50">
              <span className="relative z-10 flex items-center gap-3">
                ¡REGISTRARSE AHORA!
                <svg
                  className="h-6 w-6 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>

              {/* Efecto de brillo animado */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
          </div>

          {/* Beneficios */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Bonos Instantáneos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-400 animate-pulse" />
              <span>IA Predictiva</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-purple-400 animate-pulse" />
              <span>Retiros Rápidos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
