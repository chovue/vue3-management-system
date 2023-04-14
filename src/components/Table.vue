<!--  -->
<template>
  <div>
    <div class="header">
      <el-row :gutter="20">
        <el-col :span="8">
          名称：<el-input
            class="input-name"
            v-model="search.name"
            placeholder="输入名称"
          />
        </el-col>
        <el-col :span="8">
          状态：<el-cascader
            v-model="search.status"
            :options="options"
            :props="props"
            collapse-tags
            collapse-tags-tooltip
            clearable
            placeholder="选择状态"
          />
        </el-col>
        <el-col :span="8">
          时间：<el-date-picker
            v-model="search.date"
            type="date"
            placeholder="选择时间"
          />
        </el-col>
      </el-row>
      <el-row :gutter="12" style="margin-top: 12px">
        <el-col :span="8">
          描述：<el-input
            class="input-name"
            v-model="search.des"
            placeholder="输入描述"
          />
        </el-col>
        <el-col :span="6" :offset="10" class="btn">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-col>
      </el-row>
    </div>

    <el-table :data="table.list" style="width: 100%" v-loading="table.loading">
      <el-table-column fixed prop="pname" label="商品名称" width="250" />
      <el-table-column fixed prop="name" label="操作人" width="120" />
      <el-table-column fixed prop="date" label="时间" width="150" />
      <el-table-column prop="state" label="状态" width="120" />
      <el-table-column prop="city" label="城市" width="120" />
      <el-table-column prop="address" label="地址" width="300" />
      <el-table-column prop="zip" label="描述" width="120" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="scope">
          <el-button
            link
            type="primary"
            size="small"
            @click="
              () => {
                drawer = true;
                detailId = scope.row.id;
              }
            "
            >详情</el-button
          >
          <el-button link type="primary" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <TableDetail
      :id="detailId"
      :drawer="drawer"
      direction="rtl"
      :showFoot="true"
      :onChange="onDrawerChange"
    />
    <el-pagination background layout="prev, pager, next" :total="table.total" />
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';
import TableDetail from './TableDetail.vue';
import { get } from '../api/index';
import { ElMessage } from 'element-plus';

const props = { multiple: true };

const drawer = ref(false);
function onDrawerChange(val: boolean) {
  drawer.value = val;
}

onMounted(() => {
  getData();
});
const table = reactive({
  total: 0,
  list: [],
  loading: false,
});
const search = reactive({
  status: [],
  date: '',
  name: '',
  des: '',
});
const options = [
  {
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
    label: 'US',
  },
  {
    value: 3,
    label: 'Europe',
  },
  {
    value: 4,
    label: 'Afica',
  },
];

const detailId = '';
const getData = () => {
  table.loading = true;
  get('/api/shopList', {}).then((res: any) => {
    console.log('data==>', res.data);
    table.loading = false;
    const { code, data, msg } = res.data;
    if (code == 200) {
      table.list = data.list;
      table.total = data.total;
    } else {
      ElMessage.error(msg);
    }
  });
};
</script>
<style lang="scss" scoped>
.btn {
  padding-right: 16px !important;
  display: flex;
  justify-content: center;
}

.header {
  margin-bottom: 20px;
}

.input-name {
  width: 80%;
}
</style>
