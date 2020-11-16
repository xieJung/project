<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
   
         <el-form-item label="所属角色" :label-width="width">
                    <el-select v-model="form.roleid" >
                        <el-option value="" label="--请选择--" disabled></el-option>
                        <el-option v-for="item in list" :key="item.id" :label="item.rolename" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
        <el-form-item label="用户名" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd"
          >添加</el-button
        >
        <el-button type="primary" @click="updata" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqUserAdd, reqUserOne, reqUserEdit } from "../../../util/request";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "role/list",
      page: "manger/page",
      total: "manger/total",
    }),
  },
  props: ["info"],
  components: {},
  data() {
    return {
      width: "130px",
      form: {
        roleid: 0,
        username: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    // 关闭弹出
    hide() {
      this.info.isShow = false;
    },
    // 初始化
    empty() {
      this.form = {
        roleid: '',
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加数据到数据库
    add() {
      reqUserAdd(this.form).then((res) => {
        // this.reqRoleList()
        this.hide();
        console.log(this.form.roleid);

        this.requestUserCount();
        // this.getCurrentPage(this.page+1);
        this.requestUserList();
        this.empty()
      });
    },
    ...mapActions({
      reqRoleList: "role/reqRoleList",
      requestUserList: "manger/requestUserList",
      requestUserCount: "manger/requestUserCount",
      getCurrentPage: "manger/getCurrentPage",
    }),
    // 获取一条数据的方法
    look(id) {
      reqUserOne({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.form.password = ''
      });
    },
    // 数据更改
    updata(form) {
      reqUserEdit(this.form).then((res) => {
        this.hide();
        this.requestUserList();
        this.empty()
      });
    },
  },
  mounted() {
    this.requestUserList();
    this.requestUserCount();
    this.requestUserList();
    this.getCurrentPage(this.page);
    
  },
};
</script>
<style scoped>
</style>