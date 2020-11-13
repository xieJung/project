<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" :value="0" disabled></el-option>
            <!-- 循环添加数据 -->
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

          <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添 加</el-button
        >
        <el-button type="primary" @click="undata" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入添加删除方法
import { reqRoleAdd, reqRoleOne, reqRoleEdit } from "../../../util/request";

// 获取vuex仓库数据  渲染页面
import { mapGetters, mapActions } from "vuex";
export default {
  // 结构数据
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
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
        status: 1,
      },
    };
  },
  methods: {
    //   关闭弹框
    hide() {
      this.info.isShow = false;
    },
    // 添加数据
    add() {
      console.log(this.form);
      reqRoleAdd(this.form).then((res) => {
        //添加后刷新列表
        this.reqRoleList();
        // 添加完数据后关闭
        this.hide();
      });
    },

    // 获取列表数据(获取菜单名称) 打印到树形选择
    ...mapActions({
      reqMenuList: "menu/reqMenuList",
      reqRoleList: "role/reqRoleList",
    }),

    // 获取一条数据方法
    look(id) {
      reqRoleOne({ id: id }).then((res) => {
        // 点击获取list数组
        this.form = res.data.list;
        // 得到树形menus 转成数组  再赋值给 this.form.menus

        // 接口文档需要获取ID
        this.form.id = id;
      });
    },

    // 修改数组
    undata(form) {
      reqRoleEdit(this.form).then((res) => {
        this.hide(), this.reqRoleList();
      });
    },
  },
  mounted() {
    this.reqMenuList();
  },
};
</script>

<style scoped>
</style>