import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import idleWarmup from '../src';

// change this to see the difference
const ENABLED = true;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default defineConfig({
  plugins: [
    {
      name: 'artificial-slowdown',
      async transform(_, id) {
        if (id.includes('foo') || id.includes('BarComp')) {
          await wait(2000);
        }
      },
    },
    vue(),
    ENABLED && idleWarmup({ files: ['./src/foo.ts', './src/BarComp.vue'] }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
