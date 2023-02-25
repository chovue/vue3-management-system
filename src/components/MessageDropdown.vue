<script lang="ts" setup>
import { ref, reactive } from 'vue';
import type { TabsPaneContext } from 'element-plus';
import { ElMessage } from 'element-plus';

const tabName = ref('通知');

const notices = reactive([
  {
    read: false,
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
  {
    read: false,
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
  {
    read: true,
    logo: '../assets/user.svg',
    content: '你收到了 14 份新周报',
    time: '6年前',
  },
]);

const messages = reactive([
  {
    read: false,
    type: 'comment',
    username: '王小虎',
    content: '这是一条评论',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    time: '6年前',
  },
  {
    read: false,
    type: 'reply',
    username: '王小龙',
    content: '这是一条回复',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    time: '6年前',
  },
]);

const todos = reactive([
  {
    read: false,
    title: '任务一',
    status: '未开始',
    descript: '这是一条任务描述',
  },
  {
    read: false,
    title: '任务二',
    status: '进行中',
    descript: '这是一条任务描述',
  },
  {
    read: false,
    title: '任务三',
    status: '已完成',
    descript: '这是一条任务描述',
  },
]);

const handleClickMessage = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const handleClickItem = (item: any, event: Event) => {
  item.read = true;
};

const handleClear = () => {
  switch (tabName.value) {
    case '通知':
      console.log('清空通知');
      notices.forEach((item) => (item.read = true));
      break;
    case '消息':
      messages.forEach((item) => (item.read = true));
      break;
    case '待办':
      todos.forEach((item) => (item.read = true));
      break;
  }
};

const handleMore = () => {
  ElMessage('你点击了查看更多');
};
</script>

<template>
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
          v-model="tabName"
          class="demo-tabs"
          stretch
          @tab-click="handleClickMessage"
        >
          <el-tab-pane label="通知" name="通知"></el-tab-pane>
          <el-tab-pane label="消息" name="消息"> </el-tab-pane>
          <el-tab-pane label="待办" name="待办"> </el-tab-pane>
        </el-tabs>
        <div class="dropdown-wrapper" v-if="tabName === '通知'">
          <div
            class="notice-container"
            @click="handleClickItem(notice, $event)"
            v-for="(notice, index) in notices"
            :class="notice.read ? 'read' : ''"
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
        <div class="dropdown-wrapper" v-else-if="tabName === '消息'">
          <div
            class="message-container"
            v-for="(message, index) in messages"
            :class="message.read ? 'read' : ''"
            @click="handleClickItem(message, $event)"
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
            :class="todo.read ? 'read' : ''"
            @click="handleClickItem(todo, $event)"
          >
            <div class="todo-title">{{ todo.title }}</div>
            <el-tag class="todo-status">{{ todo.status }}</el-tag>
            <div class="todo-descript">{{ todo.descript }}</div>
          </div>
        </div>

        <el-button-group style="inline-size: 100%">
          <el-button type="text" style="inline-size: 50%" @click="handleClear"
            >清空{{ tabName }}</el-button
          >
          <el-button type="text" style="inline-size: 50%" @click="handleMore"
            >查看更多</el-button
          >
        </el-button-group>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss">
.message {
  margin: 0px 15px;
  cursor: pointer;
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

.read {
  opacity: 0.5;
}
</style>
