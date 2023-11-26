import react from '@vitejs/plugin-react';
import ssr from 'vike/plugin';
import path from 'path';

export default {
  plugins: [react(), ssr()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
};
