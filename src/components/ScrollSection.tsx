import { useEffect, useState, useRef } from "react"
import { Canvas } from "@react-three/fiber"
import FloatingCards from "./FloatingCards"

export default function ScrollSection() {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [scrollCount, setScrollCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number | null = null

    const handleScroll = () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        setScrollCount(prev => prev + 1)

        if (!sectionRef.current) return

        const rect = sectionRef.current.getBoundingClientRect()
        const windowHeight = window.innerHeight
        const sectionHeight = rect.height

        if (rect.top < windowHeight && rect.bottom > 0) {
          setIsVisible(true)
        }

        if (rect.top > 0) {
          setScrollProgress(0)
          return
        }

        const sectionTop = window.scrollY + rect.top
        const sectionBottom = sectionTop + sectionHeight

        const scrollStart = sectionTop
        const scrollEnd = sectionBottom
        const scrollRange = scrollEnd - scrollStart

        const currentScroll = window.scrollY
        const scrollIntoSection = currentScroll - scrollStart
        const progress = Math.max(0, Math.min(1, scrollIntoSection / scrollRange))

        setScrollProgress(progress)
      })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '200vh',
        background: 'transparent'
      }}
    >
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '100vh',
        width: '100%',
        zIndex: scrollProgress > 0 ? 1 : -1,
        pointerEvents: scrollProgress > 0 ? 'auto' : 'none',
        opacity: scrollProgress > 0 ? 1 : 0
      }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }} style={{ background: "transparent" }}>
          <FloatingCards scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        pointerEvents: 'none',
        transform: scrollProgress > 0.26
          ? `translate3d(0, ${Math.max(0, 100 - ((scrollProgress - 0.26) * 135))}vh, 0)`
          : 'translate3d(0, 100vh, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden'
      }}>
        <div style={{
          position: 'relative',
          textAlign: 'center',
          pointerEvents: scrollProgress > 0.26 ? 'auto' : 'none',
          width: '100%',
          padding: '0',
          minHeight: '100vh'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: scrollProgress > 0.26
              ? `linear-gradient(to bottom,
                  transparent 0%,
                  rgba(10, 10, 15, ${Math.min(0.5, (scrollProgress - 0.26) * 4)}) 10%,
                  rgba(10, 10, 15, ${Math.min(0.8, (scrollProgress - 0.26) * 5)}) 30%,
                  #0a0a0f 60%)`
              : 'transparent',
            zIndex: 1,
            pointerEvents: 'none'
          }} />

          <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.9)',
            color: scrollProgress > 0.3 ? '#10b981' : '#22d3ee',
            padding: '16px',
            borderRadius: '8px',
            fontSize: '12px',
            fontFamily: 'monospace',
            zIndex: 9999,
            border: `2px solid ${scrollProgress > 0.3 ? '#10b981' : '#22d3ee'}`,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(100px)',
            transition: 'opacity 0.8s ease-out 0.3s, transform 0.8s ease-out 0.3s'
          }}>
            <div>Scroll Progress: {(scrollProgress * 100).toFixed(0)}%</div>
            <div>Scroll Events: {scrollCount}</div>
            <div style={{
              marginTop: '8px',
              fontSize: '11px',
              fontWeight: 'bold',
              color: scrollProgress === 0 ? '#6b7280' : scrollProgress > 0.26 ? '#10b981' : '#f59e0b'
            }}>
              {scrollProgress === 0 ? '⬇️ Cards ocultas' : scrollProgress > 0.26 ? '✨ TODAS VISIBLES' : '⚡ Apareciendo una por una'}
            </div>
            <div style={{ marginTop: '4px', fontSize: '10px', color: '#9ca3af' }}>
              {scrollProgress === 0 ? 'Scroll para ver cards ↓' : scrollProgress > 0.26 ? 'Contenido subiendo ↓' : `Card ${Math.min(6, Math.floor(scrollProgress / 0.04) + 1)}/6`}
            </div>
          </div>

          <div style={{
            position: 'relative',
            zIndex: 2,
            padding: window.innerWidth < 768 ? '40px 20px 20px' : '60px 40px 40px',
            minHeight: '100vh',
            pointerEvents: 'auto'
          }}>

          <div style={{
            marginBottom: window.innerWidth < 768 ? '24px' : '32px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div style={{ display: 'flex', gap: window.innerWidth < 768 ? '6px' : '8px' }}>
              {[...Array(6)].map((_, i) => {
                const cardFullyVisibleAt = (i * 0.04) + 0.06
                return (
                  <div
                    key={i}
                    style={{
                      height: window.innerWidth < 768 ? '6px' : '8px',
                      width: window.innerWidth < 768 ? '36px' : '48px',
                      borderRadius: '9999px',
                      background: scrollProgress >= cardFullyVisibleAt
                        ? "linear-gradient(to right, #22d3ee, #3b82f6)"
                        : "#1f2937",
                      transition: 'all 0.3s'
                    }}
                  />
                )
              })}
            </div>
          </div>

          <div style={{ marginBottom: window.innerWidth < 768 ? '32px' : '48px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h2 style={{
              fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '40px' : '48px',
              fontWeight: '700',
              color: 'white'
            }}>
              Tu Racha Ganadora
            </h2>
            <p style={{
              fontSize: window.innerWidth < 768 ? '18px' : window.innerWidth < 1024 ? '20px' : '24px',
              fontWeight: '700',
              background: 'linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Empieza Aquí
            </p>
          </div>

          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{
              position: 'absolute',
              inset: '-16px',
              borderRadius: '9999px',
              background: 'linear-gradient(to right, #06b6d4, #3b82f6, #9333ea)',
              opacity: 0.5,
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }} />

            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: window.innerWidth < 768 ? '12px' : '16px',
                background: 'linear-gradient(to right, #06b6d4, #3b82f6, #9333ea)',
                padding: window.innerWidth < 768 ? '18px 32px' : '24px 48px',
                fontSize: window.innerWidth < 768 ? '18px' : window.innerWidth < 1024 ? '20px' : '24px',
                fontWeight: '700',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.3s',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                width: window.innerWidth < 768 ? '100%' : 'auto',
                maxWidth: window.innerWidth < 768 ? '320px' : 'none'
              }}
            >
              <span style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                ¡REGISTRARSE AHORA!
                <svg
                  style={{
                    height: '24px',
                    width: '24px',
                    transition: 'transform 0.3s',
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
                  }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>

              <div style={{
                position: 'absolute',
                inset: 0,
                transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
                background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.2), transparent)',
                transition: 'transform 1s',
                pointerEvents: 'none'
              }} />
            </button>
          </div>

          <div style={{
            marginTop: window.innerWidth < 768 ? '24px' : '32px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: window.innerWidth < 768 ? '16px' : '24px',
            fontSize: window.innerWidth < 768 ? '12px' : '14px',
            color: '#9ca3af'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                height: '8px',
                width: '8px',
                borderRadius: '9999px',
                backgroundColor: '#22d3ee',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <span>Bonos Instantáneos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                height: '8px',
                width: '8px',
                borderRadius: '9999px',
                backgroundColor: '#3b82f6',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <span>IA Predictiva</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                height: '8px',
                width: '8px',
                borderRadius: '9999px',
                backgroundColor: '#a855f7',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <span>Retiros Rápidos</span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
