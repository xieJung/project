import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 把全部需要的仓库放在modules这个文件夹建成独立仓库  再把他们导入出来
import menu from './modules/menu'
import role from './modules/role'
import manger from './modules/manger'
import goods from './modules/goods'
import spec from './modules/spec'
import classify from './modules/classify'
import user from './modules/user'
// 到出去
export default new Vuex.Store({
    modules:{
        menu,
        role,
        manger,
        goods,
        spec,
        classify,
        user
    }
})
   