import Particles from './Particles'

export default function Scene() {
  return (
    <>
      <ambientLight intensity={1.5} />
      <Particles />
    </>
  )
}
