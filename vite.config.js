// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root:'public',
  build:{
    outDir:'build',
    // rollupOptions:{
    //   input:'public/index.html'
    // }
  },
  // build:{
  //   outDir:'dist',
  //   rollupOptions:{
  //     input: './public/index.html'
  //   }
  // },
  plugins: [react()]
})
