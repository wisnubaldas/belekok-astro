// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';

// Configure Astro for SSR using the Node adapter and enable React components.
export default defineConfig({
  output: 'server',
  integrations: [react()],
  adapter: node({
    mode: 'standalone',
  }),
  vite: {
    resolve: {
      alias: {
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@js': '/src/js',
        '@scss': '/src/scss',
        '@vendor': '/src/vendor',
        '@lib': '/src/lib',
      },
    },
  },
});
