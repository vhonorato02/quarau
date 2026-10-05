'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

/**
 * The Quarau symbol in 3D, built from its own geometry (no redesign):
 * an elliptical ring with a 45° handle (the magnifier "Q") and the green dot.
 * Proportions follow the vectorized symbol (viewBox 863 × 714).
 */
function Symbol3D() {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const blue = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#0089CF', roughness: 0.28, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.18 }),
    [],
  )
  const green = useMemo(
    () => new THREE.MeshPhysicalMaterial({ color: '#39B54A', roughness: 0.3, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.2 }),
    [],
  )

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    const targetY = pointer.x * 0.35 + Math.sin(t * 0.25) * 0.15
    const targetX = -pointer.y * 0.25 + Math.cos(t * 0.2) * 0.06
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 2.5, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 2.5, delta)
    g.position.y = Math.sin(t * 0.6) * 0.06
  })

  // Symbol geometry (normalised to ring outer radius ≈ 1)
  const ringR = 0.86
  const tube = 0.15
  const handleAngle = -Math.PI / 4
  const handleLen = 0.62
  const hx = Math.cos(handleAngle) * (ringR + handleLen / 2 - 0.02)
  const hy = Math.sin(handleAngle) * (ringR + handleLen / 2 - 0.02)

  return (
    <group ref={group} scale={1.45} position={[0.1, 0.05, 0]}>
      <group scale={[1.07, 0.94, 1]}>
        <mesh material={blue} castShadow>
          <torusGeometry args={[ringR, tube, 48, 160]} />
        </mesh>
      </group>
      <mesh material={blue} position={[hx * 1.03, hy * 0.96, 0]} rotation={[0, 0, handleAngle]}>
        <boxGeometry args={[handleLen, tube * 1.75, tube * 1.75]} />
      </mesh>
      <mesh material={green} position={[1.42, -0.42, 0]}>
        <sphereGeometry args={[0.2, 64, 64]} />
      </mesh>
    </group>
  )
}

export default function HeroScene({ onReady }: { onReady?: () => void }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={() => onReady?.()}
      aria-hidden="true"
    >
      <hemisphereLight args={['#ffffff', '#04263a', 1.1]} />
      <directionalLight position={[3, 4, 5]} intensity={2.4} />
      <directionalLight position={[-4, -2, 2]} intensity={0.8} color="#6fbbe4" />
      <pointLight position={[0, 0, 3]} intensity={6} distance={8} color="#ffffff" />
      <Symbol3D />
    </Canvas>
  )
}
