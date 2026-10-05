'use client'

import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader.js'

/**
 * The official Quarau symbol, extruded in 3D straight from the vectorized SVG
 * (/brand/quarau-simbolo.svg): exact geometry and colours, no redesign.
 */
function Symbol3D() {
  const group = useRef<THREE.Group>(null)
  const { pointer } = useThree()
  const svg = useLoader(SVGLoader, '/brand/quarau-simbolo.svg')

  const meshes = useMemo(() => {
    const items: Array<{ geometry: THREE.ExtrudeGeometry; material: THREE.Material; z: number }> = []
    for (const path of svg.paths) {
      const color = path.color.clone()
      const isAccent = color.g > color.b // green dot
      const material = new THREE.MeshPhysicalMaterial({
        color,
        roughness: 0.32,
        metalness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.15,
      })
      for (const shape of SVGLoader.createShapes(path)) {
        const geometry = new THREE.ExtrudeGeometry(shape, {
          depth: isAccent ? 70 : 56,
          bevelEnabled: true,
          bevelThickness: 10,
          bevelSize: 6,
          bevelSegments: 6,
          curveSegments: 48,
        })
        items.push({ geometry, material, z: isAccent ? 4 : 0 })
      }
    }
    // Centre the whole symbol and normalise its size.
    const box = new THREE.Box3()
    items.forEach((m) => {
      m.geometry.computeBoundingBox()
      box.union(m.geometry.boundingBox!)
    })
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const scale = 2.9 / Math.max(size.x, size.y)
    return { items, center, scale }
  }, [svg])

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const t = state.clock.elapsedTime
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, pointer.x * 0.45 + Math.sin(t * 0.3) * 0.18, 2.2, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -pointer.y * 0.3 + Math.cos(t * 0.25) * 0.06, 2.2, delta)
    g.position.y = Math.sin(t * 0.6) * 0.05
  })

  const { items, center, scale } = meshes
  return (
    <group ref={group}>
      {/* SVG Y axis points down: flip it, then centre */}
      <group scale={[scale, -scale, scale]}>
        <group position={[-center.x, -center.y, -center.z]}>
          {items.map((m, i) => (
            <mesh key={i} geometry={m.geometry} material={m.material} position={[0, 0, m.z]} />
          ))}
        </group>
      </group>
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
      <hemisphereLight args={['#ffffff', '#04263a', 1.2]} />
      <directionalLight position={[3, 4, 6]} intensity={2.6} />
      <directionalLight position={[-5, -2, 3]} intensity={0.9} color="#6fbbe4" />
      <pointLight position={[0, 1, 4]} intensity={8} distance={10} />
      <Symbol3D />
    </Canvas>
  )
}
