<template>
  <div class="tile">
    <div class="intro">
      <div class="title">
        <img src="https://github.com/HearLing.png" alt="" />
        <h1>管理员 - HearLing</h1>
      </div>
      <div class="todolist">
        <h3 style="margin-bottom:10px">TODO List</h3>
        <span>首页</span><el-progress :percentage="65.5" color="#42b983"></el-progress>
        <span>代办列表</span><el-progress :percentage="10.5" color="#f1e05a"></el-progress>
        <span>其它页面规划</span><el-progress :percentage="5.5"></el-progress>
      </div>
    </div>
    <div class="text">
      <h2 class="animate-text">我的前端学习网站 - <a href="https://chodocs.cn/">ChoDocs</a></h2>
      <p class="animate-text">
        一站式前端内容网站，完善前端的学习路线、知识体系
        项目已经在 GitHub 上开源，欢迎加入我们一起学习，分享前端知识 😸 ~
      </p>
      <a href="https://chodocs.cn/">
        <div class="dots"><span></span> <span></span> <span></span></div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.tile {
  background-size: cover;
  width: 100%;
  height: 100%;
  position: relative;
  cursor: pointer;
  transition: all 0.4s ease-out;

  .intro {
    width: 100%;
    position: absolute;
    transition: all 0.4s ease-out;

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
    }

    h1 {
      margin-left: 10px;
      font-weight: 300;
      text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
    }

    span {
      font-size: 14px;
      color: #606266
    }
  }

  .text {
    z-index: 99;
    position: absolute;
    padding: 30px;
    height: 100%;

    h2 {
      font-weight: 100;
      margin-top: 20px;
      font-style: italic;
      transform: translateX(200px);
    }

    p {
      font-weight: 300;
      margin-top: 20px;
      line-height: 25px;
      transform: translateX(-200px);
      transition-delay: 0.2s;
    }
  }
}

img {
  vertical-align: middle;
  width: 80px;
  border-radius: 50%;
}

.animate-text {
  opacity: 0;
  transition: all 0.6s ease-in-out;
}

.tile:hover .intro {
  opacity: 0.2;
}

.tile:hover .animate-text {
  transform: translateX(0);
  opacity: 1;
}

.dots {
  position: absolute;
  bottom: 20px;
  right: 30px;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  color: currentColor;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.dots span {
  width: 5px;
  height: 5px;
  background-color: currentColor;
  border-radius: 50%;
  display: block;
  opacity: 0;
  transition: transform 0.4s ease-out, opacity 0.5s ease;
  transform: translateY(30px);
}

.tile:hover span {
  opacity: 1;
  transform: translateY(0px);
}
</style>
