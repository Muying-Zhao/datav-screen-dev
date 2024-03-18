import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 整体引入容易增加容量
import datav from 'datav-libs-dev'

// 按需加载找到指定需要的组件
// import datavTestComponent from 'datav-libs-dev/src/components/Test/index'

// 版本为5以下才能这样使用import ECharts from "vue-echarts";
import 'echarts'
import ECharts from 'vue-echarts'

// console.log(ECharts,'ECharts1')
createApp(App)
    .use(store)
    .use(router)
    .use(datav)
    .component('vue-echarts', ECharts)
    .mount('#app')
