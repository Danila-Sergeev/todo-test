<template>
  <li :class="{ completed: props.todo.completed }">
    <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
    <span v-if="!editing">{{ todo.text }}</span>
    <input
      type="text"
      v-else
      v-model="todo.text"
      @blur="updateTodo"
      @keyup.enter="updateTodo"
    />
    <button @click="editTodo" v-if="!editing">Редактировать</button>
    <button @click="deleteTodo" v-if="!editing">Удалить</button>
    <button @click="updateTodo" v-else>Сохранить</button>
  </li>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodosStore, Todo } from "../store/todos";

const store = useTodosStore();

const props = defineProps<{
  todo: Todo;
}>();

const editing = ref(false);

const todo = computed({
  get: () => props.todo,
  set: (newTodo) => {
    store.updateTodo(newTodo);
  },
});

const updateTodo = () => {
  editing.value = false;
};

const editTodo = () => {
  editing.value = true;
};

const deleteTodo = () => {
  store.deleteTodo(props.todo.id);
};
</script>
<style scoped>
.completed {
  text-decoration: line-through;
  color: gray;
}
</style>
