// PlaceholderDesk — colored box stand-ins for the vintage desk scene.
// All positions, sizes, and material values come from 02-UI-SPEC.md.
// Phase 5 replaces this with a Draco-compressed GLTF; the box `name`
// props are preserved into that phase so raycasting logic (Phase 3)
// keeps working unchanged.
//
// SCENE-01/02/04 are Phase 5 concerns — this file is the placeholder.
export default function PlaceholderDesk() {
  return (
    <group name="placeholder-desk">
      {/* Desk surface — dark mahogany slab, origin-centered */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow name="desk-surface">
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d2b1f" emissive="#000000" emissiveIntensity={0} />
      </mesh>

      {/* CRT monitor — phosphor green emissive, subdued */}
      <mesh position={[-1, 1.1, 0]} castShadow receiveShadow name="monitor">
        <boxGeometry args={[0.8, 0.7, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" emissive="#39ff14" emissiveIntensity={0.4} />
      </mesh>

      {/* Papers / notebook — warm aged tan */}
      <mesh position={[0.8, 0.15, 0.3]} castShadow receiveShadow name="papers">
        <boxGeometry args={[0.5, 0.05, 0.4]} />
        <meshStandardMaterial color="#c8a96e" emissive="#000000" emissiveIntensity={0} />
      </mesh>

      {/* Phone / postcard — weathered plastic brown */}
      <mesh position={[1.5, 0.2, -0.2]} castShadow receiveShadow name="phone">
        <boxGeometry args={[0.3, 0.15, 0.5]} />
        <meshStandardMaterial color="#8b7355" emissive="#000000" emissiveIntensity={0} />
      </mesh>

      {/* Lamp — brass with slight warm emission */}
      <mesh position={[-1.5, 0.6, -0.5]} castShadow receiveShadow name="lamp">
        <boxGeometry args={[0.15, 1.0, 0.15]} />
        <meshStandardMaterial color="#b8860b" emissive="#ffb347" emissiveIntensity={0.2} />
      </mesh>

      {/* Scene floor — dark plane that absorbs most light */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow name="scene-floor">
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#0d0d0d" emissive="#000000" emissiveIntensity={0} />
      </mesh>
    </group>
  )
}
