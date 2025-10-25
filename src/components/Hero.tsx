import { Canvas } from '@react-three/fiber'
import CasinoChip from './CasinoChip'
import { useState, useEffect } from 'react'
import CountUp from './CountUp'

interface HeroProps {
  isAppLoaded: boolean
}

export default function Hero({ isAppLoaded }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [spotsLeft, setSpotsLeft] = useState(500)

  useEffect(() => {
    if (isAppLoaded) {
      setTimeout(() => setIsLoaded(true), 300)
    }
  }, [isAppLoaded])

  useEffect(() => {
    if (!isAppLoaded) return

    const spotsTimer = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 450) {
          return prev - 1
        }
        return prev
      })
    }, Math.random() * 15000 + 10000)

    return () => {
      clearInterval(spotsTimer)
    }
  }, [isAppLoaded])

  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 1024 : false

  return (
    <section style={{
      position: 'relative',
      display: 'flex',
      minHeight: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 24px'
    }}>

      {/* Badge superior centrado */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 20
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          borderRadius: '9999px',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          backgroundColor: 'rgba(6, 182, 212, 0.1)',
          padding: '12px 24px',
          backdropFilter: 'blur(4px)',
          animation: 'pulseGlow 3s ease-in-out infinite',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            right: 0,
            bottom: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(34, 211, 238, 0.4) 50%, transparent 100%)',
            width: '200%',
            animation: 'shimmer 4s linear infinite'
          }}></div>

          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5" style={{
            animation: 'pulse 2s ease-in-out infinite',
            position: 'relative',
            zIndex: 1
          }}>
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
          <span style={{
            fontSize: '16px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#67e8f9',
            position: 'relative',
            zIndex: 1,
            fontFamily: '"Patrick Hand", cursive'
          }}>
            TECNOLOGÍA IA DE VANGUARDIA
          </span>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 400px 1fr',
        gap: isMobile ? '48px' : '32px',
        width: '100%',
        maxWidth: '1400px',
        alignItems: 'center',
        opacity: isLoaded ? 1 : 0,
        transform: isLoaded ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 1s ease-out, transform 1s ease-out'
      }}>

        {/* COLUMNA IZQUIERDA - Contenido */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'opacity 1s ease-out 0.2s, transform 1s ease-out 0.2s'
        }}>

          {/* Logo */}
          <div style={{
            marginBottom: '8px',
            animation: 'floatSlow 3s ease-in-out infinite'
          }}>
            <img
              src="/LOGO.png"
              alt="Logo"
              style={{
                height: isMobile ? '40px' : '50px',
                width: 'auto'
              }}
            />
          </div>

          {/* Títulos principales */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h1 style={{
              fontSize: isMobile ? '40px' : '56px',
              fontWeight: '700',
              lineHeight: '1.1',
              color: 'white',
              fontFamily: '"Syne", sans-serif',
              textTransform: 'uppercase'
            }}>
              LA INTELIGENCIA ARTIFICIAL QUE DOMINA LA RULETA.
            </h1>

            <h2 style={{
              fontSize: isMobile ? '36px' : '52px',
              fontWeight: '700',
              color: '#22d3ee',
              fontFamily: '"Syne", sans-serif',
              textTransform: 'uppercase'
            }}>
              ¿ESTÁS DENTRO?
            </h2>
          </div>

          {/* Descripción */}
          <p style={{
            fontSize: isMobile ? '18px' : '22px',
            lineHeight: '1.6',
            color: '#d1d5db',
            fontFamily: '"Patrick Hand", cursive'
          }}>
            Únete al círculo exclusivo de 500 Fundadores que usarán nuestra IA para anticipar jugadas y transformar el azar en estrategia.
          </p>

          {/* Cupos limitados */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '12px',
            background: spotsLeft <= 470 ? 'linear-gradient(135deg, #dc2626, #991b1b)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
            padding: '20px',
            border: `2px solid ${spotsLeft <= 470 ? '#ef4444' : '#fbbf24'}`,
            boxShadow: spotsLeft <= 470
              ? '0 0 30px rgba(239, 68, 68, 0.6)'
              : '0 0 30px rgba(251, 191, 36, 0.4)',
            width: 'fit-content',
            animation: spotsLeft <= 470 ? 'pulse 2s ease-in-out infinite, scaleBreath 4s ease-in-out infinite' : 'scaleBreath 4s ease-in-out infinite'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              animation: 'slideRight 3s infinite'
            }} />

            <div style={{ position: 'relative', zIndex: 10 }}>
              <p style={{
                fontSize: isMobile ? '36px' : '44px',
                fontWeight: '900',
                color: 'white',
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                fontFamily: '"Striker", sans-serif',
                textTransform: 'uppercase'
              }}>
                SOLO QUEDAN <span style={{
                  display: 'inline-block',
                  minWidth: '70px',
                  padding: '4px 16px',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <CountUp
                    from={0}
                    to={spotsLeft}
                    duration={2}
                    delay={0.5}
                    startWhen={isAppLoaded}
                  />
                </span> CUPOS
              </p>
            </div>
          </div>

          {/* Características */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '12px' : '20px',
            marginTop: '8px',
            justifyContent: 'flex-start'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.4s backwards'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(34, 211, 238, 0.15)',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                flexShrink: 0,
                animation: 'pulseGlow 3s ease-in-out infinite'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  <circle cx="12" cy="9" r="2" fill="#22d3ee"/>
                </svg>
              </div>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                margin: 0,
                whiteSpace: 'nowrap',
                fontFamily: '"Patrick Hand", cursive'
              }}>
                Análisis en Tiempo Real
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.5s backwards'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(34, 211, 238, 0.15)',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                flexShrink: 0,
                animation: 'pulseGlow 3s ease-in-out 0.2s infinite'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2" fill="#22d3ee"/>
                </svg>
              </div>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                margin: 0,
                whiteSpace: 'nowrap',
                fontFamily: '"Patrick Hand", cursive'
              }}>
                Predicción de Zonas
              </p>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              animation: 'fadeInUp 0.8s ease-out 0.6s backwards'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'rgba(34, 211, 238, 0.15)',
                border: '1px solid rgba(34, 211, 238, 0.4)',
                flexShrink: 0,
                animation: 'pulseGlow 3s ease-in-out 0.4s infinite'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="2.5">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                </svg>
              </div>
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'white',
                margin: 0,
                whiteSpace: 'nowrap',
                fontFamily: '"Patrick Hand", cursive'
              }}>
                Alertas Instantáneas
              </p>
            </div>
          </div>

        </div>

        {/* COLUMNA CENTRO - Ficha Casino 3D */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '350px' : '450px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'floatSlow 4s ease-in-out infinite',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 1.2s ease-out 0.4s, transform 1.2s ease-out 0.4s',
          order: isMobile ? -1 : 0
        }}>
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '16px',
            color: '#22d3ee',
            fontWeight: '600',
            textAlign: 'center',
            zIndex: 10,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            animation: 'pulse 2s ease-in-out infinite',
            fontFamily: '"Patrick Hand", cursive'
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

          <div style={{
            position: 'absolute',
            inset: '-20px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15), transparent 70%)',
            pointerEvents: 'none',
            zIndex: -1
          }}></div>
        </div>

        {/* COLUMNA DERECHA - Formulario de Registro */}
        <div style={{
          position: 'relative',
          width: '100%',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateX(0)' : 'translateX(30px)',
          transition: 'opacity 1s ease-out 0.6s, transform 1s ease-out 0.6s'
        }}>

          <div style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: '-16px',
            borderRadius: '24px',
            background: 'linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
            opacity: '0.5',
            filter: 'blur(40px)'
          }}></div>

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

              {/* Título del formulario */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#22d3ee',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontFamily: '"Striker", sans-serif',
                letterSpacing: '0.05em'
              }}>
                ASEGURA TU ACCESO DE FUNDADOR
              </h3>

              {/* Banner de oferta */}
              <div style={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '12px',
                background: spotsLeft <= 470 ? 'linear-gradient(135deg, #dc2626, #991b1b)' : 'linear-gradient(135deg, #f59e0b, #d97706)',
                padding: '20px',
                border: `2px solid ${spotsLeft <= 470 ? '#ef4444' : '#fbbf24'}`,
                boxShadow: spotsLeft <= 470
                  ? '0 0 30px rgba(239, 68, 68, 0.6)'
                  : '0 0 30px rgba(251, 191, 36, 0.4)',
                animation: spotsLeft <= 470 ? 'pulse 2s ease-in-out infinite' : 'none'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.4), transparent)',
                  animation: 'slideRight 2.5s ease-in-out infinite'
                }}></div>

                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
                  animation: 'pulse 3s ease-in-out infinite'
                }}></div>

                <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
                  <p style={{
                    fontSize: '22px',
                    fontWeight: '900',
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    fontFamily: '"Patrick Hand", cursive'
                  }}>
                    Solo <span style={{
                      display: 'inline-block',
                      minWidth: '50px',
                      padding: '4px 16px',
                      background: 'rgba(0,0,0,0.3)',
                      borderRadius: '8px',
                      border: '2px solid rgba(255,255,255,0.3)',
                      animation: spotsLeft <= 470 ? 'bounce 1s ease-in-out infinite' : 'none'
                    }}>
                      <CountUp
                        from={0}
                        to={spotsLeft}
                        duration={2}
                        delay={0.5}
                        startWhen={isAppLoaded}
                      />
                    </span> lugares disponibles
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

                {/* Checkbox de comunicaciones */}
                <label style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  color: '#d1d5db',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(6, 182, 212, 0.2)',
                  background: 'rgba(6, 182, 212, 0.05)',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Patrick Hand", cursive'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)'
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.2)'
                  e.currentTarget.style.background = 'rgba(6, 182, 212, 0.05)'
                }}>
                  <input
                    type="checkbox"
                    style={{
                      marginTop: '2px',
                      width: '20px',
                      height: '20px',
                      cursor: 'pointer',
                      accentColor: '#22d3ee',
                      flexShrink: 0,
                      transform: 'scale(1)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  <span>Acepto recibir comunicaciones vía Email y WhatsApp.</span>
                </label>

                <button
                  type="submit"
                  style={{
                    position: 'relative',
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: '12px',
                    background: 'linear-gradient(to right, #06b6d4, #2563eb)',
                    padding: '18px 24px',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 10px 15px -3px rgba(6, 182, 212, 0.5)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 15px 25px -5px rgba(6, 182, 212, 0.7)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(6, 182, 212, 0.5)'
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    animation: 'slideRight 3s ease-in-out infinite'
                  }}></div>

                  <span style={{
                    position: 'relative',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                  }}>
                    RESERVAR MI LUGAR AHORA
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>
              </form>

              {/* Seguridad y texto informativo */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingTop: '8px'
              }}>
                {/* Badge de seguridad SSL */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: '#9ca3af',
                  fontFamily: '"Patrick Hand", cursive'
                }}>
                  <div style={{
                    display: 'flex',
                    height: '20px',
                    width: '20px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '9999px',
                    border: '1px solid rgba(6, 182, 212, 0.3)',
                    backgroundColor: 'rgba(6, 182, 212, 0.1)',
                    flexShrink: 0
                  }}>
                    <svg width="10" height="10" style={{ color: '#22d3ee' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <span>SSL/TLS + Encriptación AES-256</span>
                </div>

                {/* Texto informativo */}
                <p style={{
                  fontSize: '14px',
                  color: '#9ca3af',
                  textAlign: 'center',
                  lineHeight: '1.5',
                  fontFamily: '"Patrick Hand", cursive'
                }}>
                  Registro 100% gratuito. Cero spam. Recibirás una confirmación inmediata en tu WhatsApp.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Scroll indicator */}
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
