<!-- 个人中心页面 -->
<template>
  <el-row :gutter="28" class="account-center-page">
    <!-- left -->
    <el-col :span="7">
      <AccountDetail />
    </el-col>

    <!-- right -->
    <el-col :span="17">
      <AccountArticle />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import AccountDetail from '@/components/AccountDetail.vue';
import AccountArticle from '@/components/AccountArticle.vue';
</script>

<style lang="scss" scoped>
.account-center-page {
  font-family: -apple-system, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, Arial, noto sans, sans-serif, apple color emoji,
    segoe ui emoji, segoe ui symbol, noto color emoji;
  font-size: 14px;
}
</style>
