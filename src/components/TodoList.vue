<template>
  <div class="todo-list">
    <div className='content'>
      <div className='todoListDiv'>
        <h2>待办事项清单</h2>
        <div className='inputDiv'>
          <input v-model="inputValue" placeholder="添加待办" />
          <button @click="clickBtn"></button>
        </div>
        <div className='listDiv'>
          <ul v-for="item in todoStore.todoList">
            <li class="task-list-item" :key="item.id">
              <label class="task-list-item-label">
                <input type="checkbox">
                <span> {{ item.content }}</span>
              </label>
              <span class="delete-btn" @click="deletItem(item)"></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodos } from '@/stores/todos';
import type { ListItem } from '@/stores/todos'

const todoStore = useTodos();

const inputValue = ref('')

const clickBtn = () => {
  if (inputValue.value.length === 0) {
    return
  }
  todoStore.addTodo(inputValue.value)
  inputValue.value = ''
}

const deletItem = (item: ListItem) => {
  console.log('item', item)
  todoStore.delTodo(item.id)
}
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.todoListDiv {
  width: 500px;
}

input {
  margin-right: 12px;
  width: 100%;
  padding: 0 4px;
  border: none;
  border-bottom: 1px solid black;
  margin-bottom: 10px;
  background-color: transparent;
}

button {
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-size: 44px;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../assets/add.svg')
}

.inputDiv {
  display: flex;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  background-color: rgb(136 130 147 / 48%);
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding: 8px;
  color: white;
}

.task-list-item {
  background-color: rgba(136, 130, 147, 0.48);
  border-radius: 4px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding: 8px;

  input {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #fff;
    background-size: 0;
    transition: 0.2s;
    margin-right: 8px;
    flex-shrink: 0;
    margin-top: 4px;
  }

  input:checked+span {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: line-through rgba(255, 255, 255, 0.8);
  }

  input:hover {
    border-color: #ee9ca7;
    box-shadow: 0 0 0 3px rgba(238, 156, 167, 0.4);
  }

  input:checked {
    background-color: #ee9ca7;
    border: 1px solid rgba(238, 156, 167, 0.4);
  }
}

.delete-btn {
  margin-left: auto;
  display: block;
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ff3d46' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-trash-2'%3E%3Cpolyline points='3 6 5 6 21 6'/%3E%3Cpath d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'/%3E%3Cline x1='10' y1='11' x2='10' y2='17'/%3E%3Cline x1='14' y1='11' x2='14' y2='17'/%3E%3C/svg%3E");
  background-size: 16px;
  background-position: center;
  cursor: pointer;
}
</style>
