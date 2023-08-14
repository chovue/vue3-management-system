<!-- 个人中心 -->
<template>
  <div
    class="flex flex-col justify-around items-center content-center w-[100px] h-[140px] m-5"
  >
    <div
      class="w-[100px] h-[100px] p-5 shadow-outbox rounded-3xl flex items-center justify-center bg-[#fff] relative active:shadow-innerbox active:transition-shadow"
    >
      <slot></slot>
    </div>
    <p v-if="props.text" class="text-[slategrey]">
      {{ props.text }}
    </p>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  onClick: Function;
  text: string;
  type: 'inner' | 'outer' | 'none';
}>();
</script>
<style lang="scss" scoped></style>
