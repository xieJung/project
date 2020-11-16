<template>
  <div>
    <el-dialog title="菜单添加" :visible.sync="info.isShow" @opened='createEditor'>
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change='changeCate'>
            <el-option label="请选择" :value='0' ></el-option>
            <!-- 循环添加的数据 -->
            <el-option
              v-for="item in classifylist"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value='0'></el-option>
            <!-- 循环添加的数据 -->
            <el-option
              v-for="item in secondCate"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" :label-width="width">
          <!-- 上传图片 -->
          <el-upload class="avatar-uploader" action="#" :on-change="changeImg">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

         <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="请选择" @change='changeSpec'>
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option
              v-for="item in speclist"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="规格属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" :value="0"></el-option>
            <!-- 循环添加的数据 -->
            <el-option v-for="item in secondSpec" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" :label-width="width">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="是否热卖" :label-width="width">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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

        <el-form-item label="商品描述" :label-width="width">
          <!-- <textarea name="" id="" cols="30" rows="10" v-model='form.description'></textarea> -->
          <!-- 富文本编辑器 -->
          <div id="div1" v-if="info.isShow"></div>
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
import E from "wangeditor"
import {
  reqGoodsAdd,
  reqGoodsOne,
  reqGoodsEdit,
} from "../../../util/request";
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      classifylist: "classify/list",
      speclist: "spec/list",
    }),
  },
  components: {},
  data() {
    return {
      // isShow:true,
      // 二级商品
      secondCate:[],
      // 二级规格属性
      secondSpec:[],
      form: {
        first_cateid: 0,
        second_cateid: 0,
        goodsname:'',
        price:0,
        market_price:0,
        img: null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      },
      width: "140px",
      imageUrl: "",
    };
  },
  methods: {

    // 通过一级分类获取对应的二级分类的数据
    changeCate(){
      // 箭头函数中的返回值如果用{}包起来，那么必须要写return 
        this.secondCate = this.classifylist.find(item=>{return item.id==this.form.first_cateid}).children
        // console.log(this.secondCate);
        
    },

    changeSpec(){
      // 箭头函数中的返回值如果用{}包起来，那么必须要写return 
        this.secondSpec= this.speclist.find(item=>{return item.id==this.form.specsid}).attrs
        console.log(this.secondSpec);
        
    },

    // 创建富文本编辑器
    // changeEditor(){
    //     const editor = new E('#div1')
    //     editor.create()
    //     // 给富文本编辑器赋值
    //   //  this.editor.txt.html(this.form.description)
    // },
    createEditor(){
     this.editor = new E('#div1')
      this.editor.create()
      // 把获取的内容赋值给富文本
      this.editor.txt.html(this.form.description)
    },


  ...mapActions({
      requsetClassifyList: "classify/requsetClassifyList",
       requsetSpecList: "spec/requsetSpecList",
       requsetGoodsList:'goods/requsetGoodsList'
    }),
    //  让弹框隐藏
    hide() {
      this.info.isShow = false;
    },
    // 重置数据
    empty() {
      this.form = {
       first_cateid: 0,
        second_cateid: 0,
        goodsname:'',
        price:0,
        market_price:0,
        img: null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      };
    },

    // 上传图片
    changeImg(e) {
      console.log(e);
      var file = e.raw;
      this.imageUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //   添加数据到数据库
    add() {
     console.log(this.form)
        // 获取富文本内容给提交给后台的参数赋值
      this.form.description = this.editor.txt.html()
      // this.form.specsattr = JSON.stringify(this.secondCate)
      reqGoodsAdd(this.form).then((res) => {
        this.hide();
        this.requsetGoodsList();
        // 数据重置
        this.empty();
      });
    },
  
    // 获取一条数据
    look(id) {
      reqGoodsOne({ id: id }).then((res) => {
        this.form = res.data.list;
        // 目的就是为了更新数据的时候获取id
        this.form.id = id;
        console.log(res.data.list.img);
        this.imageUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(',')
        // this.editor.txt.html(this.form.description)
      });
    },
    updata(form) {
      // 获取富文本内容给提交给后台的参数赋值
      this.form.description = this.editor.txt.html()
      reqGoodsEdit(this.form).then((res) => {
        this.hide();
        this.requsetGoodsList();
        // 重置数据
        this.empty();
      });
    },
  },
  mounted() {
    if(this.classifylist.length==0){
      this.requsetClassifyList();
    }
 
    this.requsetSpecList()
    console.log(this.form);
    this.requsetGoodsList
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