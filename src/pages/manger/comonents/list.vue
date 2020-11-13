<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <div>
                      <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
                      <el-button type="danger" v-else>禁用</el-button>
                </div>
            </template>
      </el-table-column>
       <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
                <div>
                      <el-button type="primary" @click="undata(scope.row.id)">修改</el-button>
                      <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
                </div>
            </template>
       </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 结构vuex仓库数据
import {mapActions,mapGetters} from 'vuex'
// 引入操作方法
import {reqRoleDel} from "../../../util/request"
// 引入弹出框方法
import {alertSuccess,alertwarning} from "../../../util/alert"

export default {
    computed:{
        ...mapGetters({
            list:"role/list"
        })
    },
  components: {},
  data() {
    return {
      
    };
  },
  methods: {
    // g更新数据
      undata(id){
        // 点击修改按钮通知父组件改变isShow属性
          this.$emit('edit',id)
      },
      ...mapActions({
        //   获取role下的方法
          reqRoleList:'role/reqRoleList'
      }),

    //   删除一行
    del(id){
         // 点击确认删除
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // json格式  传参id  冒号传参
        reqRoleDel({id:id}).then(res=>{
            // 点击删除后  重新获取列表
            this.reqRoleList()
              alertSuccess(res.data.msg)
          })
          
        })
    }
  },
  mounted() {
      this.reqRoleList()
  },
};
</script>

<style scoped>
</style>