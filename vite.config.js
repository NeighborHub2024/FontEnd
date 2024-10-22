import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import imp from 'vite-plugin-imp'; 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imp({
      libs: [
        {
          libName: 'antd',
          style: (name) => `antd/es/${name}/style`,
        },
      ],
    }),
  ],
});
