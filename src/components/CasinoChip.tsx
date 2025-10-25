import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import * as THREE from 'three'

export default function CasinoChip() {
  const chipRef = useRef<THREE.Group>(null)
  const edgeRingRef = useRef<THREE.Mesh>(null)

  // Animación de pulsación del anillo neón
  useFrame((state) => {
    if (edgeRingRef.current) {
      const time = state.clock.getElapsedTime()
      const material = edgeRingRef.current.material as THREE.MeshStandardMaterial
      material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.2
    }
  })

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        rotateSpeed={1}
      />

      {/* Sistema de iluminación */}
      <ambientLight intensity={1.5} />
      <hemisphereLight args={['#fbbf24', '#1e293b', 2]} />

      {/* Luces frontales (para cara con $500) */}
      <directionalLight position={[0, 0, 12]} intensity={5} color="#ffffff" castShadow />
      <directionalLight position={[10, 5, 8]} intensity={4} color="#ffffff" />
      <directionalLight position={[-10, 5, 8]} intensity={4} color="#ffffff" />
      <directionalLight position={[0, -5, 8]} intensity={3} color="#ffffff" />
      <directionalLight position={[0, 10, 3]} intensity={3.5} color="#ffffff" />

      {/* Luces puntuales */}
      <pointLight position={[0, 4, 10]} intensity={5} color="#fbbf24" />
      <pointLight position={[6, 3, 6]} intensity={3.5} color="#fbbf24" />
      <pointLight position={[-6, 3, 6]} intensity={3.5} color="#fbbf24" />
      <pointLight position={[0, -3, 6]} intensity={3} color="#fcd34d" />

      {/* SpotLights enfocados */}
      <spotLight position={[5, 5, 5]} intensity={4} angle={0.5} penumbra={0.5} color="#ffffff" />
      <spotLight position={[-5, 5, 5]} intensity={4} angle={0.5} penumbra={0.5} color="#ffffff" />

      {/* LUZ PRINCIPAL - Crea reflejo brillante cuando inclinas la ficha hacia ti */}
      <spotLight
        position={[0, 6, 15]}
        intensity={12}
        angle={0.3}
        penumbra={0.2}
        color="#ffffff"
        castShadow
      />

      {/* Luces de soporte para el reflejo */}
      <pointLight position={[0, 3, 12]} intensity={8} color="#ffffff" decay={2} distance={20} />
      <pointLight position={[3, 4, 13]} intensity={6} color="#fef3c7" decay={2} distance={18} />
      <pointLight position={[-3, 4, 13]} intensity={6} color="#fef3c7" decay={2} distance={18} />

      {/* Luces direccionales para crear hotspot cuando se inclina */}
      <directionalLight position={[0, 5, 12]} intensity={7} color="#ffffff" />
      <directionalLight position={[2, 6, 14]} intensity={5} color="#fef3c7" />
      <directionalLight position={[-2, 6, 14]} intensity={5} color="#fef3c7" />

      <group ref={chipRef}>
        {/* Cuerpo principal */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2, 2, 0.2, 64]} />
          <meshPhysicalMaterial
            color="#fcd34d"
            emissive="#f59e0b"
            emissiveIntensity={0.6}
            metalness={1}
            roughness={0.02}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={5}
            sheen={1}
            sheenRoughness={0.1}
            sheenColor="#fbbf24"
          />
        </mesh>

        {/* Estriado del borde */}
        {Array.from({ length: 48 }).map((_, i) => {
          const angle = (i / 48) * Math.PI * 2
          const x = Math.cos(angle) * 2.02
          const z = Math.sin(angle) * 2.02

          return (
            <mesh key={`edge-${i}`} position={[x, 0, z]} rotation={[0, angle, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.06, 0.22, 0.03]} />
              <meshPhysicalMaterial
                color="#f59e0b"
                emissive="#f59e0b"
                emissiveIntensity={0.7}
                metalness={1}
                roughness={0.01}
                clearcoat={1}
                clearcoatRoughness={0}
                reflectivity={1}
                envMapIntensity={4}
                sheen={0.8}
                sheenColor="#fbbf24"
              />
            </mesh>
          )
        })}

        {/* Anillo neón cyan pulsante */}
        <mesh ref={edgeRingRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.02, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#22d3ee"
            emissiveIntensity={1.5}
            metalness={1}
            roughness={0}
            toneMapped={false}
          />
        </mesh>

        {/* Diamantes - cara superior */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 1.3
          const z = Math.sin(angle) * 1.3

          return (
            <group key={i} position={[x, 0.13, z]} rotation={[0, angle, 0]}>
              <mesh rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.18, 0.1, 8]} />
                <meshPhysicalMaterial
                  color="#f0f9ff"
                  emissive="#7dd3fc"
                  emissiveIntensity={0.6}
                  metalness={0.1}
                  roughness={0}
                  transmission={0.7}
                  thickness={0.5}
                  ior={2.417}
                  reflectivity={1}
                  clearcoat={1}
                  clearcoatRoughness={0}
                  envMapIntensity={8}
                  attenuationColor="#bae6fd"
                  attenuationDistance={0.3}
                  sheen={0.5}
                  sheenColor="#ffffff"
                />
              </mesh>

              <mesh rotation={[Math.PI, Math.PI / 4, 0]} position={[0, -0.05, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.18, 0.15, 8]} />
                <meshPhysicalMaterial
                  color="#f0f9ff"
                  emissive="#7dd3fc"
                  emissiveIntensity={0.6}
                  metalness={0.1}
                  roughness={0}
                  transmission={0.7}
                  thickness={0.5}
                  ior={2.417}
                  reflectivity={1}
                  clearcoat={1}
                  clearcoatRoughness={0}
                  envMapIntensity={8}
                  attenuationColor="#bae6fd"
                  attenuationDistance={0.3}
                  sheen={0.5}
                  sheenColor="#ffffff"
                />
              </mesh>

              <mesh position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          )
        })}

        {/* Diamantes - cara inferior */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          const x = Math.cos(angle) * 1.3
          const z = Math.sin(angle) * 1.3

          return (
            <group key={`bottom-${i}`} position={[x, -0.13, z]} rotation={[Math.PI, angle, 0]}>
              <mesh rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.18, 0.1, 8]} />
                <meshPhysicalMaterial
                  color="#f0f9ff"
                  emissive="#7dd3fc"
                  emissiveIntensity={0.6}
                  metalness={0.1}
                  roughness={0}
                  transmission={0.7}
                  thickness={0.5}
                  ior={2.417}
                  reflectivity={1}
                  clearcoat={1}
                  clearcoatRoughness={0}
                  envMapIntensity={8}
                  attenuationColor="#bae6fd"
                  attenuationDistance={0.3}
                  sheen={0.5}
                  sheenColor="#ffffff"
                />
              </mesh>

              <mesh rotation={[Math.PI, Math.PI / 4, 0]} position={[0, -0.05, 0]} castShadow receiveShadow>
                <coneGeometry args={[0.18, 0.15, 8]} />
                <meshPhysicalMaterial
                  color="#f0f9ff"
                  emissive="#7dd3fc"
                  emissiveIntensity={0.6}
                  metalness={0.1}
                  roughness={0}
                  transmission={0.7}
                  thickness={0.5}
                  ior={2.417}
                  reflectivity={1}
                  clearcoat={1}
                  clearcoatRoughness={0}
                  envMapIntensity={8}
                  attenuationColor="#bae6fd"
                  attenuationDistance={0.3}
                  sheen={0.5}
                  sheenColor="#ffffff"
                />
              </mesh>

              <mesh position={[0, 0.1, 0]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshBasicMaterial color="#ffffff" />
              </mesh>
            </group>
          )
        })}

        {/* Círculo central superior */}
        <mesh position={[0, 0.11, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 64]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        {/* Anillo dorado superior */}
        <mesh position={[0, 0.105, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <ringGeometry args={[0.85, 0.95, 64]} />
          <meshPhysicalMaterial
            color="#fcd34d"
            metalness={1}
            roughness={0.01}
            emissive="#fbbf24"
            emissiveIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={5}
            sheen={1}
            sheenColor="#fbbf24"
          />
        </mesh>

        {/* Círculo central inferior */}
        <mesh position={[0, -0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.9, 64]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.6}
            roughness={0.25}
          />
        </mesh>

        {/* Anillo dorado inferior */}
        <mesh position={[0, -0.105, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <ringGeometry args={[0.85, 0.95, 64]} />
          <meshPhysicalMaterial
            color="#fcd34d"
            metalness={1}
            roughness={0.01}
            emissive="#fbbf24"
            emissiveIntensity={1}
            clearcoat={1}
            clearcoatRoughness={0}
            reflectivity={1}
            envMapIntensity={5}
            sheen={1}
            sheenColor="#fbbf24"
          />
        </mesh>

        {/* Texto cara superior */}
        <Text
          position={[0, 0.12, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.5}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          $500
        </Text>

        {/* Texto cara inferior */}
        <Text
          position={[0, -0.12, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          fontSize={0.5}
          color="#fbbf24"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.015}
          outlineColor="#000000"
        >
          AI
        </Text>
      </group>
    </>
  )
}
