import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { Slider, Button } from 'antd'

function Box({ x = 0, y = 0, z = 0, add = () => {}, rmv = () => {} }) {
  const [size, set] = useState(0.5)
  const [hidden, setVisible] = useState(false)
  return (
    <mesh scale={2} position={[x, y, z]} transform>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial />
      <Html
        style={{
          transition: 'all 0.2s',
          opacity: hidden ? 0 : 1,
          transform: `scale(${hidden ? 0.5 : 1})`
        }}
        distanceFactor={1}
        rotation={[0, 0, Math.PI / 8]}
        position={[0, 0, 0.51]}
        transform
        occlude
        onOcclude={setVisible}>
        <span>Size</span>
        <Slider style={{ width: 100 }} min={0.5} max={1} step={0.01} value={size} onChange={set} />
        <Button
          style={{ width: 100, display: 'block' }}
          onClick={() => {
            set(1)
            add()
          }}>
          grw
        </Button>
        <Button
          style={{ width: 100 }}
          onClick={() => {
            set(0.5)
            rmv()
          }}>
          srnk
        </Button>
      </Html>
    </mesh>
  )
}

function Sphere(props) {
  const ref = useRef()
  useFrame((state) => (ref.current.position.x = Math.sin(state.clock.getElapsedTime())))
  return (
    <mesh ref={ref} {...props}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function App() {
  const [count, setCount] = useState(2)
  const boxes = new Array(count)
  console.log(boxes.fill(1).map((v, i) => i))

  return (
    <Canvas dpr={[1, 2]} camera={{ fov: 25 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 5]} />
      <pointLight position={[-10, -10, -10]} />
      {boxes.map((v, i) => {
        console.log(i)
        return (
          <Box
            {...{
              x: i * 2,
              add: () => {
                setCount(count + (count < 5 ? 1 : 0))
              },
              rmv: () => {
                setCount(count + (count > 0 ? -1 : 0))
              }
            }}
            key={i}
          />
        )
      })}
      <Box y={2} />
      {/*<Sphere position={[0, 0, 1]} />*/}
      <OrbitControls />
    </Canvas>
  )
}
