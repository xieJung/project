// 引入接口函数
import {reqRoleList} from '../../util/request'

// 初始化数据
const state ={
    list:[]//请求回来的数据
}
// 修改数据
const mutations ={
    changeList(state,arr){
        //把修改的数据赋值到数据中
        state.list = arr
    }
}
// 异步操作
const actions={
    reqRoleList(context){
        // istree:true是文档说要传的参数
        reqRoleList().then(res=>{
            context.commit('changeList',res.data.list)
        })
      
    }
}
// 导出数据
const getters ={
    list(state){
        return state.list
    }
}

// 全部抛出
export default {
    state,
    mutations,
    actions,
    getters,
    // 如果需要导出给仓库storo的index使用 这句话必须要加 这是一个新的组件空间 
    namespaced:true
}
