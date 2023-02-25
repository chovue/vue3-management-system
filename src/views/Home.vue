<script setup lang="ts" name="home">
import { computed } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import SideBar from '../components/SideBar.vue';
import Tabs from '../components/Tabs.vue';

const route = useRoute();
const router = useRouter();

const handleCommand = (command: string) => {
  if (command == 'loginout') {
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    router.push('/login');
  } else if (command == 'user') {
    router.push('/user');
  }
};

const breadcrumb = computed(() => {
  return {
    name: route.name,
    title: route.meta.name || route.meta.title,
    path: route.fullPath,
  };
});

const username = localStorage.getItem('username') || '';
</script>

<template>
  <div class="fillcontain">
    <div class="header">
      <div class="logo">管理系统</div>
      <div class="right">
        <a href="https://space.bilibili.com/351534170">
          <img
            src="https://img.shields.io/badge/dynamic/json?labelColor=FE7398&logo=bilibili&logoColor=white&label=bilibili%20fans&color=00aeec&query=%24.data.totalSubs&url=https%3A%2F%2Fapi.spencerwoo.com%2Fsubstats%2F%3Fsource%3Dbilibili%26queryKey%3D351534170"
          />
        </a>
        <a href="https://github.com/chodocs/chodocs" target="__blank">
          <img
            alt="GitHub stars"
            src="https://img.shields.io/github/stars/chodocs/chodocs?style=social"
          />
        </a>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../assets/user.svg" alt="" />
            <span class="name"> {{ username }}</span>
            <el-icon>
              <component is="ArrowDown"></component>
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="user">个人中心</el-dropdown-item>
              <el-dropdown-item divided command="loginout"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <el-container class="fillcontain">
      <!-- 侧边显示 -->
      <el-aside class="aside">
        <SideBar></SideBar>
      </el-aside>
      <!-- 主显示 -->
      <el-main>
        <Tabs></Tabs>
        <!-- header 面包屑 -->
        <el-breadcrumb separator="/" style="margin-bottom: 12px">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: breadcrumb.path }">{{
            breadcrumb.title
          }}</el-breadcrumb-item>
        </el-breadcrumb>
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
.header {
  height: 48px;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 24px;

  .right {
    display: flex;
    align-items: center;

    .name {
      font-size: 16px;
      padding-left: 8px;
      font-weight: 600;
    }
  }
}

.aside {
  width: 200px;
  height: 100%;
}

a {
  img {
    width: 82px;
    padding-right: 12px;
    border-radius: inherit;
  }
}

img {
  vertical-align: middle;
  width: 42px;
  border-radius: 50%;
}
</style>
