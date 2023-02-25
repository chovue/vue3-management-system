<script setup lang="ts" name="home">
import { computed, ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { RouterView, useRoute, useRouter } from 'vue-router';
import SideBar from '../components/SideBar.vue';

const route = useRoute();
const router = useRouter();

const notices = [
  {
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
  {
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
  {
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
];

const messages = [
  {
    type: 'comment',
    username: '王小虎',
    content: '这是一条评论',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    time: '6年前',
  },
  {
    type: 'reply',
    username: '王小龙',
    content: '这是一条回复',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    time: '6年前',
  },
];

const todos = [
  {
    title: '任务一',
    status: '未开始',
    descript: '这是一条任务描述',
  },
  {
    title: '任务二',
    status: '进行中',
    descript: '这是一条任务描述',
  },
  {
    title: '任务三',
    status: '已完成',
    descript: '这是一条任务描述',
  },
];

const handleCommand = (command: string) => {
  if (command == 'loginout') {
    localStorage.removeItem('username');
    sessionStorage.removeItem('token');
    router.push('/login');
  } else if (command == 'user') {
    router.push('/user');
  }
};

const activeName = ref('first');

const handleClickMessage = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
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
        <!-- 消息通知 -->
        <el-dropdown trigger="click">
          <el-badge :value="12" class="item message">
            <el-icon size="20px" @click="handleClickMessage">
              <Bell />
            </el-icon>
          </el-badge>
          <template #dropdown>
            <el-dropdown-menu>
              <el-tabs
                style="width: 300px"
                v-model="activeName"
                class="demo-tabs"
                stretch
                @tab-click="handleClickMessage"
              >
                <el-tab-pane label="通知" name="first"></el-tab-pane>
                <el-tab-pane label="消息" name="second"> </el-tab-pane>
                <el-tab-pane label="待办" name="third"> </el-tab-pane>
              </el-tabs>
              <div class="dropdown-wrapper" v-if="activeName === 'first'">
                <div
                  class="notice-container"
                  v-for="(notice, index) in notices"
                  :key="index"
                >
                  <div class="notice-logo">
                    <img :src="notice.logo" alt="" />
                  </div>
                  <div class="notice-text">
                    <div class="notice-content">{{ notice.content }}</div>
                    <div class="notice-time">{{ notice.time }}</div>
                  </div>
                </div>
              </div>
              <div class="dropdown-wrapper" v-else-if="activeName === 'second'">
                <div
                  class="message-container"
                  v-for="(message, index) in messages"
                  :key="index"
                >
                  <div class="message-logo">
                    <img :src="message.avatar" alt="" />
                  </div>
                  <div class="message-text">
                    <div>
                      {{ message.username }}
                      {{ message.type === 'comment' ? '评论了你' : '回复了你' }}
                    </div>
                    <div class="message-content">{{ message.content }}</div>
                    <div class="message-time">{{ message.time }}</div>
                  </div>
                </div>
              </div>
              <div class="dropdown-wrapper" v-else>
                <div
                  class="todo-container"
                  v-for="(todo, index) in todos"
                  :key="index"
                >
                  <div class="todo-title">{{ todo.title }}</div>
                  <el-tag class="todo-status">{{ todo.status }}</el-tag>
                  <div class="todo-descript">{{ todo.descript }}</div>
                </div>
              </div>

              <el-button-group style="inline-size: 100%">
                <el-button type="text" style="inline-size: 50%"
                  >清空通知</el-button
                >
                <el-button type="text" style="inline-size: 50%"
                  >查看更多</el-button
                >
              </el-button-group>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <img src="../assets/user.svg" alt="" />
            <span class="name"> {{ username }}</span>
            <el-icon>
              <ArrowDown />
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

    .message {
      margin: 0px 15px;
      cursor: pointer;
    }

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

.notice-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }

  .notice-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
  }

  .notice-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8px;

    .notice-content {
      font-size: 14px;
      color: #606266;
    }

    .notice-time {
      font-size: 12px;
      color: #909399;
    }
  }
}

.message-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }

  .message-logo {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f7fa;
  }

  .message-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 8px;

    .message-content {
      font-size: 14px;
      color: #606266;
    }

    .message-time {
      font-size: 12px;
      color: #909399;
    }
  }
}

.todo-container {
  display: grid;
  grid-template:
    'title status'
    'descript descript';

  padding: 8px 12px;
  cursor: pointer;

  &:hover {
    background-color: #f5f7fa;
  }

  .todo-title {
    grid-area: title;
    font-size: 14px;
    color: #606266;
  }

  .todo-status {
    grid-area: status;
    font-size: 14px;
    color: #606266;
    justify-self: end;
  }

  .todo-descript {
    grid-area: descript;
    font-size: 14px;
    color: #606266;
  }
}

.dropdown-wrapper {
  padding-block-end: 12px;
}
</style>
