

import {reqClassifyList} from '../../util/request'

// 初始数据
const state={
    list:[]  //请求回来到数据
}   
// 修改数据
const mutations={
    changeList(state,arr){
        state.list=arr
    }
}
// 异步操作数据
const actions={
    requsetClassifyList(context){
        reqClassifyList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
        })        
    }
}
// 导出数据
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