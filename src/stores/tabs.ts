import { defineStore } from 'pinia';

interface ListItem {
  name: string;
  path: string;
  title: string;
}

export const useTabsStore = defineStore('tabs', {
  state: () => {
    return {
      list: <ListItem[]>[]
    };
  },
  actions: {
    delTabsItem(index: number) {
      this.list.splice(index, 1);
    },
    setTabsItem(data: ListItem) {
      this.list.push(data);
    },
    delAllTabs() {
      this.list = []
    },
    delExcept(index: number) {
      this.list = [this.list[index]];
    }
  }
});
