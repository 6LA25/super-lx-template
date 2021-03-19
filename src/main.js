import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { callApp } from './assets/utils/plugin'
import 'vant/lib/index.css'; // css暂时没有按需引入
import { Button } from 'vant';
import './index.css'

// 动态引入vconsole
if (location.href.includes('debug=true')) {
  import('vconsole').then((mod) => {
    const vconsole = new mod()
  })
}

const APP = createApp(App)
APP.use(router)
APP.use(store)
APP.use(Button);

// 定义全局Properties
APP.config.globalProperties.$$callApp = callApp
APP.mount('#app')
