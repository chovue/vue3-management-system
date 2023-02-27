<!-- 树形懒加载表格 -->
<template>
  <div>
    <vxe-table
      border
      ref="xTree1"
      height="400"
      :row-config="{ keyField: 'id' }"
      :column-config="{ resizable: true }"
      :menu-config="demo1.tableMenu"
      :tree-config="demo1.treeConfig"
      :data="demo1.tableData"
      @menu-click="contextMenuClickEvent"
    >
      <vxe-column field="id" title="Id" width="100" tree-node></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>
  </div>
</template>

<script lang="ts" setup>
import { get } from '@/api';
import { ElMessage } from 'element-plus';
import { onMounted, reactive, ref } from 'vue';
import type {
  VxeTableInstance,
  VxeTablePropTypes,
  VxeTableEvents,
} from 'vxe-table';

const xTree1 = ref<VxeTableInstance>();

onMounted(() => {
  getTableData();
});

function getTableData() {
  get<any>('/api/treeData').then((res) => {
    const { code, data, msg } = res.data;
    if (code == 200) {
      const list = data as Array<any>;
      const $table = xTree1.value;
      $table && $table.loadData(list);
    } else {
      ElMessage(msg);
    }
  });
}

const demo1 = reactive({
  treeConfig: {
    lazy: true,
    transform: true,
    rowField: 'id',
    parentField: 'parentId',
    hasChild: 'hasChild',
    loadMethod: loadChildMethod,
  } as VxeTablePropTypes.TreeConfig,
  tableMenu: {
    body: {
      options: [
        [
          { code: 'clearLoaded', name: '清除加载状态', disabled: false },
          { code: 'reloadNodes', name: '重新加载子节点', disabled: false },
          { code: 'expand', name: '展开节点', disabled: false },
          { code: 'contract', name: '收起节点', disabled: false },
        ],
      ],
    },
    visibleMethod({ row, type, options }) {
      const $table = xTree1.value;
      if (!$table) return;
      const treeConfig = demo1.treeConfig;
      if (type === 'body') {
        options.forEach((list) => {
          list.forEach((item) => {
            if (item.code === 'expand' || item.code === 'contract') {
              if (
                row &&
                treeConfig.children &&
                row[treeConfig.children] &&
                row[treeConfig.children].length
              ) {
                const isExpand = $table.isTreeExpandByRow(row);
                item.disabled = item.code === 'expand' ? isExpand : !isExpand;
              } else {
                item.disabled = true;
              }
            }
          });
        });
      }
      return true;
    },
  } as VxeTablePropTypes.MenuConfig,
  tableData: [] as any[],
});

function loadChildMethod() {
  return get<any>('/api/getChildData').then((res) => {
    const { code, data, msg } = res.data;
    if (code == 200) {
      const list = data as Array<any>;
      return list;
    } else {
      ElMessage(msg);
    }
  });
}

const contextMenuClickEvent: VxeTableEvents.MenuClick = ({ menu, row }) => {
  const $table = xTree1.value;
  if (!$table) return;
  switch (menu.code) {
    case 'clearLoaded':
      $table.clearTreeExpandLoaded(row);
      break;
    case 'reloadNodes':
      $table.reloadTreeExpand(row);
      break;
    case 'expand':
      $table.setTreeExpand(row, true);
      break;
    case 'contract':
      $table.setTreeExpand(row, false);
      break;
  }
};
</script>
<style lang="scss" scoped></style>
