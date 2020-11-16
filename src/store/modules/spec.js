

import { reqSpecList } from '../../util/request'

// 初始数据
const state = {
    list: []  //请求回来到数据
}
// 修改数据
const mutations = {
    changeList(state, arr) {
        state.list = arr
    }
}
// 异步操作数据
const actions = {
    requsetSpecList(context) {
        reqSpecList({
            page: 1,
            size: 10
        }).then(res => {
            let arr = res.data.list;
            arr.forEach(item => {
              item.attrs = JSON.parse(item.attrs)
            })
            context.commit('changeList', arr)
            // console.log(arr);
        })
    }
}
// 导出数据
const getters = {
    list(state) {
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    //如果需要导出给index使用，必须添加
    namespaced: true
}