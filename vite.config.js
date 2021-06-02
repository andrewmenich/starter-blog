import legacy from '@vitejs/plugin-legacy'
import ViteRestart from 'vite-plugin-restart';

// https://vitejs.dev/config/
export default ({ command }) => ({
  base: command === 'serve' ? '' : '/assets/dist/',
  publicDir: './web/',
  build: {
    manifest: true,
    outDir: './web/assets/dist/',
    rollupOptions: {
      input: {
        app: './src/index.js',
      }
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    ViteRestart({
      reload: [
        './templates/**/*',
      ],
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    https: false,
    hmr: {
      host: 'starter-blog.test',
      port: '3000',
      path: '/'
    }
  },
});
