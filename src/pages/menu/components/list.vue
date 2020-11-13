<template>
  <div>
    <div class="search">
    <!-- 搜索框 -->
    <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="请输入内容"
    @select="handleSelect"
    ></el-autocomplete><el-button type="primary">搜索</el-button>
    </div>


    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="菜单编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标"> </el-table-column>
       <el-table-column prop="url" label="菜单地址"> </el-table-column>
        <el-table-column prop="status" label="状态"> 
          <!-- <el-switch
            v-model="list.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch> -->
          <!-- 定义一个自定义插槽 -->
          <template slot-scope="scope">
              <div>
                <!-- 拿到这行status等于1就显示这个 -->
               <el-button type='primary' v-if="scope.row.status==1">启用</el-button>
               <el-button type='info' v-else disabled>禁用</el-button>
              </div>
          </template>

        </el-table-column>
        <el-table-column prop="address" label="操作">

        <template slot-scope="scope">
          <div>
          <!-- 获取这行 id 通过id修改当前id参数-->
           <el-button type="primary" @click="updata(scope.row.id)">修改</el-button>
            <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
          </div>
        </template>
           </el-table-column>
    </el-table>
   
  </div>
</template>

<script>
// 结构storo中的数据  结构要用this
 import {mapActions,mapGetters} from 'vuex'

//  获取弹出框方法
import {alertSuccess,alertwarning} from '../../../util/alert'

// 菜单删除
import {reqMenuDel} from '../../../util/request'

export default {
  computed:{
    ...mapGetters({
       list:'menu/list'
    })
  },
  components: {},
  data() {
    return {
      restaurants: [],
      state: '',
      timeout:  null
    };
  },
  methods: {
    ...mapActions({
      reqMenuList:'menu/reqMenuList'
    }),

    // 搜索部分
       loadAll() {
        return [
          { "value": "家用电器", "address": "王二虎"},
          { "value": "菜单名称", "address": "我是菜单名称" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        ];
      },
      querySearchAsync(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          cb(results);
        }, 3000 * Math.random());
      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      },

    // 点击删除
    del(id){

      // 点击确认删除
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        // json格式
        reqMenuDel({id:id}).then(res=>{
              this.reqMenuList()
              // 获取弹出框
              alertSuccess(res.data.msg)
          })
          
        })
      
    },

    //点击修改
    updata(id){
      // 通知父组件传方法
      this.$emit("edit",id)
    }
  },

  mounted() {
      this.reqMenuList(),
      // 搜索部分
      this.restaurants = this.loadAll();
  },
};
</script>

<style scoped>
.search{
    background: white;
    height: 60px;
    padding: 20px 0px 0 20px;
}
</style>