import WindiCSS from 'vite-plugin-windicss'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), WindiCSS()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'trevio-ui',
      // the proper extensions will be added
      fileName: 'ui'
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'vee-validate'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})