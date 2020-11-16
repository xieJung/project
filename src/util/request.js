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




                 ////////////////管理员管理///////////////////////////

             
                export const reqUserAdd=(form)=>{
                    return  axios({
                        url:baseUrl+'/api/useradd',
                        method:'post',
                        data:qs.stringify(form)
                    })
                }
                // 管理员列表
                export const reqUserList=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/userlist',
                        method:'get',
                        params:params
                    })
                }
                
                // 管理员删除
                export const reqUserDel=(id)=>{
                    return  axios({
                        url:baseUrl+'/api/userdelete',
                        method:'post',
                        data:id
                    })
                }
                
                // 管理员获取一条数据
                export const reqUserOne=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/userinfo',
                        method:'get',
                        params:params
                    })
                }
                
                
                
                // 角色修改
                export const reqUserEdit=(form)=>{
                    return  axios({
                        url:baseUrl+'/api/useredit',
                        method:'post',
                        data:form
                    })
                }
                
                // 管理员总数
                export const reqUserCount=()=>{
                    return  axios({
                        url:baseUrl+'/api/usercount',
                        method:'get',
                    })
                }
                
                // 管理员登录
                export const reqUserLogin=(data)=>{
                    return  axios({
                        url:baseUrl+'/api/userlogin',
                        method:'post',
                        data:data
                    })
                }
                 
            //////////////////商品分类//////////////////
              // 商品分类添加
            export const reqClassifyAdd=(form)=>{
                //  {a:1,b:2}
                    var data = new FormData();
                    // data.append('a',1)
                    // data.append('b',2)
                    for(var i in form){
                        data.append(i,form[i])
                    }
                    return  axios({
                        url:baseUrl+'/api/cateadd',
                        method:'post',
                        data:data
                    })
                }
                // 商品分类列表
                export const reqClassifyList=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/catelist',
                        method:'get',
                        params:params
                    })
                }
                
                // 商品分类删除
                export const reqClassifyDel=(id)=>{
                    return  axios({
                        url:baseUrl+'/api/catedelete',
                        method:'post',
                        data:id
                    })
                }
                
                // 商品分类获取一条数据
                export const reqClassifyOne=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/cateinfo',
                        method:'get',
                        params:params
                    })
                }
                
                
                
                // 商品分类修改
                export const reqClassifyEdit=(form)=>{
                    var data = new FormData();
                    for(var i in form){
                        data.append(i,form[i])
                    }
                    return  axios({
                        url:baseUrl+'/api/cateedit',
                        method:'post',
                        data:data
                    })
                }
                
                
                ////////////////////////商品规格管理///////////////////////////////////////
                // 商品规格添加
                export const reqSpecAdd=(form)=>{ 
                    
                        return  axios({
                            url:baseUrl+'/api/specsadd',
                            method:'post',
                            data:qs.stringify(form)
                        })
                    }
                    // 商品规格列表
                    export const reqSpecList=(params)=>{
                        return  axios({
                            url:baseUrl+'/api/specslist',
                            method:'get',
                            params:params
                        })
                    }
                    
                    // 商品规格删除
                    export const reqSpecDel=(id)=>{
                        return  axios({
                            url:baseUrl+'/api/specsdelete',
                            method:'post',
                            data:id
                        })
                    }
                    
                    // 商品规格获取一条数据
                    export const reqSpecOne=(params)=>{
                        return  axios({
                            url:baseUrl+'/api/specsinfo',
                            method:'get',
                            params:params
                        })
                    }
                    
                    
                    
                    // 商品分类修改
                    export const reqSpecEdit=(form)=>{
                        return  axios({
                            url:baseUrl+'/api/specsedit',
                            method:'post',
                            data:qs.stringify(form)
                        })
                    }
                    
                
                
                
                
                    
                ////////////////////////商品管理///////////////////////////////////////
                // 商品管理添加
                export const reqGoodsAdd=(form)=>{ 
                    var data = new FormData();
                    for(var i in form){
                        data.append(i,form[i])
                    }
                
                    return  axios({
                        url:baseUrl+'/api/goodsadd',
                        method:'post',
                        data:data
                    })
                }
                // 商品管理列表
                export const reqGoodsList=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/goodslist',
                        method:'get',
                        params:params
                    })
                }
                
                // 商品管理删除
                export const reqGoodsDel=(id)=>{
                    return  axios({
                        url:baseUrl+'/api/goodsdelete',
                        method:'post',
                        data:id
                    })
                }
                
                // 商品管理获取一条数据
                export const reqGoodsOne=(params)=>{
                    return  axios({
                        url:baseUrl+'/api/goodsinfo',
                        method:'get',
                        params:params
                    })
                }
                
                
                
                // 商品管理修改
                export const reqGoodsEdit=(form)=>{
                    var data = new FormData();
                    for(var i in form){
                        data.append(i,form[i])
                    }
                    return  axios({
                        url:baseUrl+'/api/goodsedit',
                        method:'post',
                        data:data
                    })
                }
                