<script lang="ts" setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const gotoHome = () => {
  router.replace('/dashboard');
};
</script>
<template>
  <div class="not-found">
    <div class="title">没有找到</div>
    <div class="description">对不起，您访问的页面不存在。</div>
    <el-button @click="gotoHome">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80%;
  .title {
    font-size: 24px;
    color: #333;
    margin-bottom: 12px;
  }
  .description {
    font-size: 14px;
    color: #999;
    margin-bottom: 24px;
  }
}
</style>
