<template>
  <el-card shadow="never">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="文章" name="first">
        <div class="list">
          <ul class="list-items">
            <li
              v-for="article in config.ARTICLE"
              :key="article.title"
              class="list-item"
            >
              <div class="list-item-meta">
                <div class="list-item-meta-content">
                  <h4 class="list-item-meta-title">{{ article.title }}</h4>
                  <div>
                    <el-tag
                      v-for="tag in article.tags"
                      :key="tag"
                      class="list-item-tag"
                    >
                      {{ tag }}
                    </el-tag>
                  </div>
                </div>
              </div>

              <div class="list-content">
                <div class="description">
                  {{ article.content }}
                </div>

                <div class="extra">
                  <span class="avatar">
                    <img :src="article.avatar" />
                  </span>
                  <a :href="article.authorWebsite" target="_blank">
                    {{ article.author }}
                  </a>
                  发布在
                  <a :href="article.website" target="_blank">
                    {{ article.website }}
                  </a>

                  <em>{{ article.time }}</em>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="应用" name="second">
        <el-empty />
      </el-tab-pane>
      <el-tab-pane label="项目" name="third">
        <el-empty />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const activeName = ref('first');

const config = {
  ARTICLE: [
    {
      title: 'Vue',
      tags: ['渐进式', '性能出色', '前端框架'],
      content:
        '渐进式JavaScript框架,易学易用，性能出色，适用场景丰富的 Web 前端框架, 丰富的、可渐进式集成的生态系统，可以根据应用规模在库和框架间切换自如,经过编译器优化、完全响应式的渲染系统，几乎不需要手动优化,基于标准 HTML、CSS 和 JavaScript 构建，提供容易上手的 API 和一流的文档。',
      avatar: 'https://avatars.githubusercontent.com/u/6128107?s=200&v=4',
      author: 'Evan You',
      authorWebsite: 'https://github.com/yyx990803',
      website: 'https://vuejs.org',
      time: '2023-02-23 01:00',
    },
    {
      title: 'Element Plus',
      tags: ['基于 Vue 3', '设计师', '开发者', '组件库'],
      content:
        '一致、反馈、效率、可控。与现实生活一致： 与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念，通过界面样式和交互动效让用户可以清晰的感知自己的操作，语言表达清晰且表意明确，让用户快速理解进而作出决策，根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策',
      avatar: 'https://avatars.githubusercontent.com/u/68583457?s=200&v=4',
      author: 'Element Plus',
      authorWebsite: 'https://github.com/element-plus',
      website: 'https://element-plus.gitee.io/zh-CN/component/button.html',
      time: '2023-02-23 02:00',
    },
    {
      title: 'React',
      tags: ['渐进式', '构建用户界面', '前端框架'],
      content:
        '用于构建用户界面的 JavaScript 库,以声明式编写 UI, 可以让你的代码更加可靠,且方便调试。构建管理自身状态的封装组件，然后对其组合以构成复杂的 UI。一次学习,跨平台编写,无论你现在使用什么技术栈，在无需重写现有代码的前提下，通过引入 React 来开发新功能。',
      avatar:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K',
      author: 'Jord Walke',
      authorWebsite: 'https://github.com/jordwalke',
      website: 'https://reactjs.org/',
      time: '2023-02-23 02:00',
    },
    {
      title: 'Ant Design',
      tags: ['组件丰富', '选用自如', '开发者', '组件库'],
      content:
        '助力设计开发者「更灵活」地搭建出「更美」的产品，让用户「快乐工作」～',
      avatar: 'https://avatars.githubusercontent.com/u/12101536?s=200&v=4',
      author: 'Ant Design Team',
      authorWebsite: 'https://github.com/ant-design',
      website: 'https://ant.design/components/overview-cn/',
      time: '2023-02-23 03:00',
    },
  ],
};
</script>

<style lang="scss" scoped>
.list {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: 'tnum', 'tnum';
  position: relative;
  .list-items {
    margin: 0;
    padding: 0;
    list-style: none;

    .list-item {
      padding: 16px 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    }
    .list-item:first-child {
      padding-top: 0;
    }

    .list-item-meta {
      margin-bottom: 16px;
    }

    .list-item-meta-title {
      margin-bottom: 12px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 16px;
      line-height: 24px;
    }

    .list-item-tag {
      margin-right: 8px;
    }

    .description {
      max-width: 720px;
      line-height: 22px;
    }

    .extra {
      margin-top: 16px;
      color: rgba(0, 0, 0, 0.45);
      line-height: 22px;

      .avatar img {
        position: relative;
        top: 1px;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        vertical-align: top;
        line-height: 24px;
        border-radius: 50%;
      }

      em {
        margin-left: 16px;
        color: rgba(0, 0, 0, 0.25);
        font-style: normal;
      }

      a {
        color: #1890ff;
      }
    }

    .list-item-action {
      margin-left: auto;
      list-style: none;
      .list-item-action-item {
        .list-item-action-split {
          position: absolute;
          top: 50%;
          right: 0;
          width: 1px;
          height: 14px;
          margin-top: -7px;
          background-color: rgba(0, 0, 0, 0.06);
        }
      }
    }
  }
}
</style>
