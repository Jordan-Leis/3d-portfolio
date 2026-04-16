/// <reference types="vite/client" />

interface ImportMetaEnv {
  // CONT-01 — Formspree form ID (8+ char alphanumeric). Example: 'mrgzvnpe'.
  // Safe to expose in the bundle; appears in every form submission.
  readonly VITE_FORMSPREE_FORM_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
