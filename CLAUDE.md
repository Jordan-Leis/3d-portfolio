# CLAUDE.md — 3d-portfolio Session Reference

Read this file at the start of every session. Everything here reflects what actually exists
in the codebase. Nothing is aspirational.

---

## 1. Project

Jordan's 3D Portfolio — a personal portfolio website built as an immersive vintage desk 3D
scene. Visitors explore an 80s/90s-era workspace (CRT monitor, desk lamp, scattered papers)
and click interactive objects to reveal About, Projects, and Contact panels.

**Current status:** Phases 1–5 are implemented. The 3D experience is real: `DesktopLayout`
mounts a `<Canvas>` with `DeskScene` (a Draco-compressed GLB desk loaded via `useGLTF`),
interactive meshes (monitor→Projects, phone-stand→About, papers→Contact) with hover-driven
emissive glow, a `CameraRig`, `SceneErrorBoundary`, and an EffectComposer postprocessing
stack (Bloom + Scanline + Vignette). All three content panels (About, Projects, Contact) are
authored with focus-trap accessibility, and `MobileLayout` is a full 2D fallback page with a
scanline overlay. The suite is 109 passing tests across 18 files.

**Deployment target:** GitHub Pages at `https://<user>.github.io/3d-portfolio/`

**Platform:** Desktop + WebGL only for 3D; mobile renders a 2D fallback.

---

## 2. Tech Stack

Exact installed versions from `package.json`:

### Runtime dependencies
| Package | Version |
|---------|---------|
| `react` | `^18.3.1` |
| `react-dom` | `^18.3.1` |
| `three` | `^0.175.0` |
| `@react-three/fiber` | `^8.18.0` |
| `@react-three/drei` | `^9.122.0` |
| `@react-three/postprocessing` | `^2.19.1` |
| `framer-motion` | `^12.38.0` |
| `gsap` | `^3.15.0` |
| `zustand` | `^5.0.12` |

### Dev dependencies
| Package | Version |
|---------|---------|
| `vite` | `^6.3.5` |
| `typescript` | `~5.8.3` |
| `@vitejs/plugin-react` | `^4.4.1` |
| `vite-plugin-glsl` | `^1.6.0` |
| `leva` | `^0.10.1` |
| `eslint` | `^9.25.0` |
| `typescript-eslint` | `^8.30.1` |
| `eslint-plugin-react-hooks` | `^5.2.0` |
| `eslint-plugin-react-refresh` | `^0.4.19` |
| `@types/react` | `^18.3.28` |
| `@types/react-dom` | `^18.3.7` |
| `@types/three` | `^0.175.0` |

---

## 3. Folder Structure

```
3d-portfolio/
  src/
    App.tsx                      # Mobile/WebGL gate + React.lazy DesktopLayout
    main.tsx                     # StrictMode entry point
    components/
      3d/                        # R3F scene components
        Scene.tsx                # <Canvas> contents: lights, DeskScene, CameraRig, EffectComposer
        DeskScene.tsx            # GLB desk (useGLTF) + interactive/visual mesh layers
        InteractiveMesh.tsx      # Raycast wrapper: cursor, hover glow, panel routing
        CameraRig.tsx            # GSAP camera transitions driven by cameraPreset
      ui/
        DesktopLayout.tsx        # <Canvas> root wrapped in SceneErrorBoundary + PanelLayer
        SceneErrorBoundary.tsx   # Class component; catches WebGL/render errors
        BIOSScreen.tsx           # Retro boot-screen loading UI
        HintOverlay.tsx          # "click an object" hint prompt
        PanelLayer.tsx           # AnimatePresence host for the active panel
        panels/                  # About/Projects/Contact panels + their content + tests
      mobile/
        MobileLayout.tsx         # Full 2D fallback page (hero + 3 sections + footer)
        ScanlineOverlay.tsx      # CRT scanline effect for the 2D page
      __tests__/                 # Component tests (Scene, DeskScene, PanelShell, ...)
    hooks/
      useIsMobile.ts             # matchMedia(max-width: 767px) — fires at breakpoint only
      useWebGL.ts                # isWebGLAvailable() — canvas probe, no hook, pure function
      usePanelClose.ts           # Esc / backdrop close handling for panels
      usePanelFocusTrap.ts       # Focus trap for open panels (a11y)
    store/
      useStore.ts                # Zustand v5 global store (see Architecture Rules)
    config/
      cameraPresets.ts           # Named camera positions per panel
      projects.ts                # Projects panel card data
      social.ts                  # Social link data
    styles/
      globals.css                # box-sizing reset, base font/bg/color, imports variables.css
      variables.css              # CSS custom properties (see Design Tokens)
    test-setup.ts                # Vitest + Testing Library setup
    vite-env.d.ts
  public/
    fonts/                       # VT323 font files (currently empty)
    models/
      desk-draco.glb             # Draco-compressed desk model (~80KB)
    draco/                       # Draco WASM decoder (decoder.js/.wasm, encoder, wrapper)
    textures/                    # CRT and paper textures (currently empty)
    .nojekyll                    # Prevent GitHub Pages Jekyll processing
  .github/
    workflows/
      deploy.yml                 # GitHub Actions CI/CD pipeline
  vite.config.ts
  vitest.config.ts
  tsconfig.app.json
  tsconfig.json
  eslint.config.js
  package.json
  index.html
```

---

## 4. npm Scripts

All five scripts from `package.json`:

| Script | Command | Use |
|--------|---------|-----|
| `dev` | `vite` | Local development server with HMR |
| `build` | `tsc -b && vite build` | Type-check then bundle for production |
| `lint` | `eslint .` | Run ESLint across all `.ts`/`.tsx` files |
| `preview` | `vite preview` | Serve the `dist/` output locally |
| `typecheck` | `tsc --noEmit` | Type-check without emitting files |

Always run `npm run typecheck` and `npm run lint` before committing.

---

## 5. Deployment

GitHub Actions handles all deployment. There is no `gh-pages` npm package.

**Workflow file:** `.github/workflows/deploy.yml`

**Triggers:** Push to `main`, or manual `workflow_dispatch`.

**Pipeline steps:**
1. `actions/checkout@v4`
2. `actions/setup-node@v4` — Node LTS, npm cache enabled
3. `npm ci`
4. `npm run build` (runs `tsc -b && vite build`)
5. `actions/configure-pages@v5`
6. `actions/upload-pages-artifact@v3` — uploads `./dist`
7. `actions/deploy-pages@v4`

**Permissions required:** `contents: read`, `pages: write`, `id-token: write`

**Concurrency:** group `pages`, cancel-in-progress enabled so only the latest push deploys.

There is no manual deploy step. Merge to `main` and the workflow handles everything.

---

## 6. Code Style & Conventions

### TypeScript (tsconfig.app.json)
- `"strict": true` — all strict checks enabled
- `"noUnusedLocals": true` — no unused variables
- `"noUnusedParameters": true` — no unused function params
- `"verbatimModuleSyntax": true` — use `import type` for type-only imports
- `"erasableSyntaxOnly": true` — no TS-only syntax that requires runtime transforms
- `"noUncheckedSideEffectImports": true`
- `"moduleResolution": "bundler"` — Vite bundler mode, not Node
- `"target": "ES2020"`, `"lib": ["ES2020", "DOM", "DOM.Iterable"]`
- Path alias `@` maps to `src/` — use `@/hooks/useStore` not relative paths when crossing
  directory boundaries

### ESLint (eslint.config.js)
- `typescript-eslint` recommended rules
- `eslint-plugin-react-hooks` recommended rules (exhaustive-deps enforced)
- `eslint-plugin-react-refresh` — warns if non-component exports are in component files
- `dist/` is excluded from linting

### Observed patterns in existing code
- Default exports for React components (one component per file)
- Named exports for hooks and utilities
- CSS-in-JS inline styles use design token CSS variables (`var(--color-bg)`) not hardcoded hex
- Comments explain *why*, not what — especially on architectural constraints
- Zustand action names match the action creator name (e.g., action string `'openPanel'`
  matches function name `openPanel`)

---

## 7. Architecture Rules

These are non-negotiable structural constraints. Violating them breaks the mobile/WebGL gate.

### Rule 1: The mobile/WebGL gate lives in App.tsx only

`App.tsx` is the single decision point for whether to render 3D or 2D. It checks two
independent conditions:
1. `useIsMobile()` — returns `true` if `window.innerWidth < 768`
2. `isWebGLAvailable()` — canvas probe at module scope

`show3D = !isMobile && webglAvailable`. If either is false, `<MobileLayout />` renders.

Do not add a second gate anywhere else. Do not move this logic into a context provider.

### Rule 2: WebGL detection runs at module scope, not inside App()

```tsx
// CORRECT — module scope
const webglAvailable = isWebGLAvailable()

export default function App() { ... }
```

This prevents a flicker between Mobile and Desktop on first render. Never move it inside
the component function.

### Rule 3: No Three.js imports in App.tsx or MobileLayout.tsx — ever

`App.tsx` and `MobileLayout.tsx` are in the eagerly-loaded bundle. Any static import from
`three`, `@react-three/fiber`, or `@react-three/drei` in these files puts Three.js (~600KB)
in the initial bundle and defeats the lazy-loading gate.

`DesktopLayout.tsx` is loaded via `React.lazy()` and MAY import Three.js. All 3D code lives
in `DesktopLayout.tsx` or under `src/components/3d/`.

### Rule 4: DesktopLayout is loaded via React.lazy — keep it that way

```tsx
const DesktopLayout = lazy(() => import('@/components/ui/DesktopLayout'))
```

Do not change this to a static import. The `manualChunks` config in `vite.config.ts` relies
on this dynamic import boundary to keep Three.js out of the initial bundle.

### Rule 5: Zustand store — Zustand v5 curried syntax

```ts
export const useStore = create<PortfolioStore>()(
  devtools(
    (set) => ({ ... }),
    { name: 'PortfolioStore' }
  )
)
```

This is the Zustand v5 pattern. Do NOT use the v4 syntax `create<T>()(...)` without the
outer call, and do NOT drop `devtools` middleware — it is how the Redux DevTools extension
shows store state.

**Store shape (do not rename these fields):**
```ts
activePanel: PanelId | null         // 'about' | 'projects' | 'contact' | null
openPanel: (id: PanelId) => void
closePanel: () => void
cameraPreset: CameraPreset          // 'home' | 'projects' | 'about' | 'contact'
setCameraPreset: (preset) => void
cameraTransitioning: boolean
setCameraTransitioning: (v) => void
hoveredObject: string | null
setHoveredObject: (id) => void
```

### Rule 6: vite.config.ts base is locked

`base: '/3d-portfolio/'` must never change after the first GitHub Pages deploy. Changing it
breaks every deployed asset URL (JS chunks, CSS, textures, GLBs).

### Rule 7: manualChunks — keep the three bundles separated

```ts
manualChunks: {
  'vendor-three': ['three'],
  'vendor-r3f': ['@react-three/fiber', '@react-three/drei'],
  'vendor-framer': ['framer-motion'],
}
```

These chunks are separated so:
- `vendor-three` and `vendor-r3f` are never downloaded on mobile (lazy gate)
- `vendor-framer` can be downloaded on mobile for 2D panel animations without pulling
  Three.js
- Each chunk has a stable hash — app code changes don't invalidate Three.js cache

Do not move packages between chunks without understanding the dependency implications.

### Rule 8: Public asset locations

- GLTF/GLB models: `public/models/`
- Textures: `public/textures/`
- Fonts: `public/fonts/`

Reference via absolute paths from the base: `/3d-portfolio/models/desk-draco.glb`. When
using `useGLTF` or `useTexture` from Drei, the path must start with `/3d-portfolio/` to
work on GitHub Pages.

---

## 8. Design Tokens

Defined in `src/styles/variables.css`, imported by `src/styles/globals.css`:

| Variable | Value | Use |
|----------|-------|-----|
| `--color-bg` | `#0a0a0a` | Near-black background |
| `--color-amber` | `#ffb347` | Primary text and UI color |
| `--color-green` | `#39ff14` | Neon green accent |
| `--color-fg` | `#ffb347` | Alias for amber (foreground text) |
| `--font-mono` | `ui-monospace, "VT323", "Courier New", monospace` | Monospace font stack |

Always use `var(--color-bg)` not `#0a0a0a` in inline styles and CSS. The VT323 font file
will be served from `public/fonts/` when it is added.

---

## 9. What NOT To Do

**Never add a static import of three/r3f/drei to App.tsx or MobileLayout.tsx.**
This breaks the entire mobile optimization strategy. There are no exceptions.

**Never change `base` in vite.config.ts.**
The value `/3d-portfolio/` is locked after first deploy.

**Never install react-router-dom.**
Panel switching is state-based (`activePanel` in Zustand). A router adds hash/history
complexity that conflicts with GitHub Pages. There is no need for URL routing in this app.

**Never install react-spring.**
GSAP handles 3D animation. Framer Motion handles 2D overlays. A third animation system
adds bundle weight with no benefit.

**Never use `gh-pages` npm package.**
GitHub Actions handles deployment. The workflow is already configured in `.github/workflows/
deploy.yml`. Running `gh-pages` manually would create a parallel deploy path and cause
confusion.

**Never use `git add .` or `git add -A` for commits.**
Stage only the specific files changed in a task.

**Never use `ScrollTrigger` from GSAP.**
Navigation is click-driven, not scroll-driven. ScrollTrigger on a canvas-heavy page causes
known jank. It is not installed and must not be added.

**Never add physics engines (cannon-es, rapier, etc.).**
This is a static desk scene. No physics simulation is needed or wanted.

**Never add react-router-dom for routing.**
`activePanel` state drives panel display. No URL routing is needed.

---

## 10. Performance Rules

**Bundle splitting:** The `manualChunks` in `vite.config.ts` keeps Three.js out of the
initial bundle. Preserve this. Never import three/r3f in eagerly-loaded files.

**The gate:** `isWebGLAvailable()` called at module scope in `App.tsx` + `React.lazy` on
`DesktopLayout` together guarantee that mobile users never download the Three.js chunk.
Any change that moves `DesktopLayout` to a static import breaks this guarantee.

**Asset compression:** When adding GLB models, compress with Draco before committing:
```bash
npx @gltf-transform/cli draco desk.glb desk-draco.glb
```
Place compressed files in `public/models/`. Point `useGLTF` at the Draco-compressed file.

**Draco decoder:** The Draco WASM decoder must be served from `public/draco/`. Copy the
decoder files there and configure `useGLTF.preload` accordingly when adding GLB assets.

**`AdaptiveDpr` from Drei:** Use this in the Canvas to dynamically lower pixel ratio when
FPS drops. Required for mid-range GPU support.

**`BakeShadows` from Drei:** The desk scene is static — bake shadows once rather than
recomputing every frame. Add `<BakeShadows />` inside Canvas when the scene is stable.

**Load time target:** The 3D experience must be interactive in under 5 seconds on a
standard connection. Monitor chunk sizes with `rollup-plugin-visualizer` if bundle size
becomes a concern.
