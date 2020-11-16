<template>
  <div>
     <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import  {mapGetters,mapActions} from 'vuex'
// 引入图表方式
import echarts from 'echarts'
export default {
     computed: {
        ...mapGetters({
            list:'classify/list'
        })
    },
    components:{},
    data(){
        return {}
    },
    methods:{
        ...mapActions({
            requsetClassifyList:'classify/requsetClassifyList'
        })
    },
    // 页面已加载
    mounted(){
       this.requsetClassifyList()
    },
    watch:{
    list:{
        handler(){
             var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: this.list.map(item=>item.children?item.children.length:0)
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        },
        deep:true
        }
    }
}

</script>

<style>

</style>