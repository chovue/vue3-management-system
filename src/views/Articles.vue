<!-- 搜索列表 -->
<template>
  <div>
    <div class="header">
      <h1>{{ breadcrumb.title }}</h1>
      <div class="search">
        <el-input
          v-model="article.input"
          prefix-icon="Search"
          placeholder="请输入"
          size="large"
          style="width: 400px"
        />
        <el-button type="primary" size="large">搜索</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="clickTab">
      <el-tab-pane label="文章" name="articles">
        <el-card class="filter">
          <div class="filter-row">
            <span style="min-width: 80px">所属类目：</span>
            <div>
              <el-tag v-for="tag in typeList" :key="tag">
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button
                v-else
                class="button-new-tag ml-1"
                size="small"
                @click="showInput"
              >
                + New Tag
              </el-button>
            </div>
          </div>
          <div class="filter-row">
            作者：<el-cascader
              v-model="cascaderValue"
              style="width: 160px"
              :options="actors"
              :props="{ multiple: true }"
              collapse-tags
              clearable
            />
          </div>
          <div class="filter-row" style="border: none">
            其它选项：
            <div class="filter-col">
              活跃用户：
              <el-select v-memo="activeValue" placeholder="不限">
                <el-option value="1">李三</el-option>
              </el-select>
            </div>
            <div class="filter-col">
              好评度：
              <el-select v-memo="activeValue" placeholder="不限">
                <el-option value="1">优秀</el-option>
              </el-select>
            </div>
          </div>
        </el-card>
        <el-card>
          <Article :data="article.data" />
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="项目" name="projects">项目</el-tab-pane>
      <el-tab-pane label="应用" name="applications">应用</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { get } from '@/api';
import { ElInput, ElMessage, type TabsPaneContext } from 'element-plus';
import { computed, nextTick, onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Article, { type DataTyps } from '../components/Article.vue';

const route = useRoute();
const router = useRouter();
const breadcrumb = computed(() => {
  return {
    name: route.name,
    title: route.meta.name || route.meta.title,
    path: route.fullPath,
  };
});

const activeName = computed(() => {
  return route.name as string;
});
// 点击tab切换路由
function clickTab(pane: TabsPaneContext) {
  router.push('/' + pane.paneName);
}
const article = reactive({
  loading: false,
  input: '',
  data: [] as DataTyps[],
});

onMounted(() => {
  getdata();
});

function getdata() {
  article.loading = true;
  get<any>('/api/article').then((res) => {
    article.loading = false;
    const { code, data, msg } = res.data;
    console.log('data: ', res);
    if (code == 200) {
      article.data = data;
    } else {
      ElMessage(msg);
    }
  });
}

const typeList = [
  '类目一',
  '类目二',
  '类目三',
  '类目四',
  '类目五',
  '类目六',
  '类目七',
  '类目八',
  '类目九',
  '类目十',
  '类目十一',
  '类目十二',
];

const inputValue = ref('');
const dynamicTags = ref(['Tag 1', 'Tag 2', 'Tag 3']);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

// 作者多选框
const actors = [
  { value: 'hl', label: '我自己' },
  { value: '11', label: '张三' },
  { value: '22', label: '李四' },
];
const cascaderValue = ref('hl');

// 活跃用户
const activeValue = ref('1');
</script>
<style lang="scss" scoped>
.header {
  height: 96px;
  .search {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
}

.filter {
  margin-bottom: 32px;
  .filter-row {
    display: flex;
    border-bottom: 1px dashed #f0f0f0;
    padding: 8px 0px;
    align-items: center;
    .el-tag {
      padding: 12px;
      margin: 0px 8px 0px;
      cursor: pointer;
    }
  }
  .filter-col {
    margin-left: 32px;
    display: initial;
    .el-select {
      width: 100px;
    }
  }
}
</style>
