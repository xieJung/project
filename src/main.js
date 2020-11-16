import Vue from 'vue'
import App from './App'
 import router from './router'

//引入ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


Vue.config.productionTip = false

//引入静态公用css
import './assets/css/public.css'

// 导入storo仓库 文件 定义全局
import store from './store/index'

// 引入图标css
 import './assets/font/iconfont.css'

 
// 上传图片添加的前缀
Vue.prototype.$preImg = 'http://localhost:3000'


 // 引入图标js
 import './assets/font/iconfont.js'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
     router,
    components: { App },
    template: '<App/>'
    
})