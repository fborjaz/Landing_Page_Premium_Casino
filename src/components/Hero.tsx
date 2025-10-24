import { Canvas } from '@react-three/fiber'
import CasinoChip from './CasinoChip'
import { useState, useEffect } from 'react'

interface HeroProps {
  isAppLoaded: boolean
}

export default function Hero({ isAppLoaded }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(47) // Cupos restantes
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  })

  useEffect(() => {
    // Trigger entrance animations ONLY after App loading is complete
    if (isAppLoaded) {
      setTimeout(() => setIsLoaded(true), 300)
    }
  }, [isAppLoaded])

  useEffect(() => {
    // Solo iniciar contadores cuando la app esté cargada
    if (!isAppLoaded) return

    // Contador regresivo de tiempo
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    // Reducir cupos cada 2-5 minutos (simulado más rápido para demo: cada 10-20 segundos)
    const spotsTimer = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 15) {
          return prev - 1
        }
        return prev
      })
    }, Math.random() * 10000 + 10000) // Entre 10 y 20 segundos

    return () => {
      clearInterval(timer)
      clearInterval(spotsTimer)
    }
  }, [isAppLoaded])

  return (
    <section style={{
      position: 'relative',
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px'
    }}>

      {/* Contenedor principal centrado */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1200px',
        flexDirection: 'column',
        alignItems: 'center',
        gap: window.innerWidth < 768 ? '32px' : '48px',
        textAlign: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out'
      }}>

        {/* Badge Tech */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '9999px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          padding: '12px 24px',
          backdropFilter: 'blur(4px)',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.8s ease-out 0.2s, transform 0.8s ease-out 0.2s'
        }}>
          <div style={{
            height: '8px',
            width: '8px',
            borderRadius: '9999px',
            backgroundColor: '#22d3ee',
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}></div>
          <span style={{
            fontSize: '14px',
            fontWeight: '500',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#67e8f9'
          }}>
            Tecnología IA Avanzada
          </span>
        </div>

        {/* Título Principal */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out 0.4s, transform 1s ease-out 0.4s'
        }}>
          <h1 style={{
            fontSize: window.innerWidth < 768 ? '36px' : window.innerWidth < 1024 ? '56px' : '72px',
            fontWeight: '700',
            lineHeight: '1.1',
            color: 'white'
          }}>
            El Futuro de las{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Apuestas
              <div style={{
                position: 'absolute',
                bottom: window.innerWidth < 768 ? '-8px' : '-12px',
                left: '0',
                right: '0',
                height: window.innerWidth < 768 ? '3px' : '4px',
                background: 'linear-gradient(to right, transparent, #22d3ee, transparent)'
              }}></div>
            </span>
          </h1>
          <h2 style={{
            fontSize: window.innerWidth < 768 ? '32px' : window.innerWidth < 1024 ? '48px' : '64px',
            fontWeight: '700',
            background: 'linear-gradient(to right, #22d3ee, #3b82f6, #9333ea)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Potenciado por IA
          </h2>
        </div>

        {/* Descripción */}
        <p style={{
          maxWidth: '672px',
          fontSize: window.innerWidth < 768 ? '16px' : window.innerWidth < 1024 ? '20px' : '24px',
          lineHeight: '1.6',
          color: '#d1d5db',
          padding: window.innerWidth < 768 ? '0 16px' : '0',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s'
        }}>
          Accede a análisis predictivos y promociones exclusivas antes que nadie.
          <span style={{
            display: 'block',
            marginTop: '8px',
            fontWeight: '600',
            color: '#22d3ee'
          }}>
            Tu racha ganadora empieza aquí.
          </span>
        </p>

        {/* Features en línea */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '24px',
          fontSize: '14px',
          color: '#d1d5db',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease-out 0.8s, transform 0.8s ease-out 0.8s'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              display: 'flex',
              height: '24px',
              width: '24px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 182, 212, 0.2)'
            }}>
              <svg width="12" height="12" style={{ color: '#22d3ee' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>IA en tiempo real</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              display: 'flex',
              height: '24px',
              width: '24px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 182, 212, 0.2)'
            }}>
              <svg width="12" height="12" style={{ color: '#22d3ee' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Blockchain Seguro</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              display: 'flex',
              height: '24px',
              width: '24px',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '9999px',
              backgroundColor: 'rgba(6, 182, 212, 0.2)'
            }}>
              <svg width="12" height="12" style={{ color: '#22d3ee' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Bonos Exclusivos</span>
          </div>
        </div>

        {/* Contenedor de Ficha 3D + Formulario */}
        <div style={{
          display: 'flex',
          width: '100%',
          maxWidth: '1000px',
          gap: window.innerWidth < 768 ? '32px' : '48px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 1.2s ease-out 1s, transform 1.2s ease-out 1s'
        }}>

          {/* Ficha 3D Interactiva */}
          <div style={{
            position: 'relative',
            width: window.innerWidth < 768 ? '300px' : '400px',
            height: window.innerWidth < 768 ? '300px' : '400px',
            minWidth: window.innerWidth < 768 ? '280px' : '300px'
          }}>
            {/* Instrucción para usuario */}
            <div style={{
              position: 'absolute',
              top: '-40px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '14px',
              color: '#22d3ee',
              fontWeight: '600',
              textAlign: 'center',
              zIndex: 10,
              pointerEvents: 'none'
            }}>
              ⟳ Gira la ficha con tu mouse
            </div>

            <Canvas
              camera={{ position: [0, 2, 8], fov: 50 }}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent'
              }}
            >
              <CasinoChip />
            </Canvas>

            {/* Brillo decorativo alrededor */}
            <div style={{
              position: 'absolute',
              inset: '-20px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%)',
              pointerEvents: 'none',
              zIndex: -1
            }}></div>
          </div>

          {/* Formulario de Registro */}
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '448px',
            flex: '1',
            padding: window.innerWidth < 768 ? '0 16px' : '0'
          }}>

          {/* Contador Regresivo de Cupos - ENCIMA del formulario */}
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {/* Banner de urgencia con cupos */}
            <div style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '12px',
              background: spotsLeft <= 20 ? 'linear-gradient(135deg, #dc2626, #991b1b)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
              padding: '16px',
              border: `2px solid ${spotsLeft <= 20 ? '#ef4444' : '#fbbf24'}`,
              boxShadow: spotsLeft <= 20
                ? '0 0 30px rgba(239, 68, 68, 0.6), 0 10px 20px rgba(220, 38, 38, 0.4)'
                : '0 0 30px rgba(251, 191, 36, 0.4)',
              animation: spotsLeft <= 20 ? 'pulse 2s infinite' : 'none'
            }}>
              {/* Efecto de brillo animado */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                animation: 'slideRight 3s infinite'
              }} />

              <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                <p style={{
                  fontSize: '14px',
                  fontWeight: '700',
                  color: 'white',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '8px'
                }}>
                  {spotsLeft <= 20 ? '🔥 ¡ÚLTIMOS CUPOS!' : '⚡ CUPOS LIMITADOS'}
                </p>
                <p style={{
                  fontSize: window.innerWidth < 768 ? '24px' : '32px',
                  fontWeight: '900',
                  color: 'white',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)'
                }}>
                  Solo quedan <span style={{
                    display: 'inline-block',
                    minWidth: window.innerWidth < 768 ? '50px' : '60px',
                    padding: '4px 12px',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius: '8px',
                    border: '2px solid rgba(255,255,255,0.3)'
                  }}>{spotsLeft}</span> cupos
                </p>
              </div>
            </div>

            {/* Contador de tiempo */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '12px',
              padding: '16px',
              background: 'rgba(0,0,0,0.4)',
              borderRadius: '12px',
              border: '1px solid rgba(34, 211, 238, 0.3)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: window.innerWidth < 768 ? '24px' : '32px',
                  fontWeight: '700',
                  color: '#22d3ee',
                  fontFamily: 'monospace',
                  minWidth: window.innerWidth < 768 ? '40px' : '50px'
                }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>HORAS</div>
              </div>
              <div style={{ fontSize: '32px', color: '#22d3ee', fontWeight: '700' }}>:</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: window.innerWidth < 768 ? '24px' : '32px',
                  fontWeight: '700',
                  color: '#22d3ee',
                  fontFamily: 'monospace',
                  minWidth: window.innerWidth < 768 ? '40px' : '50px'
                }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>MINUTOS</div>
              </div>
              <div style={{ fontSize: '32px', color: '#22d3ee', fontWeight: '700' }}>:</div>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: window.innerWidth < 768 ? '24px' : '32px',
                  fontWeight: '700',
                  color: '#22d3ee',
                  fontFamily: 'monospace',
                  minWidth: window.innerWidth < 768 ? '40px' : '50px'
                }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: '4px' }}>SEGUNDOS</div>
              </div>
            </div>

            <p style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#9ca3af',
              fontStyle: 'italic'
            }}>
              ⏰ La oferta termina cuando se acaben los cupos
            </p>
          </div>

          {/* Brillo de fondo */}
          <div style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: '-16px',
            borderRadius: '24px',
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
            opacity: '0.5',
            filter: 'blur(40px)'
          }}></div>

          {/* Contenedor del formulario */}
          <div style={{
            position: 'relative',
            borderRadius: '16px',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: '32px',
            backdropFilter: 'blur(24px)'
          }}>

            {/* Esquinas decorativas */}
            <div style={{
              pointerEvents: 'none',
              position: 'absolute',
              left: '8px',
              top: '8px',
              height: '24px',
              width: '24px',
              borderTopLeftRadius: '12px',
              borderLeft: '2px solid rgba(34, 211, 238, 0.7)',
              borderTop: '2px solid rgba(34, 211, 238, 0.7)'
            }}></div>
            <div style={{
              pointerEvents: 'none',
              position: 'absolute',
              right: '8px',
              top: '8px',
              height: '24px',
              width: '24px',
              borderTopRightRadius: '12px',
              borderRight: '2px solid rgba(34, 211, 238, 0.7)',
              borderTop: '2px solid rgba(34, 211, 238, 0.7)'
            }}></div>
            <div style={{
              pointerEvents: 'none',
              position: 'absolute',
              bottom: '8px',
              left: '8px',
              height: '24px',
              width: '24px',
              borderBottomLeftRadius: '12px',
              borderBottom: '2px solid rgba(34, 211, 238, 0.7)',
              borderLeft: '2px solid rgba(34, 211, 238, 0.7)'
            }}></div>
            <div style={{
              pointerEvents: 'none',
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              height: '24px',
              width: '24px',
              borderBottomRightRadius: '12px',
              borderBottom: '2px solid rgba(34, 211, 238, 0.7)',
              borderRight: '2px solid rgba(34, 211, 238, 0.7)'
            }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Banner de oferta */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                background: 'linear-gradient(to right, #facc15, #f97316)',
                padding: '16px',
                boxShadow: '0 10px 15px -3px rgba(250, 204, 21, 0.3)'
              }}>
                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                  <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#111827'
                  }}>
                    <span style={{
                      display: 'inline-block',
                      height: '8px',
                      width: '8px',
                      borderRadius: '9999px',
                      backgroundColor: '#111827',
                      animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                    }}></span>
                    ¡OFERTA DE PRE-REGISTRO!
                  </p>
                  <p style={{
                    marginTop: '4px',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#1f2937'
                  }}>
                    $500 Giros Gratis + Duplica tu Depósito
                  </p>
                </div>
              </div>

              {/* Formulario */}
              <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    placeholder="correo@ejemplo.com"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      padding: '16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ position: 'relative' }}>
                  <input
                    type="password"
                    placeholder="Tu contraseña segura"
                    style={{
                      width: '100%',
                      borderRadius: '12px',
                      border: '1px solid rgba(6, 182, 212, 0.3)',
                      backgroundColor: 'rgba(17, 24, 39, 0.8)',
                      padding: '16px',
                      color: 'white',
                      fontSize: '16px',
                      outline: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                    padding: '16px',
                    fontSize: '18px',
                    fontWeight: '700',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.5)'
                  }}
                >
                  <span style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}>
                    ¡REGISTRARME AHORA!
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>

              {/* Badge de seguridad */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                paddingTop: '8px',
                fontSize: '12px',
                color: '#9ca3af'
              }}>
                <div style={{
                  display: 'flex',
                  height: '20px',
                  width: '20px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '9999px',
                  border: '1px solid rgba(6, 182, 212, 0.3)',
                  backgroundColor: 'rgba(6, 182, 212, 0.1)'
                }}>
                  <svg width="10" height="10" style={{ color: '#22d3ee' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span>SSL/TLS + Encriptación AES-256</span>
              </div>
            </div>
          </div>

          </div>
          {/* Fin del Formulario de Registro */}

        </div>
        {/* Fin del contenedor Ficha + Formulario */}

      </div>

      {/* Indicador de scroll hacia abajo */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        opacity: isLoaded ? 1 : 0,
        animation: isLoaded ? 'bounce 2s infinite' : 'none',
        transition: 'opacity 1s ease-out 1.5s'
      }}>
        <span style={{
          fontSize: '14px',
          fontWeight: '600',
          color: '#22d3ee',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Scroll para ver más
        </span>
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
          <path d="M12 5v14M19 12l-7 7-7-7"/>
        </svg>
      </div>
    </section>
  )
}
