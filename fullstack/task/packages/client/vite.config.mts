import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import { default as tailwindcss } from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), tsconfigPaths(), tailwindcss()],
    
});
