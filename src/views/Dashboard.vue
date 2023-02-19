<script setup lang="ts">


import * as echarts from 'echarts'
import { onMounted, ref } from 'vue';
import Card from '../components/Card.vue';
import TodoList from '../components/TodoList.vue';
import Statistic from '@/components/Statistic.vue';

const pie = ref();
const line = ref();

const option: echarts.EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: '0px',
    top: '10px',
  },
  series: [
    {
      name: '销售额',
      type: 'pie',
      radius: ['40%', '70%'],
      left: "80px",
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 32,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '商品A' },
        { value: 735, name: '商品B' },
        { value: 580, name: '商品C' },
        { value: 484, name: '商品D' },
        { value: 300, name: '商品E' },
      ]
    }
  ]
}
const option2: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      align: 'left',
      verticalAlign: 'middle'
    },
    axisLabel: {
      formatter: '利润 {value} %'
    }
  },
  series: [
    {
      name: 'A商品',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }]
      }
    },
    {
      name: 'B商品',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max'
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max'
              },
              type: 'max',
              name: '最高点'
            }
          ]
        ]
      }
    }
  ]
};

onMounted(() => {
  const myPie = echarts.init(pie.value);
  const myLine = echarts.init(line.value);

  myPie.setOption(option);
  myLine.setOption(option2)
})

</script>
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="card">
          <Card />
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover" class="card">
          <Statistic />
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card shadow="hover" class="card">
          <TodoList />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover">
          <h2>商品类别占比</h2>
          <div class="pie-container" ref="pie"></div>
        </el-card>

      </el-col>
      <el-col :span="16">
        <el-card shadow="hover">
          <h2>商品销售利润率</h2>
          <div class="line-container" ref="line"></div>
        </el-card>

      </el-col>
    </el-row>
    <!-- <TheWelcome /> -->
  </div>
</template>

<style scoped lang="scss">
.el-card .el-card__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 100%;
  height: 260px;
  margin-bottom: 10px;
}

.pie-container {
  height: 260px;
}

.line-container {
  height: 260px;
}
</style>
