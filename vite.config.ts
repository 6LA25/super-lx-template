import path from 'path';
// import styleImport from 'vite-plugin-style-import';
import vitePluginImp from 'vite-plugin-imp'

// 本地开发运行指令：npm run dev --server=env
// 获取开发环境接口代理地址
const serverPath = process.env.npm_config_server;

import { BASE_URL } from './src/config/global.js'
console.log(BASE_URL)
const pathResolve = (pathStr: string) => {
  return path.resolve(__dirname, pathStr);
};

const config = {
  base: './', // 在生产中服务时的基本公共路径。@default '/'
  alias: {
    '/@/': pathResolve('./src'),
  },
  outDir: 'dist', // 构建输出将放在其中。如果目录存在，它将在构建之前被删除。@default 'dist'
  minify: 'esbuild', // 压缩
  hostname: "localhost", // ip地址
  port: 8090, // 端口号
  open: false, // 是否自动在浏览器打开
  https: false, // 是否开启 https
  ssr: false, //是否服务端渲染
  optimizeDeps: {
    include: ["moment", "echarts", "axios", "mockjs"]
  },
  proxy: {
    '/api': {
      target: BASE_URL[serverPath],
      ws: true,
      changeOrigin: true
    }
  },
  plugins: [
    vitePluginImp({
      libList: [
        {
          libName: 'vant',
          style(name) {
            if (/CompWithoutStyleFile/i.test(name)) {
              // This will not import any style file
              return false
            }
            return `vant/es/${name}/index.css`
          }
        },
      ]
    })
  ]
}

module.exports = config;