import Vue from 'vue'
let vm = new Vue()

// 封装的弹出框（请求成功）
export const alertSuccess=(msg)=>{
vm.$message({
      message:msg,
      type: 'success'
    });
}


   // 封装的弹出框（请求失败）
export const alertwarning=(msg)=>{
    vm.$message({
        message: msg,
        type: 'warning'
      });
    }
       