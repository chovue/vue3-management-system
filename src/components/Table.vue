<!--  -->
<template>
  <div>
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="8">
          名称：<el-input class="input-name" v-model="search.name" placeholder="输入名称" />
        </el-col>
        <el-col :span="8">
          状态：<el-cascader :options="search.status" :props="props" collapse-tags collapse-tags-tooltip clearable
            placeholder="选择状态" />
        </el-col>
        <el-col :span="8">
          时间：<el-date-picker v-model="search.date" type="date" placeholder="选择时间" />
        </el-col>
      </el-row>
      <el-row :gutter="12" class="btn">
        <el-button>搜索</el-button>
        <el-button>重置</el-button>
      </el-row>
    </div>

    <el-table :data="table.list" style="width: 100%">
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="table.total" />
  </div>
</template>

<script lang='ts' setup>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { get } from '../api/index';

interface DataProps { }
const props = { multiple: true }

onMounted(() => {
  getData()
})
const table = reactive({
  total: 0,
  list: []
})
const search = reactive({
  status: [{
    value: 1,
    label: 'Asia',
    children: [
      {
        value: 2,
        label: 'China',
        children: [
          { value: 3, label: 'Beijing' },
          { value: 4, label: 'Shanghai' },
          { value: 5, label: 'Hangzhou' },
        ],
      },
      {
        value: 6,
        label: 'Japan',
        children: [
          { value: 7, label: 'Tokyo' },
          { value: 8, label: 'Osaka' },
          { value: 9, label: 'Kyoto' },
        ],
      },
      {
        value: 10,
        label: 'Korea',
        children: [
          { value: 11, label: 'Seoul' },
          { value: 12, label: 'Busan' },
          { value: 13, label: 'Taegu' },
        ],
      },
    ],
  },
  {
    value: 2,
    label: 'US'
  },
  {
    value: 3,
    label: 'Europe'
  },
  {
    value: 4,
    label: 'Afica'
  }],

  date: '',
  name: ''
})


const getData = () => {
  get('/api/shopList', {}).then((res: any) => {
    console.log('data==>', res.data)
    table.list = res.data.list
    table.total = res.data.total
  })
}
</script>
<style lang='scss' scoped>
.header {
  margin-bottom: 20px;
}

.input-name {
  width: 80%;
}
</style>