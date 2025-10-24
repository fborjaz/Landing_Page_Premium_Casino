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
  { id: 1, symbol: "♠", title: "JACKPOT", value: "$50K", color: "#22d3ee", emissive: "#06b6d4", position: [-6, 1, -2] },
  { id: 2, symbol: "♥", title: "BONUS", value: "x3", color: "#ec4899", emissive: "#db2777", position: [6, -1, -1] },
  { id: 3, symbol: "♦", title: "GIROS", value: "100", color: "#f59e0b", emissive: "#d97706", position: [-4, -2, -3] },
  { id: 4, symbol: "♣", title: "NIVEL", value: "VIP", color: "#8b5cf6", emissive: "#7c3aed", position: [4, 2, -4] },
  { id: 5, symbol: "♠", title: "RACHA", value: "15x", color: "#10b981", emissive: "#059669", position: [-3, 0, -1] },
  { id: 6, symbol: "♥", title: "PREMIO", value: "$10K", color: "#3b82f6", emissive: "#2563eb", position: [3, -1, -3] },
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

  const startProgress = (data.id - 1) * 0.04
  const normalizedProgress = Math.max(0, Math.min(1, (scrollProgress - startProgress) / 0.06))
  const appearProgress = normalizedProgress


  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    const startProg = (data.id - 1) * 0.04
    const animProgress = Math.max(0, Math.min(1, (scrollProgress - startProg) / 0.06))

    const allCardsVisible = scrollProgress > 0.3

    const floatY = Math.sin(time * 0.5 + data.id) * 0.3
    const floatX = Math.cos(time * 0.3 + data.id) * 0.2

    const mouseInfluenceX = mousePosition.x * 2
    const mouseInfluenceY = mousePosition.y * 2

    meshRef.current.position.x = THREE.MathUtils.lerp(
      meshRef.current.position.x,
      data.position[0] + floatX + mouseInfluenceX,
      0.05,
    )
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      data.position[1] + floatY + mouseInfluenceY,
      0.05,
    )

    if (!allCardsVisible) {
      const startZ = -15
      const endZ = data.position[2]
      const targetZ = startZ + (endZ - startZ) * animProgress
      meshRef.current.position.z = THREE.MathUtils.lerp(
        meshRef.current.position.z,
        targetZ,
        0.05,
      )
    }

    const currentAppearProgress = animProgress

    if (currentAppearProgress > 0.7) {
      const direction = new THREE.Vector3()
      direction.subVectors(ctaPosition, meshRef.current.position).normalize()

      const targetRotation = Math.atan2(direction.x, direction.z)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.03)
    } else {
      const targetRotation = (time * 0.2 + data.id) * currentAppearProgress
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotation, 0.05)
    }

    const targetRotationX = Math.sin(time * 0.3 + data.id) * 0.1 * currentAppearProgress
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05)

    const targetScale = currentAppearProgress * (hovered ? 1.2 : 1)
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1))
  })

  if (appearProgress === 0) {
    return null
  }

  return (
    <group ref={meshRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      <RoundedBox args={[3, 4, 0.15]} radius={0.15} smoothness={4}>
        <meshPhysicalMaterial
          color="#0f172a"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1}
          clearcoatRoughness={0}
          emissive={data.emissive}
          emissiveIntensity={hovered ? 0.5 : 0.2}
          transparent={true}
          opacity={appearProgress}
        />
      </RoundedBox>

      <RoundedBox args={[3.15, 4.15, 0.12]} radius={0.18} smoothness={4} position={[0, 0, -0.08]}>
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 1.5 : 0.8}
          metalness={1}
          roughness={0}
          transparent={true}
          opacity={appearProgress}
        />
      </RoundedBox>

      <Text
        position={[0, 1, 0.1]}
        fontSize={1.2}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
        fillOpacity={appearProgress}
      >
        {data.symbol}
      </Text>

      <Text
        position={[0, -0.2, 0.1]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
        fillOpacity={appearProgress}
      >
        {data.title}
      </Text>

      <Text
        position={[0, -1, 0.1]}
        fontSize={0.6}
        color={data.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
        fontWeight={700}
        fillOpacity={appearProgress}
      >
        {data.value}
      </Text>

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

  const ctaPosition = new THREE.Vector3(0, -2, 2)

  useEffect(() => {
    setMousePos({ x: mouse.x, y: mouse.y })
  }, [mouse])

  return (
    <group>
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, 10, 5]} intensity={2} />
      <pointLight position={[0, 0, 10]} intensity={2} color="#22d3ee" />

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
