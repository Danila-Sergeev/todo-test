<template>
  <div>
    <h1>To-Do Список</h1>
    <input type="text" v-model="newTodoText" placeholder="Добавить задачу..." />
    <button @click="addTodo">Добавить</button>
    <ul>
      <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" />
    </ul>
  </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTodosStore } from "../store/todos.ts";
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
<style scoped></style>
