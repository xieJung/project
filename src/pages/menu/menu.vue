<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" class="button-add" @click="willAdd">添加</el-button>

      <!-- 接收list子组件传来方法 @edit -->
    <v-list @edit ='edit($event)'></v-list>
    <!-- 绑定属性  父子传值 传到info  通过ref ref是  ref加在子组件上，用this.ref获取到的是组件实例，可以使用组件的所有方法也可以获取done元素。-->
    <v-add :info="info" ref="one"></v-add>
  </div>
</template>

<script>

// 引入子组件
import vList from "./components/list.vue";
import vAdd from "./components/add.vue";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        isAdd:true//等于true时候显示添加
      },
    };
  },
  methods: {
    // 定义点击方法
    willAdd() {
      // 点击时  状态取反
      this.info.isShow = !this.info.isShow;
      this.info.isAdd =true
    },
    // 点击时候把方法传给子组件
    edit(e){
       console.log(e)//获取当前id(点击修改时候)
       this.info.isShow=true

      //  点击修改按钮时候  显示修改
       this.info.isAdd =false

      //  通过refs调取add组件look的方法  此时look的id就是e  打印时候 点击某一行的修改 获取e获取的id
      this.$refs.one.look(e)
    }
  },
  mounted() {},
};
</script>

<style scoped>
.button-add {
  margin: 30px 0 20px 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}

</style>