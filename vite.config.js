import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

export default defineConfig({
  plugins: [react()],
  commonjsOptions: {
    include: [/node_modules/],
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      src: path.resolve(__dirname, "./src"),
      // eslint-disable-next-line no-undef
      react: path.resolve(__dirname, 'node_modules/react'),
    },
    dedupe: ["react", "react-dom"]
  },
  optimizeDeps: {
    include: ["react", "react-dom", "@chakra-ui/react", "@chakra-ui/utils", "@emotion/react", "@emotion/styled", "framer-motion", "react-redux"],
  },
  ssr: {
    noExternal: ["@chakra-ui/react", "@chakra-ui/utils", "@emotion/react", "@emotion/styled", "framer-motion", "redux-persist"]
  },
  server: {
    port: 3000
  }
})
