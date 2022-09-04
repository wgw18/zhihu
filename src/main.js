import Vue from 'vue'
import App from './App.vue'
import '@/config/rem'
import '@/assets/icon/iconfont.css'
import router from './router';
import store from './store'
import { InfiniteScroll } from 'mint-ui'

Vue.use(InfiniteScroll)



Vue.config.productionTip = false

const vm = new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')