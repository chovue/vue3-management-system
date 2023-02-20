<script setup lang="ts" name="home">
import {
  Document,
  Menu as IconMenu
} from '@element-plus/icons-vue'
import { RouterView, } from 'vue-router'
</script>

<template>
  <div class="fillcontain">
    <el-container class="fillcontain">
      <el-aside class="aside">
        <el-menu default-active="dashboard" style="min-height: 100%;" theme="dark" router>
          <el-menu-item index="dashboard"><el-icon><icon-menu /></el-icon>首页
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <Document />
              </el-icon>
              <span>表格</span>
            </template>
            <el-menu-item index="table">简单表格</el-menu-item>
            <el-menu-item index="complexTable">复杂表格</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-main>
        <RouterView v-slot="{ Component }">
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.aside {
  width: 200px;
  height: 100%;
}
</style>
