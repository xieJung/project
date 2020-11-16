<template>
  <div class="centre">
     <div class="cenbox">
        <img src="../../assets/img/logo.png" alt=""><span>VUE后台登录</span>
      </div>
    <div class="box">
      <h2>用户登录</h2>
        <div>
          <input type="text" name="" id="" placeholder="请输入账户" v-model='user.username'>
        </div>
         <div>
          <input type="password" name="" id="" placeholder="请输入密码" v-model='user.password'>
        </div>
        <div>
          <button @click="register">登录</button>
        </div>
    </div>
  </div>
</template>

<script>
import {reqUserLogin} from '../../util/request'
import {mapActions,mapGetters}  from 'vuex'
export default {
    comments:{},
    data(){
      return {
         user:{
        username:'',
        password:'',
      }
      }
    },
    methods:{
      ...mapActions({
      requsetUserLogin:'user/requsetUserLogin',
    }),
    // 登录
    register(){
          reqUserLogin(this.user).then(res=>{
              this.requsetUserLogin(res.data.list)
              this.$router.push('/index')
          })
    }
    },
    mounted(){}
}
</script>

<style scoped>
.centre{
  margin: 0;
	font-family: "Exo", sans-serif;
	color: #333;
	background: linear-gradient(-45deg, #ee9175, #3ca3e7, #fdcbf1, #f8bcf3);
	background-size: 400% 400%;
	animation: gradientBG 7s ease infinite;
  width: 100vw;
  height: 100vh;
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
.centre .box{
  width: 380px;
  height: 290px;
  background: white;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  text-align: center;
  overflow: hidden;
  border-radius: 10px;
}
.centre input{
  width: 70%;
  height: 34px;
  border: 1px solid #eee;
  margin-top: 30px;
  text-indent: 10px;
}
.centre button{
  width: 70%;
  height: 38px;
 background: #3ca3e7;
}
.centre input:focus{
       border-color: #2d88ff !important;
　　　　outline: 0;
　　　　-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(64, 43, 255, 0.6);
　　　　box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(43, 128, 255, 0.6);
       transition: all .8s linear;
       
}
.centre button{
  margin-top: 30px;
  color: white;
}
.centre h2{
  margin-top: 30px;
}
.cenbox{
    z-index: 2;
    position: absolute;
    left: 10px;
    display: flex;
    border-radius: 50%;
    margin: 10px;
    align-items: center;
   
}
.cenbox img{
  width: 30px;
  height: 30px;
}
.cenbox span{
    font-family: emoji;
    letter-spacing: 5px;
    color: #ffffff;
    font-weight: 700;
    margin-left: 10px;
}

</style>