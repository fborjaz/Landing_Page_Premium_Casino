import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  delay: number;
}

interface StepCard3DProps {
  steps: Step[];
  scrollProgress: number;
}

const SingleStepCard = ({
  step,
  position,
  scrollProgress,
  mousePos
}: {
  step: Step;
  position: [number, number, number];
  scrollProgress: number;
  mousePos: { x: number; y: number };
}) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [appeared, setAppeared] = useState(false);

  // Calcular cuándo debe aparecer esta tarjeta
  const appearThreshold = step.delay;
  const shouldAppear = scrollProgress > appearThreshold;

  useEffect(() => {
    if (shouldAppear && !appeared) {
      setAppeared(true);
    }
  }, [shouldAppear, appeared]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    if (appeared) {
      // Animación de flotación
      const floatY = Math.sin(time * 0.5 + step.number) * 0.2;
      const floatX = Math.cos(time * 0.3 + step.number) * 0.1;

      // Influencia del mouse
      const mouseInfluenceX = mousePos.x * 0.5;
      const mouseInfluenceY = mousePos.y * 0.5;

      // Animación de aparición suave
      const targetScale = hovered ? 1.15 : 1;
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      );

      // Posición final con flotación
      meshRef.current.position.x = position[0] + floatX + mouseInfluenceX * 0.3;
      meshRef.current.position.y = position[1] + floatY + mouseInfluenceY * 0.3;

      // Rotación suave
      meshRef.current.rotation.y = Math.sin(time * 0.2 + step.number) * 0.1;
      meshRef.current.rotation.x = Math.cos(time * 0.15 + step.number) * 0.05;

      // Opacidad de aparición
      if (meshRef.current.position.z < position[2]) {
        meshRef.current.position.z += 0.05;
      }
    } else {
      // Estado inicial (oculto atrás)
      meshRef.current.position.set(position[0], position[1], -10);
      meshRef.current.scale.set(0.1, 0.1, 0.1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={[position[0], position[1], -10]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Tarjeta principal */}
      <RoundedBox
        args={[2.5, 3.5, 0.2]}
        radius={0.1}
        smoothness={4}
      >
        <meshPhysicalMaterial
          color="#1a1a2e"
          metalness={0.3}
          roughness={0.4}
          transparent
          opacity={0.9}
          emissive={step.color}
          emissiveIntensity={hovered ? 0.3 : 0.15}
        />
      </RoundedBox>

      {/* Borde brillante */}
      <RoundedBox
        args={[2.55, 3.55, 0.15]}
        radius={0.1}
        smoothness={4}
      >
        <meshBasicMaterial
          color={step.color}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </RoundedBox>

      {/* Número grande del paso */}
      <Text
        position={[0, 1.3, 0.15]}
        fontSize={0.8}
        color={step.color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {step.number.toString().padStart(2, '0')}
      </Text>

      {/* Icono emoji */}
      <Text
        position={[0, 0.5, 0.15]}
        fontSize={0.6}
        anchorX="center"
        anchorY="middle"
      >
        {step.icon}
      </Text>

      {/* Título del paso */}
      <Text
        position={[0, -0.3, 0.15]}
        fontSize={0.35}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.05}
      >
        {step.title}
      </Text>

      {/* Descripción */}
      <Text
        position={[0, -1.0, 0.15]}
        fontSize={0.15}
        color="#a0a0a0"
        anchorX="center"
        anchorY="middle"
        maxWidth={2}
        textAlign="center"
        lineHeight={1.2}
      >
        {step.description}
      </Text>

      {/* Línea decorativa */}
      <mesh position={[0, 0.1, 0.15]}>
        <boxGeometry args={[1.5, 0.02, 0.01]} />
        <meshBasicMaterial color={step.color} opacity={0.5} transparent />
      </mesh>

      {/* Luz puntual para cada tarjeta */}
      <pointLight
        position={[0, 0, 1]}
        intensity={hovered ? 1.5 : 0.8}
        color={step.color}
        distance={3}
      />
    </group>
  );
};

const StepCard3D = ({ steps, scrollProgress }: StepCard3DProps) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Posiciones para las 3 tarjetas (disposición horizontal)
  const positions: [number, number, number][] = [
    [-3.5, 0, 0],  // Izquierda
    [0, 0, 0],     // Centro
    [3.5, 0, 0]    // Derecha
  ];

  return (
    <>
      {steps.map((step, index) => (
        <SingleStepCard
          key={step.number}
          step={step}
          position={positions[index]}
          scrollProgress={scrollProgress}
          mousePos={mousePos}
        />
      ))}
    </>
  );
};

export default StepCard3D;
