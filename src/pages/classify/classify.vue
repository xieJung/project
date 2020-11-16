<template>
<div>
    <div class="button-classify">
         <el-button type="primary" @click="willAdd">添加</el-button >
    </div>
   
    <v-list @edit='edit($event)'></v-list>
    <v-add :info='info' ref='one'></v-add>
</div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
components:{
    vList,
    vAdd,
 },
data () {
 return {
     data:'123',
     info:{
         isShow:false,
         isAdd:true //显示添加按钮
     }
 }
},
methods:{
    // 点击添加出弹出框
    willAdd(){
        this.info.isShow = !this.info.isShow
        this.info.isAdd =  true
    },
    //编辑
    edit(e){
        console.log(e);  //此时获取的是每一条数据的id
        this.info.isShow = true,
        this.info.isAdd = false
        this.$refs.one.look(e)
    }
},
mounted(){
}
}
</script>
<style scoped>
.button-classify{
  background: white;
  padding: 10px;
  margin: 20px 0;
}
</style>