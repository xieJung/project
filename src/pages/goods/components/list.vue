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
      <el-table-column prop="id" label="商品编号" sortable width="100">
      </el-table-column>
           <el-table-column prop="goodsname" label="商品名称" sortable width="100">
      </el-table-column>
       <el-table-column prop="price" label="商品价格" sortable width="100">
      </el-table-column>
       <el-table-column prop="market_price" label="市场价格" sortable width="100">
      </el-table-column>
 
      <el-table-column  label="图片" width="130"> 
        <template slot-scope="scope">
            <img :src='$preImg+scope.row.img' alt="">
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品" width="100">
        <!-- 作用域插槽 用来获取数据-->
        <template slot-scope="scope">
          <div>
               <el-button type='primary' v-if="scope.row.isnew==1">是</el-button>
               <el-button type='info' v-else disabled>否</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖" width="100">
        <!-- 作用域插槽 用来获取数据-->
        <template slot-scope="scope">
          <div>
               <el-button type='primary' v-if="scope.row.ishot==1">是</el-button>
               <el-button type='info' v-else disabled>否</el-button>
          </div>
        </template>
      </el-table-column>
       <el-table-column prop="status" label="状态" width="100">
        <!-- 作用域插槽 用来获取数据-->
        <template slot-scope="scope">
          <div>
               <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
               <el-button type='info' v-else disabled>禁用</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="180">

         <template slot-scope="scope">
          <div>
               <el-button type='primary' @click="updata(scope.row.id)">修改</el-button>
               <el-button type='danger' @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
        
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
//解构store中的数据
import {mapActions,mapGetters} from 'vuex'
import {reqGoodsDel} from '../../../util/request'
// 导入弹框
import {alertSuccess,alertwarning}  from '../../../util/alert'
export default {
  computed: {
    ...mapGetters({
      list:'goods/list'
    })
  },
  components: {},
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions({
      requsetGoodsList:'goods/requsetGoodsList'
    }),
    // 删除
    del(id){


      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          reqGoodsDel({id:id}).then(res=>{
            this.requsetGoodsList()
            alertSuccess(res.data.msg)
        })
         
        })




        
    },
    // 更新
    updata(id){
      this.$emit('edit',id)
    }
  },
  mounted() {
    this.requsetGoodsList()
  },
};
</script>
<style scoped>
img{
  width: 80px;
  height: 80px;
}
</style>