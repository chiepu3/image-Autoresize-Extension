import { crx, defineManifest } from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const manifest = defineManifest({
    manifest_version: 3,
    name: "Image Resize Extension",
    version: "1.0.0",
    description: "Resize images automatically",
    permissions: ["storage", "contextMenus", "downloads", "activeTab"],
    host_permissions: ["<all_urls>"],
    action: {
      default_popup: "index.html",
    },
    background: {
      service_worker: "background.js",
    },
  });

  return {
    plugins: [react(), crx({ manifest })],
    build: {
      outDir: mode === "production" ? "dist" : "dev",
    },
  };
});
