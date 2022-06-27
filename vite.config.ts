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

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __VUE_OPTIONS_API__: false
  },
  plugins: [
    vue({
      reactivityTransform: true
    }),
    Icons({
      customCollections: {
        custom: FileSystemIconLoader('./src/assets/svg', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@stores': path.resolve(__dirname, 'src/stores'),
      '@network': path.resolve(__dirname, 'src/network'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@util': path.resolve(__dirname, 'src/utilities')
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
