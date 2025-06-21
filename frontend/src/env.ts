/* interface ImportMetaNev {
  readonly VITE_BRAND_NAME: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} */

export const env = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  BRAND_NAME: import.meta.env.VITE_BRAND_NAME,
};
