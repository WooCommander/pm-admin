import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    strictPort: false,
  },
  // tir-pm-* публикуются как сырые .ts/.vue — без предбандла Vite раздаёт
  // исходники по одному, esbuild стирает типы и реэкспорт
  // `export { ITirPmFooStyleVars }` в рантайме оказывается «без значения».
  // Перечисляем используемые пакеты явно, чтобы esbuild собрал каждый в чанк.
  optimizeDeps: {
    include: [
      'tir-pm-button',
      'tir-pm-input',
      'tir-pm-toolkit',
      'tir-style-system',
    ],
    esbuildOptions: {
      target: 'es2020',
    },
  },
});
