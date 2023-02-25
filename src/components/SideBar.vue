<script setup lang="ts" name="home">
import { computed } from 'vue';
import {
  useRoute,
  useRouter,
  type RouteRecordRaw,
  type RouteRecordName,
} from 'vue-router';

interface SideBar {
  index: string;
  title: string | RouteRecordName | unknown;
  icon?: string | unknown;
  subs?: SideBar[];
}

interface MapType {
  [key: string]: RouteRecordRaw[];
}

const route = useRoute();
const router = useRouter();
const defaultActive = computed(() => {
  return route.path;
});

const routes = router.options.routes.find(
  (item) => item.name == 'home'
)?.children;

const map = {} as MapType;

routes?.forEach((item: RouteRecordRaw) => {
  const key = item.meta?.parent as string;
  if (key) {
    if (map[key]) {
      map[key].push(item);
    } else {
      map[key] = [item];
    }
  } else {
    if (map[item.path]) {
      map[item.path].push(item);
    } else {
      map[item.path] = [item];
    }
  }
});

const siderBar = [] as SideBar[];

Object.keys(map).forEach((key) => {
  if (map[key].length == 1) {
    const t = map[key].find((i: any) => i.path == key);
    if (!t) return;
    siderBar.push({
      index: t.path,
      title: t.meta?.title || t.meta?.name,
      icon: t.meta?.icon,
      subs: [],
    });
  }
  if (map[key].length > 1) {
    const t = map[key].find((i: any) => i.path == key);
    if (!t) return;
    siderBar.push({
      index: t.path,
      title: t.meta?.title || t.meta?.name,
      icon: t.meta?.icon,
      subs: handel(map[key]),
    });
  }
});

function handel(data: any) {
  return data.map((item: any) => {
    return {
      index: item.path,
      title: item.meta?.name || item.meta?.title,
      icon: item.meta?.icon,
      subs: item.children ? handel(item.children) : [],
    };
  });
}
</script>

<template>
  <el-menu
    :default-active="defaultActive"
    style="min-height: 100%"
    theme="dark"
    router
  >
    <template v-for="item in siderBar">
      <template v-if="item.subs?.length">
        <el-sub-menu :index="item.index" :key="item.index">
          <template #title>
            <el-icon v-if="item.icon">
              <component :is="item.icon"></component>
            </el-icon>
            <span>{{ item.title }}</span>
          </template>
          <template v-for="ss in item.subs">
            <el-sub-menu
              :index="ss.index"
              :key="ss.index"
              v-if="ss.subs?.length"
            >
              <template #title
                ><span>{{ ss.title }}</span></template
              >
              <template v-for="s in ss.subs" :key="s.index">
                <el-menu-item :index="s.index">{{ s.title }}</el-menu-item>
              </template>
            </el-sub-menu>
            <el-menu-item v-else :index="ss.index">{{ ss.title }}</el-menu-item>
          </template>
        </el-sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index">
          <el-icon v-if="item.icon">
            <component :is="item.icon"></component>
          </el-icon>
          <template #title>{{ item.title }}</template>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped lang="scss"></style>
