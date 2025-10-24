// Pantalla de carga temática de casino con animaciones premium
import { useState, useEffect } from 'react'

export default function LoadingScreen({ onLoadComplete }: { onLoadComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    // Animación de puntos suspensivos
    const dotsInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'))
    }, 500)

    // Simulación de progreso de carga
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(dotsInterval)
          // Delay antes de ocultar el loader para transición suave
          setTimeout(() => onLoadComplete(), 500)
          return 100
        }
        // Progreso más rápido al inicio, más lento al final (efecto realista)
        const increment = prev < 50 ? Math.random() * 15 + 10 : Math.random() * 5 + 2
        return Math.min(prev + increment, 100)
      })
    }, 200)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [onLoadComplete])

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #0a0a0f 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: progress >= 100 ? 0 : 1,
      transition: 'opacity 0.5s ease-out'
    }}>

      {/* Partículas de fondo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: 'hidden',
        opacity: 0.3
      }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: '4px',
              height: '4px',
              background: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#9333ea',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              boxShadow: `0 0 10px ${i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#3b82f6' : '#9333ea'}`
            }}
          />
        ))}
      </div>

      {/* Contenedor principal */}
      <div style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '40px',
        padding: '40px'
      }}>

        {/* Logo/Icono de Casino Animado */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px'
        }}>
          {/* Círculo exterior pulsante */}
          <div style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent)',
            animation: 'pulse 2s ease-in-out infinite'
          }} />

          {/* Ficha de casino animada */}
          <div style={{
            position: 'relative',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
            border: '4px solid #22d3ee',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 40px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(251, 191, 36, 0.5)',
            animation: 'spin 3s linear infinite'
          }}>
            {/* Borde interior */}
            <div style={{
              position: 'absolute',
              inset: '8px',
              borderRadius: '50%',
              border: '2px dashed rgba(34, 211, 238, 0.5)'
            }} />

            {/* Símbolo de casino */}
            <div style={{
              fontSize: '48px',
              fontWeight: '900',
              background: 'linear-gradient(135deg, #22d3ee, #3b82f6)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
            }}>
              $
            </div>

            {/* Diamantes en las esquinas */}
            {[0, 90, 180, 270].map((angle, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '12px',
                  height: '12px',
                  background: '#22d3ee',
                  transform: `rotate(45deg) translate(${50 * Math.cos((angle * Math.PI) / 180)}px, ${50 * Math.sin((angle * Math.PI) / 180)}px)`,
                  boxShadow: '0 0 10px #22d3ee',
                  animation: `twinkle ${1 + i * 0.2}s ease-in-out infinite`
                }}
              />
            ))}
          </div>
        </div>

        {/* Texto de carga */}
        <div style={{
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '28px' : '36px',
            fontWeight: '900',
            background: 'linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '0.05em',
            margin: 0
          }}>
            CASINO TECH IA
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#9ca3af',
            fontWeight: '600',
            margin: 0,
            minHeight: '27px'
          }}>
            Preparando tu experiencia{dots}
          </p>
        </div>

        {/* Barra de progreso */}
        <div style={{
          width: window.innerWidth < 768 ? '280px' : '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Barra de fondo */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '8px',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '999px',
            overflow: 'hidden',
            border: '1px solid rgba(34, 211, 238, 0.3)'
          }}>
            {/* Barra de progreso con gradiente */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #22d3ee 0%, #3b82f6 50%, #9333ea 100%)',
              borderRadius: '999px',
              transition: 'width 0.3s ease-out',
              boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)'
            }}>
              {/* Efecto de brillo deslizante */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                animation: 'slideRight 1.5s infinite'
              }} />
            </div>
          </div>

          {/* Porcentaje */}
          <div style={{
            textAlign: 'center',
            fontSize: '24px',
            fontWeight: '700',
            color: '#22d3ee',
            fontFamily: 'monospace',
            textShadow: '0 0 10px rgba(34, 211, 238, 0.5)'
          }}>
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Mensajes de carga dinámicos */}
        <div style={{
          fontSize: '14px',
          color: '#6b7280',
          fontStyle: 'italic',
          textAlign: 'center',
          minHeight: '21px'
        }}>
          {progress < 30 && '🎰 Iniciando sistema de apuestas...'}
          {progress >= 30 && progress < 60 && '🤖 Activando inteligencia artificial...'}
          {progress >= 60 && progress < 90 && '💎 Cargando premios exclusivos...'}
          {progress >= 90 && '✨ ¡Casi listo para ganar!'}
        </div>

        {/* Fichas flotantes decorativas */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none'
        }}>
          {[0, 120, 240].map((angle, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${i === 0 ? '#22d3ee' : i === 1 ? '#3b82f6' : '#9333ea'}, transparent)`,
                border: `2px solid ${i === 0 ? '#22d3ee' : i === 1 ? '#3b82f6' : '#9333ea'}`,
                transform: `rotate(${angle}deg) translateY(-200px)`,
                opacity: 0.3,
                animation: `orbit ${4 + i}s linear infinite`,
                boxShadow: `0 0 20px ${i === 0 ? '#22d3ee' : i === 1 ? '#3b82f6' : '#9333ea'}`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
