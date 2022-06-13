import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// postcss
import postcssPresetEnv from 'postcss-preset-env'
// https://github.com/antfu/unplugin-icons
import Icons from 'unplugin-icons/vite'
// node
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Icons()
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
        }) as any
      ]
    }
  }
})
