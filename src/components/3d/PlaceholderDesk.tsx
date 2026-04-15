// PlaceholderDesk — colored box stand-ins for the vintage desk scene.
// All positions, sizes, and material values come from 02-UI-SPEC.md.
// Phase 5 replaces this with a Draco-compressed GLTF; the box `name`
// props are preserved into that phase so raycasting logic (Phase 3)
// keeps working unchanged.
//
// SCENE-01/02/04 are Phase 5 concerns — this file is the placeholder.
import InteractiveMesh from './InteractiveMesh'

export default function PlaceholderDesk() {
  return (
    <group name="placeholder-desk">
      {/* Desk surface — dark mahogany slab, origin-centered; non-interactive */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow name="desk-surface">
        <boxGeometry args={[4, 0.1, 2]} />
        <meshStandardMaterial color="#3d2b1f" emissive="#000000" emissiveIntensity={0} />
      </mesh>

      {/* CRT monitor — phosphor green emissive; InteractiveMesh → projects panel */}
      <InteractiveMesh
        panelId="projects"
        name="monitor"
        position={[-1, 1.1, 0]}
        args={[0.8, 0.7, 0.1]}
        color="#1a1a1a"
        emissive="#39ff14"
        emissiveIntensity={0.4}
        hoverEmissiveIntensity={1.2}
      />

      {/* Papers / notebook — warm aged tan; InteractiveMesh → about panel.
          emissive updated #000000 → #ffb347 (amber) per 03-UI-SPEC.md §Color
          so hover ramp produces a visible amber glow (idle intensity stays 0). */}
      <InteractiveMesh
        panelId="about"
        name="papers"
        position={[0.8, 0.15, 0.3]}
        args={[0.5, 0.05, 0.4]}
        color="#c8a96e"
        emissive="#ffb347"
        emissiveIntensity={0}
        hoverEmissiveIntensity={1.2}
      />

      {/* Phone / postcard — weathered plastic brown; InteractiveMesh → contact panel.
          emissive updated #000000 → #ffb347 (amber) per 03-UI-SPEC.md §Color
          so hover ramp produces a visible amber glow (idle intensity stays 0). */}
      <InteractiveMesh
        panelId="contact"
        name="phone"
        position={[1.5, 0.2, -0.2]}
        args={[0.3, 0.15, 0.5]}
        color="#8b7355"
        emissive="#ffb347"
        emissiveIntensity={0}
        hoverEmissiveIntensity={1.2}
      />

      {/* Lamp — brass with slight warm emission; non-interactive */}
      <mesh position={[-1.5, 0.6, -0.5]} castShadow receiveShadow name="lamp">
        <boxGeometry args={[0.15, 1.0, 0.15]} />
        <meshStandardMaterial color="#b8860b" emissive="#ffb347" emissiveIntensity={0.2} />
      </mesh>

      {/* Scene floor — dark plane that absorbs most light; non-interactive */}
      <mesh position={[0, -0.1, 0]} castShadow receiveShadow name="scene-floor">
        <boxGeometry args={[20, 0.1, 20]} />
        <meshStandardMaterial color="#0d0d0d" emissive="#000000" emissiveIntensity={0} />
      </mesh>
    </group>
  )
}
