<template>
  <div>
    <h1>To-Do Список</h1>

    <input
      class="list__input"
      type="text"
      v-model="newTodoText"
      placeholder="Добавить задачу..."
      @keyup.enter="addTodo"
    />
    <button @click="addTodo">Добавить</button>

    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      class="list__item"
    />
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTodosStore } from "@/store/todos";
import TodoItem from "./TodoItem.vue";

const store = useTodosStore();

const newTodoText = ref("");

const todos = computed(() => store.todos);

const addTodo = () => {
  if (newTodoText.value.trim() !== "") {
    store.addTodo(newTodoText.value);
    newTodoText.value = "";
  }
};

onMounted(() => {
  store.loadTodos();
});
</script>
<style scoped>
.list__input {
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 5px;
  margin-right: 20px;
}
.list__item {
  margin-top: 20px;
}
</style>
