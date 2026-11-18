/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REKOD_GURU_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
