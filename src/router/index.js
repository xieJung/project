import Vue from 'vue'
import Router from 'vue-router'


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
        name:'菜单管理'
    },
    {
        path: 'role', //角色管理
        component: role,
        name:'角色管理'
    },
    {
        path: 'manger', //管理员管理
        component: manger,
        name:'管理员管理'
    },
    {
        path: 'classify', //商品分类
        component: classify,
        name:'商品分类'
    },
    {
        path: 'spec', //商品规格
        component: spec,
        name:'商品规格'
    },
    {
        path:'goods',//商品管理
        component:goods,
        name:'商品管理'
    },
    {
        path:'vip',//会员管理
        component:vip,
        name:'会员管理'
    },
    {
        path:'banner',//轮播图管理
        component:banner,
        name:'轮播图管理'
    },
    {
        path:'seckill',//商品秒杀
        component:seckill,
        name:'商品秒杀'
    }
]

export default new Router({
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