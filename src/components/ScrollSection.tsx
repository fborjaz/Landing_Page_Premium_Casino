"use client"

import { useEffect, useState, useRef, CSSProperties } from "react"
import { Canvas } from "@react-three/fiber"
import FloatingCards from "./FloatingCards"

const styles: { [key: string]: CSSProperties } = {
  section: {
    position: 'relative',
    minHeight: '200vh',
    background: 'linear-gradient(to bottom, #030712, #111827, #030712)',
  },
  stickyCanvasContainer: {
    position: 'sticky',
    top: 0,
    height: '100vh',
    width: '100%',
  },
  scrollContentContainer: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    minHeight: '100vh',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: '5rem',
  },
  textCenter: {
    textAlign: 'center',
  },
  progressIndicatorContainer: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'center',
  },
  progressIndicatorInner: {
    display: 'flex',
    gap: '0.5rem',
  },
  progressIndicatorBar: {
    height: '0.5rem',
    width: '3rem',
    borderRadius: '9999px',
    backgroundColor: '#1f2937',
    transition: 'all 0.3s',
  },
  motivationalTextContainer: {
    marginBottom: '3rem',
  },
  h2: {
    fontSize: '3rem',
    lineHeight: '1',
    fontWeight: 'bold',
    color: 'white',
    marginBottom: '1rem',
  },
  p: {
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
    background: 'linear-gradient(to right, #22d3ee, #3b82f6, #8b5cf6)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  },
  ctaContainer: {
    position: 'relative',
    display: 'inline-block',
  },
  ctaGlow: {
    position: 'absolute',
    inset: '-1rem',
    borderRadius: '9999px',
    background: 'linear-gradient(to right, #06b6d4, #3b82f6, #9333ea)',
    opacity: 0.5,
    filter: 'blur(32px)',
  },
  button: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '1rem',
    background: 'linear-gradient(to right, #06b6d4, #3b82f6, #9333ea)',
    padding: '1.5rem 3rem',
    fontSize: '1.5rem',
    lineHeight: '2rem',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    transition: 'all 0.3s',
    border: 'none',
    cursor: 'pointer',
  },
  buttonSpan: {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  svg: {
    height: '1.5rem',
    width: '1.5rem',
    transition: 'transform 0.3s ease-in-out',
  },
  animatedGlow: {
    position: 'absolute',
    inset: 0,
    transform: 'translateX(-100%)',
    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
    transition: 'transform 1s ease-in-out',
  },
  benefitsContainer: {
    marginTop: '2rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '1.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    color: '#9ca3af',
  },
  benefitItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  benefitDot: {
      height: '0.5rem',
      width: '0.5rem',
      borderRadius: '9999px',
      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
};

export default function ScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isButtonHovered, setIsButtonHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const buttonStyle = {
    ...styles.button,
    transform: isButtonHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isButtonHovered ? '0 10px 15px -3px rgba(6, 182, 212, 0.5)' : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  };

  const svgStyle = {
    ...styles.svg,
    transform: isButtonHovered ? 'translateX(4px)' : 'translateX(0)',
  };

  const animatedGlowStyle = {
    ...styles.animatedGlow,
    transform: isButtonHovered ? 'translateX(100%)' : 'translateX(-100%)',
  }

  return (
    <section ref={sectionRef} style={styles.section}>
      <div style={styles.stickyCanvasContainer}>
        <Canvas camera={{ position: [0, 0, 15], fov: 50 }} style={{ background: "transparent" }}>
          <FloatingCards scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      <div style={styles.scrollContentContainer}>
        <div style={styles.textCenter}>
          <div style={styles.progressIndicatorContainer}>
            <div style={styles.progressIndicatorInner}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  style={{
                    ...styles.progressIndicatorBar,
                    background: scrollProgress > i * 0.15 ? "linear-gradient(to right, #22d3ee, #3b82f6)" : "#1f2937",
                  }}
                />
              ))}
            </div>
          </div>

          <div style={styles.motivationalTextContainer}>
            <h2 style={styles.h2}>Tu Racha Ganadora</h2>
            <p style={styles.p}>
              Empieza Aquí
            </p>
          </div>

          <div style={styles.ctaContainer}>
            <div style={styles.ctaGlow} />
            <button
              style={buttonStyle}
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <span style={styles.buttonSpan}>
                ¡REGISTRARSE AHORA!
                <svg
                  style={svgStyle}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div style={animatedGlowStyle} />
            </button>
          </div>

          <div style={styles.benefitsContainer}>
            <div style={styles.benefitItem}>
              <div style={{ ...styles.benefitDot, backgroundColor: '#22d3ee' }} />
              <span>Bonos Instantáneos</span>
            </div>
            <div style={styles.benefitItem}>
              <div style={{ ...styles.benefitDot, backgroundColor: '#60a5fa' }} />
              <span>IA Predictiva</span>
            </div>
            <div style={styles.benefitItem}>
              <div style={{ ...styles.benefitDot, backgroundColor: '#a78bfa' }} />
              <span>Retiros Rápidos</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
