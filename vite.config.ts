import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({

  server: {
    // "host: '::'" permet d'exposer le serveur en IPv4 et IPv6.  
    // Tu peux le remplacer par "localhost" ou "0.0.0.0" si tu préfères.  
    host: "::",
    // Change le port par défaut (5173) en 8080.  
    port: 8080,
  },

  build: {
    // Dossier de sortie (par défaut "dist").  
    outDir: 'dist',
    rollupOptions: {
      input: {
        // Définit le point d’entrée de l’app.  
        // Par défaut, Vite détecte déjà "index.html", mais tu peux le préciser.  
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // "manualChunks: undefined" indique que Vite ne fera pas de découpage  
        // automatique en chunks (code-splitting).  
        manualChunks: undefined,
      },
    },
    // Nom du dossier où se trouveront tes assets (CSS, images, etc.)  
    assetsDir: 'assets',
    // Désactive la génération de sourcemaps  
    sourcemap: false,
    // Utilise "terser" pour minifier en production, et pas de minification en dev.  
    minify: mode === 'production' ? 'terser' : false,
  },

  plugins: [
    // Plugin React (version SWC) : nécessaire pour un projet React  
    react(),
    // N’active "componentTagger()" qu’en mode développement  
    // (utile si tu veux tagger/traquer des composants pour du debug).  
    mode === 'development' && componentTagger(),
  ].filter(Boolean),

  resolve: {
    // Alias "@" -> "./src", pratique pour importer tes modules :  
    // import MonFichier from "@/components/MonFichier"  
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    // Gère l’ordre et la liste des extensions que Vite va résoudre  
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },

  optimizeDeps: {
    // Cible ES2020 pour la compilation.  
    esbuildOptions: {
      target: 'es2020',
    },
  },
}));
