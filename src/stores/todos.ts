import { defineStore } from "pinia";

export interface ListItem {
  id: number;
  content: string;
  complete: boolean;
}

export const useTodos = defineStore('todos', {
  state: () => ({
    id: 3,
    todoList: <ListItem[]>[{
      id: 0,
      content: '路由管理',
      complete: true,
    }, {
      id: 1,
      content: '首页图表',
      complete: false,
    }, {
      id: 2,
      content: '首页todoList',
      complete: false,
    }]
  }),
  actions: {
    addTodo(value: string) {
      this.todoList.push({ id: this.id++, content: value, complete: false });
    },
    delTodo(itemId: number) {
      this.todoList = this.todoList.filter(item => item.id !== itemId);
    }
  }
})