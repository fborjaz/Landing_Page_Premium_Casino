"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Text, RoundedBox } from "@react-three/drei"
import * as THREE from "three"

interface CardData {
  id: number
  symbol: string
  title: string
  value: string
  color: string
  emissive: string
  position: [number, number, number]
}

const cardData: CardData[] = [
  { id: 1, symbol: "♠", title: "JACKPOT", value: "$50K", color: "#22d3ee", emissive: "#06b6d4", position: [-8, 2, -5] },
  { id: 2, symbol: "♥", title: "BONUS", value: "x3", color: "#ec4899", emissive: "#db2777", position: [8, -1, -3] },
  { id: 3, symbol: "♦", title: "GIROS", value: "100", color: "#f59e0b", emissive: "#d97706", position: [-6, -3, -4] },
  { id: 4, symbol: "♣", title: "NIVEL", value: "VIP", color: "#8b5cf6", emissive: "#7c3aed", position: [6, 3, -6] },
  { id: 5, symbol: "♠", title: "RACHA", value: "15x", color: "#10b981", emissive: "#059669", position: [-4, 0, -2] },
  { id: 6, symbol: "♥", title: "PREMIO", value: "$10K", color: "#3b82f6", emissive: "#2563eb", position: [4, -2, -5] },
]

interface FloatingCardProps {
  data: CardData
  scrollProgress: number
  mousePosition: { x: number; y: number }
  ctaPosition: THREE.Vector3
}

function FloatingCard({ data, scrollProgress, mousePosition, ctaPosition }: FloatingCardProps) {
  const meshRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  // Calcular la aparición basada en el scroll
  const appearProgress = Math.max(0, Math.min(1, (scrollProgress - data.id * 0.1) * 2))

  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    // Posición base con flotación
    const floatY = Math.sin(time * 0.5 + data.id) * 0.3
    const floatX = Math.cos(time * 0.3 + data.id) * 0.2

    // Reacción al mouse (repulsión suave)
    const mouseInfluenceX = mousePosition.x * -2
    const mouseInfluenceY = mousePosition.y * -2

    // Interpolación suave de la posición
    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      data.position[0] + floatX + mouseInfluenceX * 0.5,
      0.05,
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      data.position[1] + floatY + mouseInfluenceY * 0.5,
      0.05,
    )
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      data.position[2] * (1 - appearProgress * 0.5),
      0.05,
    )

    // Orientación hacia el CTA cuando aparece
    if (appearProgress > 0.5) {
      const direction = new THREE.Vector3()
      direction.subVectors(ctaPosition, meshRef.current.position).normalize()

      const targetRotation = Math.atan2(direction.x, direction.z)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.03)
    } else {
      // Rotación libre antes de orientarse al CTA
      meshRef.current.rotation.y = time * 0.2 + data.id
    }

    // Rotación en X suave
    meshRef.current.rotation.x = Math.sin(time * 0.3 + data.id) * 0.1

    // Escala con hover y aparición
    const targetScale = appearProgress * (hovered ? 1.2 : 1)
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
  })

  return (
    <group ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Cuerpo de la carta */}
      <RoundedBox args={[2, 2.8, 0.1]} radius={0.1} smoothness={4}>
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive={data.emissive}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </RoundedBox>

      {/* Marco brillante */}
      <RoundedBox args={[2.1, 2.9, 0.08]} radius={0.12} smoothness={4} position={[0, 0, -0.06]}>
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          metalness={1}
          roughness={0}
        />
      </RoundedBox>

      {/* Símbolo grande */}
      <Text
        position={[0, 0.6, 0.06]}
        fontSize={0.8}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {data.symbol}
      </Text>

      {/* Título */}
      <Text
        position={[0, -0.1, 0.06]}
        fontSize={0.25}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {data.title}
      </Text>

      {/* Valor */}
      <Text
        position={[0, -0.6, 0.06]}
        fontSize={0.4}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#000000"
        fontWeight={700}
      >
        {data.value}
      </Text>

      {/* Brillo de hover */}
      {hovered && <pointLight position={[0, 0, 1]} intensity={2} distance={5} color={data.color} />}
    </group>
  )
}

interface FloatingCardsProps {
  scrollProgress: number
}

export default function FloatingCards({ scrollProgress }: FloatingCardsProps) {
  const { mouse } = useThree()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // CTA position (ajusta según donde esté tu botón)
  const ctaPosition = new THREE.Vector3(0, -4, 0)

  useEffect(() => {
    setMousePos({ x: mouse.x, y: mouse.y })
  }, [mouse])

  return (
    <group>
      {/* Iluminación ambiental */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 0, 10]} intensity={1} color="#22d3ee" />

      {/* Renderizar todas las cartas */}
      {cardData.map((card) => (
        <FloatingCard
          key={card.id}
          data={card}
          scrollProgress={scrollProgress}
          mousePosition={mousePos}
          ctaPosition={ctaPosition}
        />
      ))}
    </group>
  )
}
