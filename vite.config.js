import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function ({ command, mode }) {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  return defineConfig({
    base: './',
    server: {
      host: true,
      port: 9095,
      proxy: {
        '/logicFlow': env.VITE_SERVER_ADDR
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ]
  })
  
}
