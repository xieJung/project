// 引入插件 开始请求数据
import axios from 'axios'
import qs from 'qs'

//响应拦截器把数据打印出来
axios.interceptors.response.use(res=>{
    console.log(res);
    return res
})

                ////////////////菜单管理///////////////////////////

                // 定义一个重复利用的api
                const baseUrl ='/api'

                // 添加菜单
                export const menuAdd=(form)=>{
                    return axios({
                        url:baseUrl+'/api/menuadd',//接口路径
                        method:'post',//请求方法
                        data:qs.stringify(form)//post传参形式是data 加上qs.stringify更好获取后台数据
                    })
                }

                // 菜单列表接口
                export const reqMenuList=(params)=>{
                    return axios({
                        url:baseUrl+'/api/menulist',//接口路径
                        method:'get',//请求方法
                        params:params//get传参形式是params 
                    })
                }


                // 菜单删除接口
                export const reqMenuDel=(id)=>{
                    return axios({
                        url:baseUrl+'/api/menudelete',//接口路径
                        method:'post',//请求方法
                        data:id//post传参形式是data
                    })
                }

                // 菜单菜单获取（一条）
                export const reqMenuOne=(id)=>{
                    return axios({
                        url:baseUrl+'/api/menuinfo',//接口路径
                        method:'get',//请求方法
                        params:id
                    })
                }


                // 菜单修改
                export const reqMenuEdit=(form)=>{
                    return axios({
                        url:baseUrl+'/api/menuedit',//接口路径
                        method:'post',//请求方法
                        data:form//post传参形式是data
                    })
                }





           ////////////////角色管理///////////////////////////

                // 添加角色
                export const reqRoleAdd=(form)=>{
                    return axios({
                        url:baseUrl+'/api/roleadd',//接口路径
                        method:'post',//请求方法
                        data:qs.stringify(form)//post传参形式是data 加上qs.stringify更好获取后台数据
                    })
                }

                // 角色列表接口
                export const reqRoleList=()=>{
                    return axios({
                        url:baseUrl+'/api/rolelist',//接口路径
                        method:'get',//请求方法
                       
                    })
                }


                // 角色删除接口
                export const reqRoleDel=(id)=>{
                    return axios({
                        url:baseUrl+'/api/roledelete',//接口路径
                        method:'post',//请求方法
                        data:id//post传参形式是data
                    })
                }

                // 角色菜单获取（一条）
                export const reqRoleOne=(params)=>{
                    return axios({
                        url:baseUrl+'/api/roleinfo',//接口路径
                        method:'get',//请求方法
                        params:params
                    })
                }


                // 角色修改
                export const reqRoleEdit=(form)=>{
                    return axios({
                        url:baseUrl+'/api/roleedit',//接口路径
                        method:'post',//请求方法
                        data:form//post传参形式是data
                    })
                }