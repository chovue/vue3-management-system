<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted, onUpdated, ref } from 'vue';
import Card from '../components/Card.vue';
import TodoList from '../components/TodoList.vue';
import Statistic from '@/components/Statistic.vue';
import type { TabsPaneContext } from 'element-plus';

const pie = ref();
const line = ref();
const histogram = ref();

const activeName = ref('sales');

const tabName: { [key: string]: string } = {
  sales: '销售额',
  visits: '访问量',
};

const option: echarts.EChartsOption = {
  tooltip: {
    trigger: 'item',
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
      left: '80px',
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: false,
        position: 'center',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 32,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '商品A' },
        { value: 735, name: '商品B' },
        { value: 580, name: '商品C' },
        { value: 484, name: '商品D' },
        { value: 300, name: '商品E' },
      ],
    },
  ],
};
const option2: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      magicType: { type: ['line', 'bar'] },
      restore: {},
      saveAsImage: {},
    },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
    nameTextStyle: {
      align: 'left',
      verticalAlign: 'middle',
    },
    axisLabel: {
      formatter: '利润 {value} %',
    },
  },
  series: [
    {
      name: 'A商品',
      type: 'line',
      data: [10, 11, 13, 11, 12, 12, 9],
      markPoint: {
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' },
        ],
      },
      markLine: {
        data: [{ type: 'average', name: 'Avg' }],
      },
    },
    {
      name: 'B商品',
      type: 'line',
      data: [1, -2, 2, 5, 3, 2, 0],
      markPoint: {
        data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }],
      },
      markLine: {
        data: [
          { type: 'average', name: 'Avg' },
          [
            {
              symbol: 'none',
              x: '90%',
              yAxis: 'max',
            },
            {
              symbol: 'circle',
              label: {
                position: 'start',
                formatter: 'Max',
              },
              type: 'max',
              name: '最高点',
            },
          ],
        ],
      },
    },
  ],
};

const optionSales: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '销售额',
      type: 'bar',
      barWidth: '60%',
      data: [120, 200, 150, 80, 70, 110, 130, 140, 180, 190, 100, 90],
    },
  ],
};

const optionVisits: echarts.EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
      axisTick: {
        alignWithLabel: true,
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
    },
  ],
  series: [
    {
      name: '访问量',
      type: 'bar',
      barWidth: '60%',
      data: [
        8034, 12230, 11042, 7054, 6032, 9560, 10350, 15620, 15460, 14360, 8090,
        7490,
      ],
    },
  ],
};

const storeData = [
  {
    name: '工专路 0 号店',
    value: 2309,
  },
  {
    name: '工专路 1 号店',
    value: 2309,
  },
  {
    name: '工专路 2 号店',
    value: 2309,
  },
  {
    name: '工专路 3 号店',
    value: 2309,
  },
  {
    name: '工专路 4 号店',
    value: 2309,
  },
  {
    name: '工专路 5 号店',
    value: 2309,
  },
];

let myHistogram: echarts.ECharts;

onMounted(() => {
  const myPie = echarts.init(pie.value);
  const myLine = echarts.init(line.value);
  myHistogram = echarts.init(histogram.value);

  myPie.setOption(option);
  myLine.setOption(option2);
  myHistogram.setOption(optionSales);
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  if (tab.props.name === 'sales') {
    myHistogram.clear();
    myHistogram.setOption(optionSales);
    console.log('销售额');
  } else if (tab.props.name === 'visits') {
    myHistogram.clear();
    myHistogram.setOption(optionVisits);
    console.log('访问量');
  }
};
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
    <el-row :gutter="20" style="margin-top: 10px">
      <el-col :span="24">
        <el-card shadow="hover">
          <el-tabs
            v-model="activeName"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="销售额" name="sales" />
            <el-tab-pane label="访问量" name="visits" />
            <div class="data-analysis-container">
              <div class="histogram-container" ref="histogram"></div>
              <div class="rank">
                <h4>门店{{ tabName[activeName] }}排名</h4>
                <ul v-for="(item, index) in storeData" :key="item.name">
                  <li>
                    <span
                      class="rankingItemNumber"
                      :class="{ top: index < 3 }"
                      >{{ index + 1 }}</span
                    >
                    <span class="rankingItemName"> {{ item.name }}</span>
                    <span>{{ item.value }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-tabs>
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

.data-analysis-container {
  height: 260px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: nowrap;
}

.rank {
  height: 260px;
  width: 400px;
}

.histogram-container {
  height: 260px;
  flex-grow: 1;
}

ul {
  list-style: none;
  padding: 5px;
  li {
    padding: 3px;
    display: flex;
    align-items: center;
    .rankingItemNumber {
      display: inline-block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      color: #000;
      text-align: center;
      border-radius: 50%;
      background-color: #fafafa;
      margin-right: 10px;
    }
    .top {
      background-color: #314659;
      color: #fff;
    }
    .rankingItemName {
      flex-grow: 1;
    }
  }
}
</style>
