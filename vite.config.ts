import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '@assets': '/src/assets',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@router': '/src/router',
      '@routes': '/src/routes',
      '@store': '/src/store',
      '@utils': '/src/utils',
      '@hooks': '/src/hooks',
      '@layouts': '/src/layouts',
      '@context': '/src/context',
      '@modules': './src/modules',
      '@variables': '/src/variables',
      '@providers': '/src/providers',
    },
  },
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
