<template>
  <div>
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- echarts -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>
  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      option: {
        legend: {
          data: ['华东', '华南', '华北', '西部', '其他']
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          backgroundColor: 'rgba(245, 245, 245, 0.8)',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          textStyle: {
            color: '#000'
          },
          position: function(pos, params, el, elRect, size) {
            var obj = { top: 10 }
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30
            return obj
          },
          extraCssText: 'width: 170px'
        },
        yAxis: [
          {
            type: 'value'
          }
        ],
        xAxis: {
          data: [
            '2017-12-27',
            '2017-12-28',
            '2017-12-29',
            '2017-12-30',
            '2017-12-31',
            '2018-1-1'
          ]
        },
        series: [
          {
            name: '华东',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [2999, 3111, 4100, 3565, 3528, 6000]
          },
          {
            name: '华南',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [5090, 2500, 3400, 6000, 6400, 7800]
          },
          {
            name: '华北',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [6888, 4000, 8010, 12321, 13928, 12984]
          },
          {
            name: '西部',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [9991, 4130, 7777, 12903, 13098, 14028]
          },
          {
            name: '其他',
            type: 'line',
            stack: '总量',
            areaStyle: {
              normal: {}
            },
            data: [15212, 5800, 10241, 14821, 15982, 14091]
          }
        ]
      }
    }
  },
  async mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))
    // let { data: res } = await this.$axios.get('reports/type/1')

    // this.option = res.data
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      legend: {
        data: ['销量']
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    }

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option)
  }
}
</script>