import { useState, useEffect, useRef } from 'react';
import ScrollStack, { ScrollStackItem } from './ScrollStack';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [titleFixed, setTitleFixed] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('how-it-works');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const windowHeight = window.innerHeight;

      // Hacer visible cuando la sección entra en viewport
      if (sectionTop < windowHeight * 0.8) {
        setIsVisible(true);
      }

      // El título se fija cuando llega a -30px
      // Se libera cuando sectionBottom <= 1310 (justo cuando las cards empiezan a subir)
      const shouldBeFixed = sectionTop <= -30 && sectionBottom > 1310;

      // DEBUG
      console.log('Title Debug:', {
        sectionTop: Math.round(sectionTop),
        sectionBottom: Math.round(sectionBottom),
        thresholdTop: -30,
        thresholdBottom: 1310,
        shouldBeFixed
      });

      setTitleFixed(shouldBeFixed);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Ejecutar al montar

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    {
      number: '01',
      icon: '🤖',
      title: 'Análisis avanzado en tiempo real',
      description: 'La IA procesa miles de variables por segundo: velocidad de la bola, patrones del crupier y física de la ruleta. Utilizamos cuatro modelos de IA diferentes para detectar tendencias y patrones históricos con máxima precisión.',
      color: '#22d3ee'
    },
    {
      number: '02',
      icon: '🎯',
      title: 'Predicciones precisas de columnas y altos/bajos',
      description: 'El sistema identifica la mejor combinación de dos columnas (1-2-3) y cuándo conviene apostar a números altos (19–36) o bajos (1–18). Solo emitimos señal cuando al menos tres de las cuatro IA coinciden, garantizando precisión.',
      color: '#3b82f6'
    },
    {
      number: '03',
      icon: '📱',
      title: 'Recibe y ejecuta la señal',
      description: 'Las recomendaciones llegan en tiempo real a tu dispositivo con instrucciones claras y progresiones de apuesta. Solo tienes que seguir la jugada para aprovechar la ventaja que te proporciona el sistema.',
      color: '#9333ea'
    }
  ];

  return (
    <section
      id="how-it-works"
      className="relative w-full"
      style={{
        background: 'transparent',
        paddingTop: '5rem',
        paddingBottom: '2rem',
        minHeight: '100vh'
      }}
    >
      {/* DEBUG: Línea visual en la parte superior - donde debe fijarse el título */}
      <div
        style={{
          position: 'fixed',
          top: '80px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'lime',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0.8
        }}
      >
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'lime',
          color: 'black',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          CENTRO TÍTULO (80px)
        </span>
      </div>

      {/* DEBUG: Línea visual donde se pinean las cards */}
      <div
        style={{
          position: 'fixed',
          top: '35%',
          left: 0,
          right: 0,
          height: '3px',
          background: 'red',
          zIndex: 9999,
          pointerEvents: 'none',
          opacity: 0.7
        }}
      >
        <span style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'red',
          color: 'white',
          padding: '4px 8px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          PIN POSITION CARDS (35%)
        </span>
      </div>
      {/* Título de Sección - sticky que se pega y sube automáticamente con la sección */}
      <div
        ref={titleRef}
        style={{
          position: 'sticky',
          top: '50px',
          width: '100%',
          zIndex: 40,
          paddingTop: '1.5rem',
          paddingBottom: '2.5rem'
        }}
      >
        <div
          className="text-center px-4"
          style={{
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s ease'
          }}
        >
          {/* Fondo degradado SIN blur */}
          <div
            style={{
              position: 'absolute',
              top: '-1.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(90%, 1200px)',
              height: 'calc(100% + 3rem)',
              background: titleFixed
                ? 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95) 0%, rgba(10, 10, 15, 0.9) 70%, rgba(10, 10, 15, 0.6) 85%, transparent 100%)'
                : 'transparent',
              borderRadius: '16px',
              transition: 'background 0.3s ease',
              zIndex: -1,
              pointerEvents: 'none'
            }}
          />
          {/* Título Principal con fuente Striker */}
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase"
            style={{
              fontFamily: "'Striker', 'Syne', sans-serif",
              background: 'linear-gradient(135deg, #22d3ee, #3b82f6, #9333ea)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              letterSpacing: '0.05em'
            }}
          >
            Tecnología detrás del éxito.
          </h2>

          {/* Subtítulo */}
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-['Patrick_Hand']">
            Descubre cómo nuestra IA revoluciona el análisis de la ruleta con precisión científica
          </p>
        </div>
      </div>

      {/* ScrollStack con las tarjetas usando window scroll */}
      <div className="relative">
        <ScrollStack
          itemDistance={150}
          itemScale={0.02}
          itemStackDistance={80}
          stackPosition="35%"
          scaleEndPosition="30%"
          baseScale={0.92}
          rotationAmount={0}
          blurAmount={0}
          useWindowScroll={true}
        >
          {cards.map((card, index) => (
            <ScrollStackItem key={index}>
              <div className="flex flex-col h-full justify-center">
                {/* Icono */}
                <div
                  className="card-icon mb-3"
                  style={{ color: card.color }}
                >
                  {card.icon}
                </div>

                {/* Número */}
                <div
                  className="card-number"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}, #3b82f6)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                >
                  {card.number}
                </div>

                {/* Título */}
                <h3 className="card-title">
                  {card.title}
                </h3>

                {/* Línea decorativa */}
                <div
                  className="w-24 h-1 mb-4 rounded-full"
                  style={{
                    background: `linear-gradient(to right, ${card.color}, #3b82f6)`
                  }}
                />

                {/* Descripción */}
                <p className="card-description">
                  {card.description}
                </p>

                {/* Detalles adicionales visuales */}
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: card.color }}
                  />
                  <span
                    className="text-xs font-mono uppercase tracking-wider"
                    style={{ color: card.color }}
                  >
                    Sistema activo
                  </span>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default HowItWorks;
