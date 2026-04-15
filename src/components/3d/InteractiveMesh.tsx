// InteractiveMesh — reusable hover-glow + click-routing wrapper for desk objects.
// Pattern 1 from 03-RESEARCH.md: direct ref mutation (no useState) for emissive
// intensity, imperative useStore.getState() read in onClick to avoid Zustand/React
// batching lag on rapid double-clicks (Pitfall 2 line 587).
//
// The three interactive meshes (monitor, papers, phone) use this wrapper.
// Non-interactive meshes (lamp, desk-surface, scene-floor) stay as plain <mesh>.
import { useRef, useEffect } from 'react'
import type { MeshStandardMaterial } from 'three'
import { useStore } from '@/store/useStore'
import type { PanelId } from '@/store/useStore'

interface InteractiveMeshProps {
  panelId: PanelId
  name: string
  position: [number, number, number]
  args: [number, number, number]
  color: string
  emissive: string
  emissiveIntensity?: number
  hoverEmissiveIntensity?: number
  castShadow?: boolean
  receiveShadow?: boolean
}

export default function InteractiveMesh({
  panelId,
  name,
  position,
  args,
  color,
  emissive,
  emissiveIntensity = 0.4,
  hoverEmissiveIntensity = 1.2,
  castShadow = true,
  receiveShadow = true,
}: InteractiveMeshProps) {
  const materialRef = useRef<MeshStandardMaterial>(null)
  // One selector per field — Zustand v5 pattern (CameraRig.tsx lines 19-21)
  const setCameraPreset = useStore((s) => s.setCameraPreset)
  const openPanel = useStore((s) => s.openPanel)
  const setHoveredObject = useStore((s) => s.setHoveredObject)

  // Pitfall 1 (03-RESEARCH.md line 573): reset cursor on unmount so mobile resize
  // while hovering doesn't leave the cursor as 'pointer' on the 2D layout.
  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default'
    }
  }, [])

  return (
    <mesh
      name={name}
      position={position}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onPointerOver={(e) => {
        e.stopPropagation()
        if (materialRef.current) {
          materialRef.current.emissiveIntensity = hoverEmissiveIntensity
        }
        document.body.style.cursor = 'pointer'
        setHoveredObject(name)
      }}
      onPointerOut={() => {
        if (materialRef.current) {
          materialRef.current.emissiveIntensity = emissiveIntensity
        }
        document.body.style.cursor = 'default'
        setHoveredObject(null)
      }}
      onClick={(e) => {
        e.stopPropagation()
        // Pitfall 2 (03-RESEARCH.md line 587): imperative getState read avoids
        // Zustand/React batching lag on rapid double-clicks. Do NOT use the
        // hook selector here — selector value can be stale within this handler.
        if (useStore.getState().cameraTransitioning) return
        setCameraPreset(panelId)
        openPanel(panelId)
      }}
    >
      <boxGeometry args={args} />
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
      />
    </mesh>
  )
}
