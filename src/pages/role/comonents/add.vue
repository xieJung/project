<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="角色名称名称" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" :label-width="formLabelWidth">
            <!-- 通过data选择list label是打印的  打印title  菜单名称名字 -->
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-expanded-keys="[2, 3]"
            :default-checked-keys="[5]"
            :props="{children: 'children',label: 'title'}"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch v-model="form.status" :active-value="1"  :inactive-value="2"> </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
            <el-button type="primary" @click="undata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

//引入添加删除方法 
import {reqRoleAdd,reqRoleOne,reqRoleEdit} from '../../../util/request'

// 获取vuex仓库数据  渲染页面
import {mapGetters,mapActions} from 'vuex'
export default {
    // 结构数据
    computed:{
        ...mapGetters({
            list:"menu/list"
        })
    },

  // 接收父级传来的值
  props: ["info"],

  components: {},
  data() {
    return {
      // 对话框宽度
      formLabelWidth: "140px",
      form: {
        rolename: "",
        menus: [],
        status:1
      },
     
    };
  },
  methods: {
    //   关闭弹框
      hide(){
        this.info.isShow = false
      },
    // 添加数据
      add(){
        // 获取节点  并赋值给form 接口要字符串数组所以转一下字符串
        this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys()) 
        console.log(this.form);
        reqRoleAdd(this.form).then(res=>{
        //添加后刷新列表 
        this.reqRoleList()
        // 添加完数据后关闭
         this.hide() 
        })
      },

    // 获取列表数据(获取菜单名称) 打印到树形选择
    ...mapActions({
        reqMenuList:'menu/reqMenuList',
        reqRoleList:'role/reqRoleList'
    }),

    // 获取一条数据方法
    look(id){
      reqRoleOne({id:id}).then(res =>{
        // 点击获取list数组
        this.form = res.data.list

        // 这里获取是数组字符串形式，它无法这样识别  通过key自带设置  并且转成数组JSON.parse
          // this.form.menus = res.data.list.menus
       
       // 得到树形menus 转成数组  再赋值给 this.form.menus
          // this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
          this.form.menus =   this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
          // 接口文档需要获取ID
          this.form.id=id
      })
    },

    // 修改数组
    undata(form){
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleEdit(this.form).then(res=>{
          this.hide(),
          this.reqRoleList()
      })
    }
  },
  mounted() {
      this.reqMenuList()
  },
};
</script>

<style scoped>
</style>