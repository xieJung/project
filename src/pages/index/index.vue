<template>
  <div>
    <el-container>
      <el-aside width="auto">
        <div class="toggle-button" @click="logout">
          <i class="el-icon-s-operation">伸缩</i>
        </div>
        <el-menu
          default-active="/index/home"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          router
          :collapse="isCollapse"
          unique-opened
          text-color="#fff"
          background-color="#303133"
          @close="handleClose">
          <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group> -->

          <el-menu-item index="/index/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

      <div v-for='item in list.menus' :key='item.id'>
          <el-submenu :index="'/index'+item.url" v-if="item.children">
            <template slot="title">
              <i class="el-icon-s-custom"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="'/index'+i.url" v-for='i in item.children' :key='i.id'>{{i.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item  v-else  :index="item.url">{{item.title}}</el-menu-item>
      </div>
            <!-- <el-menu-item index="/index/menu">
              <i class="el-icon-s-fold"></i>
              <span>菜单管理</span>
            </el-menu-item> -->
            <!-- <el-menu-item index="/index/role">
              <i class="el-icon-user-solid"></i>
              <span>角色管理</span>
            </el-menu-item>
            <el-menu-item index="/index/manger">
              <i class="el-icon-s-custom"></i>
              <span>管理员管理</span>
            </el-menu-item>
          </el-submenu> -->
          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/index/classify">
                <i class="el-icon-menu"></i>
                <span>商品分类</span>
              </el-menu-item>
              <el-menu-item index="/index/spec">
                <i class="el-icon-s-data"></i>
                <span>商品规格</span>
              </el-menu-item>
              <el-menu-item index="/index/goods">
                <i class="el-icon-s-order"></i>
                <span>商品管理</span>
              </el-menu-item>
              <el-menu-item index="/index/vip">
                <i class="el-icon-star-on"></i>
                <span>会员管理</span>
              </el-menu-item>
              <el-menu-item index="/index/banner">
                <i class="el-icon-s-marketing"></i>
                <span>轮播图管理</span>
              </el-menu-item>
              <el-menu-item index="/index/seckill">
                <i class="el-icon-s-opportunity"></i>
                <span>秒杀商品</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
           </el-menu>
        </el-aside>
      <el-container>
        <el-header>
           <div class="topBox">
            <div class="boxLeft"><span class="boxLefttext">{{list.username}}</span></div>
            <div  class="boxLeft"><el-button type="primary" @click="quit" id="boxLeftbutton">退出</el-button></div>
          </div>
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <!-- <i v-else class="iconfont iconfont-ico">&#xe60f;</i> -->
          </el-upload>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->

          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <!--通过{{$route.name}}在路由自动获取name-->
            <el-breadcrumb-item>{{ $route.name }}</el-breadcrumb-item>
          </el-breadcrumb>

          <div>
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list:'user/list'
    })
  },
  components: {},
  data() {
    return {
      isCollapse: false,
      imageUrl: "",
    };
  },
  methods: {
// 接收获取的值
    ...mapActions({
      requsetUserLogin:'user/requsetUserLogin'
    }),
    // 退出操作
    quit(){
      // 这是情况sessionStorage
      this.requsetUserLogin({})
      this.$router.push('/register')
    },


    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      this.isCollapse = !this.isCollapse;
    },

    // 头像方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  mounted() {
    console.log(this.list)
  },
};
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  width: auto;
  height: 100vw;
  background: #303133;
}
.el-menu {
  border-right: none;
  
}
.toggle-button {
  background: #666;
  font-size: 14px;
  line-height: 50px;
  color: white;
  text-align: center;
  height: 50px;
  cursor: pointer;
  letter-spacing: 10px;
}

.el-header {
  /* background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%); */
 margin: 0;
	font-family: "Exo", sans-serif;
	color: #333;
	background: linear-gradient(-45deg, #757dee, #9ed8ff, #ffbff0, #fae46a);
	background-size: 400% 400%;
	animation: gradientBG 8s ease infinite;
  color: #999;
  text-align: center;
  line-height: 60px;
}
@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
.el-aside {
  background: #303133;
  color: #333;
  text-align: center;
  line-height: 20px;
  height: auto;
}
#boxLeftbutton{
  position: absolute;
    right: 22px;
    top: 9px;
}

/* 设置滚动条样式 */

 /*滚动条样式*/
 .el-aside::-webkit-scrollbar {
            width: 4px;    
            /*height: 4px;*/
        }
.el-aside::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
        }
.el-aside::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    border-radius: 0;
   background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
        }



.el-main {
  background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
  line-height: 20px;
  min-height: 90vh;
}
.el-menu-item * {
  vertical-align: middle;
  font-size: 14px;
}
.el-avatar--icon {
  margin-top: 10px;
}

/* 头像 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: white;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background: white;
}
.avatar {
  width: 40px;
  height: 40px;
  display: block;
  border-radius: 50%;
  margin-top: 10px;
}
.el-upload {
  display: inline-block;
  text-align: center;
  cursor: pointer;
  outline: 0;
  width: 40px;
  margin-top: 10px;
  height: 40px;
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 28px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.iconfont-ico{
  color: white;
}
.boxLefttext{
  color: white;
  right: 110px;
  position: absolute;
}

</style>