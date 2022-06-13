import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// postcss
import postcssPresetEnv from 'postcss-preset-env'
// https://github.com/evrone/postcss-px-to-viewport
import postcsspxtoviewport from 'postcss-px-to-viewport'
// https://github.com/antfu/unplugin-icons
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// node
import path from 'path'
// import fs from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Icons({
      customCollections: {
        custom: FileSystemIconLoader('src/assets/svg')
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@views': path.resolve(__dirname, 'src/views/')
    }
  },
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 1
        }) as any,
        postcsspxtoviewport({
          viewportWidth: 750
        })
      ]
    }
  }
})
