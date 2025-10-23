// En: src/components/Scene.tsx

import Particles from './Particles'

export default function Scene() {
  return (
    <>
      {/* Iluminación para las partículas */}
      <ambientLight intensity={1.5} />

      {/* Sistema de partículas */}
      <Particles />
    </>
  )
}
