<script setup lang="ts" name="login">

import { useRouter } from 'vue-router'
const router = useRouter()

const submit = () => {
  localStorage.setItem('user', 'hl');
  router.push('home')
}

</script>

<template>
  <div>
    <h1>登录页</h1>
    <button @click="submit">登录</button>
</div>
</template>

<style></style>
