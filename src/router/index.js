import Vue from 'vue'
import Router from 'vue-router'
 import store from '../store/index.js'

Vue.use(Router)


const register =() => import('../pages/register/register')//登录
const home = () => import('../pages/home/home')//默认首页
const index = () => import('../pages/index/index') //首页
const menu =() => import('../pages/menu/menu')//菜单管理
const classify =() => import('../pages/classify/classify')//商品分类
const role = () => import('../pages/role/role')//角色管理
const manger =() => import('../pages/manger/manger')//管理员管理
const spec = () => import('../pages/spec/spec')//商品规格
const goods = () => import('../pages/goods/goods')//商品管理
const vip = () => import('../pages/vip/vip')//会员管理
const banner =() => import('../pages/banner/banner')//轮播图管理
const seckill =() => import('../pages/seckill/seckill')//商品秒杀

export const indexRouters = [{
        path: 'menu', //菜单管理
        component: menu,
        name:'菜单管理',
        // beforeEnter: (to, from, next) => {
            //     if(from.path=='/index'){
            //           next()
            //     }else{
            //       next('/register')
            //     }
            //   } 
    },
    {
        path: 'role', //角色管理
        component: role,
        name:'角色管理',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path: 'manger', //管理员管理
        component: manger,
        name:'管理员管理',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path: 'classify', //商品分类
        component: classify,
        name:'商品分类',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path: 'spec', //商品规格
        component: spec,
        name:'商品规格',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path:'goods',//商品管理
        component:goods,
        name:'商品管理',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path:'vip',//会员管理
        component:vip,
        name:'会员管理',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path:'banner',//轮播图管理
        component:banner,
        name:'轮播图管理',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    },
    {
        path:'seckill',//商品秒杀
        component:seckill,
        name:'商品秒杀',
        // beforeEnter: (to, from, next) => {
        //     if(from.path=='/index'){
        //           next()
        //     }else{
        //       next('/register')
        //     }
        //   } 
    }
]

const router= new Router({
    routes: [
        // 设置一级路由
        {
            path: '/register',
            component: register
        },
        {
            path: '/',
            component: register
        },
        {
            path: '/index',
            component: index,
            children: [{
                    // 重置默认页
                    path: '',
                    redirect: 'home'
                },
                {
                    // 重置默认页
                    path: 'home',
                    component: home
                },
                // 剩余参数运算符
                ...indexRouters
            ]
        }
    ]
})


// // 全局守卫
router.beforeEach((to,from,next)=>{
    console.log(store); 
    // 直接去登录的
    if(to.path=='/register'){
        next()
        return
    }
  
    // 不是去登录，需要先判断是否登录过，如果登录直接进入，否则需要跳转到登录页面
     if(store.state.user.list.menus){
       next()
     }else{
       this.$router.push('/register')
     }
  })

  export default router