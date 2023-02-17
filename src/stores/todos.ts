import { defineStore } from "pinia";

export interface ListItem {
  id: number;
  content: string
}

export const useTodos = defineStore('todos', {
  state: () => ({
    id: 0,
    todoList: <ListItem[]>[{
      id: 0,
      content: '路由管理'
    }, {
      id: 1,
      content: '首页图表'
    }, {
      id: 2,
      content: '首页todoList'
    }]
  }),
  actions: {
    addTodo(value: string) {
      this.todoList.push({ id: this.id++, content: value });
    },
    delTodo(itemId: number) {
      this.todoList = this.todoList.filter(item => item.id !== itemId);
    }
  }
})