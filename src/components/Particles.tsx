// En: src/components/Particles.tsx
// Sistema de partículas tecnológico con "vibra IA"

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Shader personalizado para partículas redondas y brillantes
const vertexShader = `
  attribute float size;
  attribute float alpha;
  varying float vAlpha;

  void main() {
    vAlpha = alpha;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

    // Calcular tamaño con límite máximo para evitar blur
    float calculatedSize = size * (300.0 / -mvPosition.z);
    gl_PointSize = min(calculatedSize, 80.0); // Límite de 80 píxeles

    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = `
  uniform vec3 color;
  varying float vAlpha;

  void main() {
    // Crear partícula redonda con bordes más definidos
    vec2 center = gl_PointCoord - vec2(0.5);
    float dist = length(center) * 2.0;

    // Descarte de píxeles fuera del círculo con borde suave
    if (dist > 1.0) discard;

    // Efecto de brillo desde el centro más nítido
    float strength = 1.0 - dist;
    strength = pow(strength, 2.5); // Menos blur, más definición

    // Añadir un núcleo más brillante en el centro
    float core = 1.0 - smoothstep(0.0, 0.3, dist);
    strength = mix(strength, 1.0, core * 0.6);

    // Color con brillo y alpha variable
    vec3 finalColor = color * (1.0 + strength * 0.5);
    float finalAlpha = strength * vAlpha;

    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`

export default function Particles({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null)
  const shaderMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const [opacity, setOpacity] = useState(0)

  // Generar posiciones, tamaños y alphas de partículas
  const { positions, sizes, alphas, randomValues } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const alphas = new Float32Array(count)
    const randomValues = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      // Distribución esférica uniforme
      const radius = Math.random() * 25 + 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos((Math.random() * 2) - 1)

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i3 + 2] = radius * Math.cos(phi)

      // Tamaños variados para más realismo
      sizes[i] = Math.random() * 1.5 + 0.5

      // Alpha inicial
      alphas[i] = Math.random() * 0.5 + 0.5

      // Valor aleatorio para animación
      randomValues[i] = Math.random() * Math.PI * 2
    }

    return { positions, sizes, alphas, randomValues }
  }, [count])

  // Fade in al inicio
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpacity(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  // Animación CON interacción de mouse y efecto de parpadeo
  useFrame((state) => {
    if (!pointsRef.current) return

    const time = state.clock.getElapsedTime()
    const { mouse } = state

    // Aplicar fade in gradual
    if (shaderMaterialRef.current) {
      shaderMaterialRef.current.opacity = THREE.MathUtils.lerp(
        shaderMaterialRef.current.opacity || 0,
        opacity,
        0.05
      )
    }

    // Rotación lenta y orgánica
    pointsRef.current.rotation.y = time * 0.03
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.1

    // Efecto de repulsión del mouse (burbuja)
    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      mouse.x * -3,
      0.05
    )
    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      mouse.y * -3,
      0.05
    )

    // Efecto de parpadeo tipo estrellas - solo algunas parpadean
    const alphaAttribute = pointsRef.current.geometry.attributes.alpha
    if (alphaAttribute) {
      for (let i = 0; i < count; i++) {
        // Solo el 30% de las partículas parpadean
        if (randomValues[i] > 2.0) {
          // Partículas que parpadean (ritmo más lento)
          const twinkle = Math.sin(time * 0.8 + randomValues[i] * 10) * 0.4 + 0.6
          alphaAttribute.array[i] = alphas[i] * twinkle
        } else {
          // Partículas constantes (70% del total)
          alphaAttribute.array[i] = alphas[i]
        }
      }
      alphaAttribute.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-alpha"
          args={[alphas, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={shaderMaterialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          color: { value: new THREE.Color('#00d4ff') }
        }}
        transparent={true}
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
