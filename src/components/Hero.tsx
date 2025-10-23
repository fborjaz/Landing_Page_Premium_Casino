import { Canvas } from '@react-three/fiber'
import CasinoChip from './CasinoChip'

export default function Hero() {
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
        gap: '48px',
        textAlign: 'center'
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
          backdropFilter: 'blur(4px)'
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1 style={{
            fontSize: '72px',
            fontWeight: '700',
            lineHeight: '1.1',
            color: 'white'
          }}>
            El Futuro de las{' '}
            <span style={{ position: 'relative', display: 'inline-block' }}>
              Apuestas
              <div style={{
                position: 'absolute',
                bottom: '-12px',
                left: '0',
                right: '0',
                height: '4px',
                background: 'linear-gradient(to right, transparent, #22d3ee, transparent)'
              }}></div>
            </span>
          </h1>
          <h2 style={{
            fontSize: '64px',
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
          fontSize: '24px',
          lineHeight: '1.6',
          color: '#d1d5db'
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
          color: '#d1d5db'
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
          gap: '48px',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>

          {/* Ficha 3D Interactiva */}
          <div style={{
            position: 'relative',
            width: '400px',
            height: '400px',
            minWidth: '300px'
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
          <div style={{ position: 'relative', width: '100%', maxWidth: '448px', flex: '1' }}>

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
    </section>
  )
}
