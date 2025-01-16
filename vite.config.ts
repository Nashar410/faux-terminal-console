import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { componentTagger } from "lovable-tagger";

export default defineConfig({
  // Mettez ici le nom de votre dépôt GitHub si vous déployez
  // sur https://<username>.github.io/<nom-du-depot>/
  base: '/faux-terminal-console/',

  plugins: [
    // Plugin React (via SWC) pour gérer JSX, etc.
    react(),
  ],
})
