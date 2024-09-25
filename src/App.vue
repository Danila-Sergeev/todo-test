<script setup>
import TodoList from "./components/TodoList.vue";
import { fetchPets } from "./fetch";

fetchPets();
</script>

<template>
  <TodoList />
</template>

<style scoped></style>
