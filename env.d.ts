/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PATH_API: string;
    // otras variables de entorno que necesites
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  