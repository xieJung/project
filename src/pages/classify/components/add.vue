<template>
  <div>
    <el-dialog title="菜单添加" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="上级分类" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
             <el-option v-for='item in list' :key='item.id' :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="width">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <!-- 上传图片 -->
          <el-upload
            class="avatar-uploader"
            action="#"
            :on-change="changeImg"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

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
        <el-button type="primary" @click="updata(form)" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqClassifyAdd, reqClassifyOne, reqClassifyEdit } from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list:'classify/list'
    })
  },
  components: {},
  data() {
    return {
      // isShow:true,
      form: {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      },
      width: "140px",
      imageUrl:''
    };
  },
  methods: {
    //  让弹框隐藏
    hide() {
      this.info.isShow = false;
    },
    // 重置数据
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: null,
        status: 1,
      };
    },

    // 上传图片
    changeImg(e){
      console.log(e);
      var file = e.raw
      this.imageUrl = URL.createObjectURL(file)
      this.form.img = file
    },





    //   添加数据到数据库
    add() {
      reqClassifyAdd(this.form).then((res) => {
        this.hide();
        this.requsetClassifyList();
        // 数据重置
        this.empty();
      });
    },
    ...mapActions({
      requsetClassifyList: "classify/requsetClassifyList",
    }),
    // 获取一条数据
    look(id) {
      reqClassifyOne({ id: id }).then((res) => {
        this.form = res.data.list;
        // 目的就是为了更新数据的时候获取id
        this.form.id = id;
        console.log(res.data.list.img)
        this.imageUrl = this.$preImg+res.data.list.img
      });
    },
    updata(form) {
      reqClassifyEdit(this.form).then((res) => {
        this.hide();
        this.requsetClassifyList();
        // 重置数据
        this.empty();
      });
    },
  },
  mounted() {
    this.requsetClassifyList()
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    border: 1px dashed #ccc;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>