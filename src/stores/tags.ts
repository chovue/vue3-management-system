import { defineStore } from 'pinia';

interface ListItem {
  name: string;
  path: string;
  title: string;
}

export const useTagsStore = defineStore('tags', {
  state: () => {
    return {
      list: <ListItem[]>[]
    };
  },
  actions: {
    delTagsItem(index: number) {
      this.list.splice(index, 1);
    },
    setTagsItem(data: ListItem) {
      this.list.push(data);
    },
  }
});
