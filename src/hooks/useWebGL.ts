/**
 * Returns false when the browser has WebGL disabled, has no GPU,
 * or the user has blocked WebGL via flags/extensions.
 * 'experimental-webgl' covers pre-2016 browsers — costs nothing to include.
 */
export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas')
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    )
  } catch {
    return false
  }
}
