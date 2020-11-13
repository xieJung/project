<template>
  <div>
    <div class="button-role">
      <el-button type="primary" @click="addRole">添加</el-button>
    </div>
    <v-add :info='info' ref="one"></v-add>
    <!-- edit($event)可修改点击获取它本身内容 -->
    <v-list @edit='edit($event)' ></v-list>
  </div>
</template>

<script>

// 引入子组件
import vAdd from './comonents/add'
import vList from './comonents/list'

export default {
    components:{
      vAdd,
      vList,
    },
    data(){
      return {
        info:{
          isShow:false,
          isAdd:true,//设置当前状态是添加
          title:'角色添加'
        }
      }
    },
    methods:{

      // 添加角色
        addRole(){
          // 显示隐藏取反
          this.info.isShow=!this.info.isShow
          this.info.isAdd =true,
          // 点击添加按钮时候  显示角色添加  切记在谁上面加的
          this.info.title='角色添加'
        },
        // 点击修改时候触发 弹出框显示
        edit(id){
            this.info.isShow=true
            // 点击修改时候  当前添加状态true变成false  变成修改
            this.info.isAdd =false,
          // 点击修改按钮时候  当前添加状态“角色添加”变成“角色修改”  变成修改
             this.info.title='角色修改'

          //  通过refs调取add组件look的方法  此时look的id就是e  打印时候 点击某一行的修改 获取e获取的id
           this.$refs.one.look(id)
        }

    },
    mounted(){}
}
</script>

<style scoped>
.button-role{
  background: white;
  padding: 10px;
  margin: 20px 0;
}
</style>