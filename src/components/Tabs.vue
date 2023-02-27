<template>
  <div>
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      closable
      @tab-click="clickTab"
      @tab-remove="removeTab"
    >
      <el-tab-pane v-for="item in tabs.list" :key="item.name" :name="item.name">
        <template #label>
          <el-dropdown trigger="contextmenu">
            <span :class="{ 'is-active': item.name == editableTabsValue }">
              {{ item.title }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="closeOther(item.name)"
                  >关闭其它</el-dropdown-item
                >
                <el-dropdown-item @click="closeAll">全部关闭</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang="ts" setup>
import { useTabsStore } from '@/stores/tabs';
import type { TabPaneName, TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { onClickOutside } from '@vueuse/core';

const route = useRoute();
const router = useRouter();
const tabs = useTabsStore();

const editableTabsValue = ref();
watch(
  route,
  () => {
    editableTabsValue.value = route.name;
    setTabs(route);
  },
  {
    immediate: true,
  }
);
// 设置标签
function setTabs(route: any) {
  const isExist = tabs.list.some((item) => {
    return item.path === route.fullPath;
  });
  if (!isExist) {
    tabs.setTabsItem({
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
  const index = tabs.list.findIndex((item) => item.name == name);
  tabs.delTabsItem(index);
  if (tabs.list.length === 0) {
    router.push('/');
  } else {
    const item = tabs.list[tabs.list.length - 1];
    // 最后一个链接
    router.push(item.path);
  }
};

// 右键操作列相关方法
function closeOther(name: string) {
  const index = tabs.list.findIndex((item) => item.name == name);
  tabs.delExcept(index);
}
function closeAll() {
  tabs.delAllTabs();
  router.push('/');
}
</script>
<style scoped lang="scss">
.el-tabs {
  position: absolute;
  top: 8px;
  margin-left: -21px;
}
.el-dropdown {
  padding-top: 12px;
  .is-active {
    color: var(--el-color-primary);
  }
}
</style>
