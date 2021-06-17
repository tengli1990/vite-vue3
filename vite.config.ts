import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src/')
    }
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: false
  },
  build: {
    assetsInlineLimit: 10240,
    cleanCssOptions: {
      level: 2
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      plugins: [],
      output: {
        manualChunks (id) {
          if (id.includes('node_modules')) {
            if (id.includes('ant-design-vue')) {
              return 'antDesignVue'
            } else if (id.includes('moment')) {
              return 'moment'
            } else {
              return 'lib'
            }
          }
        }
      }
    }
  },
  plugins: [
    vue(),
    // gzip压缩
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz'
    })

  ],
  css: {
    preprocessorOptions: {
      less: {
        // additionalData: `$injectedColor: orange;`
        javascriptEnabled: true
      }
    }
  }
})
