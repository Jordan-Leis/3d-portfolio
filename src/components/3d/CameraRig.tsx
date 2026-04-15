// CameraRig — CAMERA-01..04.
// Pattern (from 02-RESEARCH.md): two parallel gsap.to() tweens — one on the
// camera position ref, one on a separate THREE.Vector3 lookAt target ref.
// useFrame applies camera.lookAt(lookAtTarget.current) every tick so the
// target interpolates smoothly through the full transition.
//
// CAMERA-04 explicitly requires GSAP to animate Three.js object refs
// directly, NOT React state. Do not introduce useState for camera props.
import { useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { useStore } from '@/store/useStore'
import { CAMERA_PRESETS } from '@/config/cameraPresets'

export default function CameraRig() {
  const camera = useThree((state) => state.camera)
  const cameraPreset = useStore((state) => state.cameraPreset)
  const cameraTransitioning = useStore((state) => state.cameraTransitioning)
  const setCameraTransitioning = useStore((state) => state.setCameraTransitioning)

  // Allocated once at mount. GSAP mutates .x/.y/.z in place; useFrame reads
  // on every tick. Never recreate inside useFrame — GC pressure.
  // Initial value matches the 'home' preset lookAt so the first frame before
  // any tween fires still points at the correct target.
  const lookAtTarget = useRef(new THREE.Vector3(0, 0.5, 0))

  useEffect(() => {
    const preset = CAMERA_PRESETS[cameraPreset]
    const [px, py, pz] = preset.position
    const [lx, ly, lz] = preset.lookAt

    // Kill any in-flight tweens on these targets so rapid preset changes
    // don't leave orphan tweens fighting the new one.
    gsap.killTweensOf(camera.position)
    gsap.killTweensOf(lookAtTarget.current)

    setCameraTransitioning(true)

    // Tween 1 — camera position (mutates the Three.js Vector3 directly).
    gsap.to(camera.position, {
      x: px,
      y: py,
      z: pz,
      duration: 1.2,
      ease: 'power3.inOut',
    })

    // Tween 2 — lookAt target. Kept separate from the position tween so
    // useFrame can apply lookAt() every frame without coupling to tween 1.
    gsap.to(lookAtTarget.current, {
      x: lx,
      y: ly,
      z: lz,
      duration: 1.2,
      ease: 'power3.inOut',
      onComplete: () => setCameraTransitioning(false),
    })

    // CRITICAL cleanup — prevents onComplete (which calls a Zustand setter)
    // from firing after the component unmounts, e.g. if DesktopLayout
    // unmounts mid-transition due to a mobile resize.
    return () => {
      gsap.killTweensOf(camera.position)
      gsap.killTweensOf(lookAtTarget.current)
    }
  }, [cameraPreset, camera, setCameraTransitioning])

  // Per-tick lookAt application. During the tween, lookAtTarget.current is
  // being mutated by GSAP — calling lookAt here interpolates orientation
  // smoothly. When no tween is running, this call is idempotent.
  useFrame(() => {
    camera.lookAt(lookAtTarget.current)
  })

  return <OrbitControls enabled={!cameraTransitioning} />
}
