<template>
  <el-card shadow="never">
    <div class="avatar">
      <img :src="config.AVATAR.img" alt="avatar" />
      <div class="name">{{ config.AVATAR.name }}</div>
      <div>{{ config.AVATAR.motto }}</div>
    </div>

    <div class="detail">
      <p v-for="item in config.DETAIL" :key="item.describe">
        <span>
          <component class="xxx" :is="item.icon" />
          {{ item.describe }}
        </span>
      </p>
    </div>

    <el-divider border-style="dotted" />

    <div class="tags">
      <div class="tags-title">标签</div>
      <el-tag v-for="tag in dynamicTags" :key="tag">
        {{ tag }}
      </el-tag>
      <el-input
        v-if="inputVisible"
        v-model="inputValue"
        ref="InputRef"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
        class="tags-input"
      />
      <el-tag v-else class="tags-add" @click="showInput">+</el-tag>
    </div>

    <el-divider border-style="dotted" />

    <div class="contribution">
      <div class="contribution-title">贡献</div>
      <el-row>
        <el-col :span="12" v-for="item in config.CONTRIBUTION" :key="item.name">
          <a>
            <span class="contribution-avatar">
              <img :src="item.avatar" :alt="item.name" />
            </span>
            {{ item.name }}
          </a>
        </el-col>
      </el-row>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { Postcard, House, Guide } from '@element-plus/icons-vue';
import { nextTick, ref } from 'vue';
import { ElInput } from 'element-plus';

const config = {
  AVATAR: {
    img: 'https://github.com/HearLing.png',
    name: 'HearLing',
    motto: '海纳百川，有容乃大',
  },
  DETAIL: [
    {
      icon: Postcard,
      describe: '交互专家',
    },
    {
      icon: Guide,
      describe: '一站式前端内容网站',
    },
    {
      icon: House,
      describe: '广东省深圳市',
    },
  ],
  TAGS: ['很有想法的', '专注设计', '辣~', '大长腿', '川妹子', '海纳百川'],
  CONTRIBUTION: [
    {
      avatar: 'https://avatars.githubusercontent.com/u/2209055?s=64&v=4',
      name: 'crazyurus',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/18254135?s=64&v=4',
      name: 'zhengbangbo',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/91460000?s=64&v=4',
      name: 'AYoungXXX',
    },
    {
      avatar: 'https://avatars.githubusercontent.com/u/51051157?s=80&v=4',
      name: 'hqchqc',
    },
  ],
};

const inputVisible = ref(false);
const inputValue = ref('');
const dynamicTags = ref(config.TAGS);
const InputRef = ref<InstanceType<typeof ElInput>>();

const handleInputConfirm = () => {
  if (inputValue.value) {
    dynamicTags.value.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = '';
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};
</script>

<style lang="scss" scoped>
.el-row {
  flex-flow: row wrap;
}

.avatar {
  text-align: center;
  margin-bottom: 24px;
  img {
    width: 104px;
    height: 104px;
    border-radius: 50%;
    margin-bottom: 20px;
  }

  .name {
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 4px;
  }
}

.detail {
  p {
    position: relative;
    margin-bottom: 8px;
    padding-left: 26px;
  }
  svg {
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: -0.125rem;
  }
}

.tags {
  .tags-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }

  .el-tag {
    margin-right: 8px;
    margin-bottom: 8px;
  }

  .tags-add {
    border-style: dashed;
  }

  .tags-input {
    margin-left: 5px;
    width: 78px;
  }
}

.contribution {
  .el-col {
    margin-bottom: 24px;
  }
  .contribution-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
  }
  .contribution-avatar {
    margin-right: 12px;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-variant: tabular-nums;
    list-style: none;
    position: relative;
    display: inline-block;
    overflow: hidden;
    color: #fff;
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    text-overflow: ellipsis;

    img {
      width: 24px;
      height: 24px;
      line-height: 24px;
      border-radius: 50%;
    }
  }

  a {
    display: block;
    overflow: hidden;
    color: rgba(0, 0, 0, 0.85);
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
    transition: color 0.3s;
  }
}
</style>
