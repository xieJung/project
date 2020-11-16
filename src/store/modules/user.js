

// 初始数据
const state={
    list: sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):{} //登录请求回来到数据
}   
// 修改数据
const mutations={
    changeList(state,obj){
        state.list=obj
        // 同时把获取回来的数据存储到sessionstorage中
        sessionStorage.setItem('list',JSON.stringify(obj))
    }
}
// 异步操作数据
const actions={
    requsetUserLogin(context,obj){
        context.commit('changeList',obj)   
    }
}
// 导出数
const getters={
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    //如果需要导出给index使用，必须添加
    namespaced:true 
}