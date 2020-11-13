<template>
  <div>
    <el-dialog title="菜单添加" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 菜单分类 -->
        <el-form-item label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 循环添加数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <!-- 菜单类型 -->
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>

        <!-- 如果菜单类型type值等于1 那就显示这个 -->
        <el-form-item
          label="菜单图标"
          :label-width="formLabelWidth"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option label="回收站" value="el-icon-delete-solid">
              <i class="el-icon-delete-solid">回收站</i>
            </el-option>
            <el-option label="收藏" value="el-icon-star-on">
              <i class="el-icon-star-on">收藏</i>
            </el-option>
            <el-option label="购物" value="el-icon-s-goods">
              <i class="el-icon-s-goods">购物</i>
            </el-option>
            <el-option label="电脑" value="el-icon-s-platform">
              <i class="el-icon-s-platform">电脑</i>
            </el-option>
            <el-option label="门店" value="el-icon-s-shop">
              <i class="el-icon-s-shop">门店</i>
            </el-option>
          </el-select>
        </el-form-item>

        <!-- 如果菜单类型type值等于0 那就显示这个 -->
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <!-- 通过for循环  循环路由  获取他们的路由  名字 -->
            <el-option :value="'/' + item.path" v-for="item in indexRouters" :key="item.path" :label="item.name"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 绑定属性  字符串数字变num的数字 -->
            <el-switch  v-model="form.status"  active-color="#13ce66" inactive-color="#ff4949" :active-value="1"   :inactive-value="2">
                </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if = 'info.isAdd'>添 加</el-button>
         <el-button type="primary" @click="updata(form)" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 引入路由 获取name的值
import { indexRouters} from "../../../router/index";
// 引入接口函数
import { menuAdd,reqMenuOne,reqMenuEdit} from "../../../util/request";
// 解构数据
import {mapActions,mapGetters} from 'vuex'

export default {
  // 通过menu组件传来的info接收
  props: ["info"],
    computed:{
      ...mapGetters({
        list:'menu/list'
      })
    },

  components: {},
  data() {
    return {
      // info父组件已经定义了 而且传到子组件了  所以注销
      // isShow:true,
      // 因为上面有定义了from 不给他们初始值  他们会不出来
      form: {
        pid: 0, //上级分类  顶级菜单默认是0
        title: "", //菜单名称
        icon: "", //菜单图标
        type: 1, //类型和目录
        url: "", //菜单地址
        status: 1, //状态   1正常2禁用   number类型
      },
      // 上面有定义这个  这个是文字距离边框距离
      formLabelWidth: "100px",
       // 路由赋值  通过上面for获取路由的name
      indexRouters: indexRouters,
    };
  },
  methods: {
    ...mapActions({
      // 获取请求列表
       reqMenuList:'menu/reqMenuList'
    }),

 // 重置数据
        empty(){
              this.form.pid=0,
              this.form.title='',
              this.form.icon='',
              this.form.type=1,
              this.form.url='',
              this.form. status=1
        },
    //   先定义一个隐藏的方法 让其弹出框隐藏
    hide() {
      // 这个父组件过来的  调用父组件隐藏 除了自己绑定  你还要加this
      this.info.isShow = false;
    },

    // 发送请求 把输入信息传到数据库里面 拿出结果 添加数据
    add() {
      menuAdd(this.form).then(res=>{
                this.hide()
                // 点击时候  自动触及列表刷新
                this.reqMenuList()
                // 添加完成后清空数据
               this.empty()
      })
    },

    // 获取一条数据
    look(id){
      reqMenuOne({id:id}).then(res=>{
            this.form = res.data.list;
             // 目的就是为了更新数据的时候获取id
            this.form.id = id;
      })
    },

  // 点击修改按钮  修改里面数据然后在更新上去   所以这是更新数据
    updata(form){
          reqMenuEdit(this.form).then(res=>{
                this.hide()
                this.reqMenuList()
                // 修改完成后清空数据
                 this.empty()
          })
        }
   
  },
  mounted() {},
};
</script>

<style>
</style>