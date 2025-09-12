import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
      react(),
      tsconfigPaths()
    ],
    // added in order the package "primeicons" works
    server: {
        fs: {
            // Allow serving fonts from node_modules/.pnpm
            allow: ['..'],
        },
    },
    assetsInclude: ['**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.eot']
})
