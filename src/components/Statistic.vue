<!--  -->
<template>
  <div>
    <div class="statistic-card">
      <el-statistic :value="98500">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            每日活跃人数
            <el-tooltip effect="dark" content="一天内登录产品的用户数" placement="top">
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>比去年</span>
          <span class="green">
            24%
            <el-icon>
              <CaretTop />
            </el-icon>
          </span>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="statistic-card">
      <el-statistic :value="693700">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            每月活跃人数
            <el-tooltip effect="dark" content="一个月内登录产品的用户数" placement="top">
              <el-icon style="margin-left: 4px" :size="12">
                <Warning />
              </el-icon>
            </el-tooltip>
          </div>
        </template>
      </el-statistic>
      <div class="statistic-footer">
        <div class="footer-item">
          <span>比上个月</span>
          <span class="red">
            12%
            <el-icon>
              <CaretBottom />
            </el-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import {
  ArrowRight,
  CaretBottom,
  CaretTop,
  Warning,
} from '@element-plus/icons-vue'
</script>
<style lang='scss' scoped>
.line {
  border: 1px solid var(--el-card-border-color);
}

:global(h2#card-usage ~ .example .example-showcase) {
  background-color: var(--el-fill-color) !important;
}


.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 10px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.statistic-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  font-size: 12px;
  color: var(--el-text-color-regular);
  margin-top: 16px;
}

.statistic-footer .footer-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.statistic-footer .footer-item span:last-child {
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
}

.green {
  color: var(--el-color-success);
}

.red {
  color: var(--el-color-error);
}
</style>