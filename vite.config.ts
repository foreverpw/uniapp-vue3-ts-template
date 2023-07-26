import { defineConfig, ConfigEnv, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import eslintPlugin from 'vite-plugin-eslint' //导入包
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const pathSrc = resolve(__dirname, 'src')


// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  console.log(env.VITE_API_PROXY_URL);

  return {
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        '~/': `${resolve(__dirname, 'src')}/`,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/styles/mixins/_index.scss" as *;
          `,
        },
      },
    },
    plugins: [
      uni(),
      eslintPlugin({
        include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
      }),
      AutoImport({
        dirs: ['src/composables', 'src/shared'],
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ['vue', '@vueuse/core'],

        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },

        dts: resolve(pathSrc, 'types/auto-imports.d.ts'),
      }),
      Components({
        dirs: ['src/components'],
        extensions: ['vue', 'tsx'],
        dts: resolve(pathSrc, 'types/components.d.ts'),
      }),
    ],
    server: {
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: env.VITE_API_PROXY_URL,
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
