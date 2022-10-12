import Vue from 'vue'
import App from './App.vue'
import '@/styles/index.less'
import Vant from 'vant'
import router from '@/router/index.js'
import store from '@/store/index'
// 加在全局样式
import 'vant/lib/index.css'

// 根据视口大小动态设置rem值
import 'amfe-flexible'

import '@/utils/dayjs'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
