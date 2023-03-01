<!-- 文章列表 -->
<template>
  <div class="list">
    <ul class="list-items">
      <li v-for="article in data" :key="article.title" class="list-item">
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
</template>

<script lang="ts" setup>
export interface DataTyps {
  title: string;
  tags: string[];
  content: string;
  avatar: string;
  author: string;
  authorWebsite: string;
  website: string;
  time: string;
}

defineProps<{
  data: DataTyps[];
}>();
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
