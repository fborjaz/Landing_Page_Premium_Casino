# Instrucciones de Instalación - Fichas Flotantes 3D

## Dependencias Necesarias

Asegúrate de tener instaladas estas dependencias en tu proyecto Vite:

\`\`\`bash
npm install three @react-three/fiber @react-three/drei
\`\`\`

O con yarn:

\`\`\`bash
yarn add three @react-three/fiber @react-three/drei
\`\`\`

## Estructura de Archivos

Tu proyecto debe tener esta estructura:

\`\`\`
src/
├── components/
│   ├── CasinoChip.tsx          ✅ (ya lo tienes)
│   ├── Footer.tsx              ✅ (ya lo tienes)
│   ├── Hero.tsx                ✅ (ya lo tienes)
│   ├── Scene.tsx               ✅ (ya lo tienes)
│   ├── Particles.tsx           ✅ (ya lo tienes)
│   ├── FloatingCards.tsx       🆕 (nuevo - fichas flotantes)
│   └── ScrollSection.tsx       🆕 (nuevo - sección de scroll con CTA)
├── App.tsx                     🔄 (actualizar con la nueva versión)
└── main.tsx
\`\`\`

## Archivos Nuevos Creados

### 1. `FloatingCards.tsx`
Componente principal de las fichas flotantes que:
- Aparecen gradualmente al hacer scroll
- Reaccionan al movimiento del mouse/touch
- Se orientan hacia el CTA cuando aparecen
- Tienen efecto hover con brillo
- 6 fichas con diferentes símbolos de casino (♠♥♦♣)

### 2. `ScrollSection.tsx`
Sección de scroll que contiene:
- Canvas 3D con las fichas flotantes (sticky)
- Indicador de progreso visual
- CTA principal "REGISTRARSE AHORA"
- Beneficios destacados

### 3. `App.tsx` (actualizado)
Integra todos los componentes:
- Fondo de partículas fijo (tu componente existente)
- Hero section (tu componente existente)
- Nueva sección de scroll con fichas flotantes
- Footer (tu componente existente)

## Configuración de Tailwind

Asegúrate de que tu `tailwind.config.js` incluya:

\`\`\`js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
\`\`\`

## Cómo Funciona

### Interacción con Mouse
Las fichas reaccionan al movimiento del mouse con un efecto de repulsión suave. Mueve el cursor sobre el canvas para ver el efecto.

### Scroll Progresivo
A medida que haces scroll hacia abajo:
1. Las fichas aparecen una por una (efecto escalonado)
2. Se acercan desde el fondo hacia el frente
3. Comienzan a orientarse hacia el botón CTA
4. El indicador de progreso se llena

### Orientación al CTA
Cuando el scroll alcanza el 50%, las fichas dejan de rotar libremente y comienzan a apuntar hacia el botón "REGISTRARSE AHORA", guiando visualmente al usuario.

## Personalización

### Cambiar los datos de las fichas
Edita el array `cardData` en `FloatingCards.tsx`:

\`\`\`tsx
const cardData: CardData[] = [
  { 
    id: 1, 
    symbol: '♠', 
    title: 'TU TÍTULO', 
    value: 'TU VALOR', 
    color: '#22d3ee',      // Color principal
    emissive: '#06b6d4',   // Color de brillo
    position: [-8, 2, -5]  // Posición [x, y, z]
  },
  // ... más fichas
]
\`\`\`

### Ajustar la posición del CTA
En `FloatingCards.tsx`, modifica:

\`\`\`tsx
const ctaPosition = new THREE.Vector3(0, -4, 0) // [x, y, z]
\`\`\`

### Cambiar velocidad de aparición
En `FloatingCards.tsx`, ajusta el multiplicador:

\`\`\`tsx
const appearProgress = Math.max(0, Math.min(1, (scrollProgress - data.id * 0.1) * 2))
//                                                                    ^^^     ^
//                                                                  retraso  velocidad
\`\`\`

## Solución de Problemas

### Las fichas no aparecen
- Verifica que Three.js y React Three Fiber estén instalados
- Asegúrate de que el Canvas tenga altura (`h-screen`)
- Revisa la consola del navegador por errores

### El scroll no funciona
- Verifica que `ScrollSection` tenga `min-h-[200vh]` para crear espacio de scroll
- Asegúrate de que no haya `overflow: hidden` en elementos padre

### Las fichas no reaccionan al mouse
- El efecto de mouse funciona dentro del Canvas 3D
- Asegúrate de que el Canvas no esté cubierto por otros elementos (z-index)

## Optimización

Para mejor rendimiento:
- Las fichas usan `useFrame` con interpolación suave (lerp)
- El scroll usa `requestAnimationFrame` implícitamente
- Los materiales usan `meshPhysicalMaterial` para máximo realismo

## Próximos Pasos

1. Instala las dependencias
2. Copia los archivos nuevos a tu proyecto
3. Actualiza `App.tsx` con la nueva versión
4. Ejecuta `npm run dev` o `yarn dev`
5. Abre el navegador y haz scroll para ver el efecto

¡Disfruta de tu experiencia 3D de casino con IA! 🎰✨
