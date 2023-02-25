<template>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-click="clickTab"
    @tab-remove="removeTab"
    @contextmenu.prevent="showOptions = true"
  >
    <el-tab-pane
      v-for="item in tags.list"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
    </el-tab-pane>
  </el-tabs>
  <div v-show="showOptions" ref="target">
    <span class="el-popper__arrow" data-popper-arrow=""></span>
    <ul class="contextmenu">
      <li>关闭其它</li>
      <li>全部关闭</li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { useTagsStore } from '@/stores/tags';
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const route = useRoute();
const router = useRouter();
const tags = useTagsStore();

const editableTabsValue = ref();
watch(
  route,
  () => {
    editableTabsValue.value = route.name;
    setTags(route);
  },
  {
    immediate: true,
  }
);
// 设置标签
function setTags(route: any) {
  const isExist = tags.list.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    tags.setTagsItem({
      name: route.name,
      title: route.meta.name || route.meta.title,
      path: route.fullPath,
    });
  }
}
// 点击tab切换路由
function clickTab(pane: TabsPaneContext, ev: Event) {
  router.push('/' + pane.paneName);
}
// 单个tab移除
const removeTab = (name: TabPaneName) => {
  const index = tags.list.findIndex((item) => item.name == name);
  tags.delTagsItem(index);
  if (tags.list.length === 0) {
    router.push('/');
  } else {
    const item = tags.list[tags.list.length - 1];
    // 最后一个链接
    router.push(item.path);
  }
};

// 右键出操作面板
const showOptions = ref(false);

const target = ref(null);

onClickOutside(target, (event) => (showOptions.value = false));
</script>
<style scoped lang="scss">
.el-tabs {
  position: absolute;
  top: 8px;
  margin-left: -21px;
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  top: 50px;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: var(--el-box-shadow-light);
}

.contextmenu li {
  margin: 0;
  padding: 7px 16px;
  font-size: var(el-font-size-base);
  color: var(--el-text-color-regular);
  cursor: pointer;
}

.contextmenu li:hover {
  background-color: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}

.el-popper__arrow {
  z-index: 9999;
  top: 46px;
  left: 252px;
  &::before {
    border: 1px solid var(--el-border-color-light);
    background: var(--el-bg-color-overlay);
    border-bottom-color: transparent !important;
    border-right-color: transparent !important;
  }
}
</style>
