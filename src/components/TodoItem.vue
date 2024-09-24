<template>
  <div class="item__box" :class="{ completed: todo.completed }">
    <div class="item__name-box">
      <input type="checkbox" v-model="todo.completed" @change="updateTodo" />
      <span v-if="!editing">{{ todo.text }}</span>
      <input
        type="text"
        v-else
        v-model="todo.text"
        @blur="updateTodo"
        @keyup.enter="updateTodo"
      />
    </div>

    <div class="item__icons">
      <ButtonIcon v-if="!editing && !todo.completed" @click="editTodo">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20px"
            height="20px"
            fill="black"
            viewBox="0 0 512 512"
          >
            <path
              d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"
            />
          </svg>
        </template>
      </ButtonIcon>
      <ButtonIcon @click="deleteTodo" v-if="!editing">
        <template v-slot:icon>
          <svg
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12V17"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M14 12V17"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M4 7H20"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </ButtonIcon>
      <ButtonIcon @click="updateTodo" v-if="editing && !todo.completed">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23px"
            height="23px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 5.75C3 4.23122 4.23122 3 5.75 3H15.7145C16.5764 3 17.4031 3.34241 18.0126 3.9519L20.0481 5.98744C20.6576 6.59693 21 7.42358 21 8.28553V18.25C21 19.7688 19.7688 21 18.25 21H5.75C4.23122 21 3 19.7688 3 18.25V5.75ZM5.75 4.5C5.05964 4.5 4.5 5.05964 4.5 5.75V18.25C4.5 18.9404 5.05964 19.5 5.75 19.5H6V14.25C6 13.0074 7.00736 12 8.25 12H15.75C16.9926 12 18 13.0074 18 14.25V19.5H18.25C18.9404 19.5 19.5 18.9404 19.5 18.25V8.28553C19.5 7.8214 19.3156 7.37629 18.9874 7.0481L16.9519 5.01256C16.6918 4.75246 16.3582 4.58269 16 4.52344V7.25C16 8.49264 14.9926 9.5 13.75 9.5H9.25C8.00736 9.5 7 8.49264 7 7.25V4.5H5.75ZM16.5 19.5V14.25C16.5 13.8358 16.1642 13.5 15.75 13.5H8.25C7.83579 13.5 7.5 13.8358 7.5 14.25V19.5H16.5ZM8.5 4.5V7.25C8.5 7.66421 8.83579 8 9.25 8H13.75C14.1642 8 14.5 7.66421 14.5 7.25V4.5H8.5Z"
              fill="black"
            />
          </svg>
        </template>
      </ButtonIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodosStore, Todo } from "@/store/todos";
import ButtonIcon from "./ButtonIcon.vue";

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
.item__box {
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
}
.item__name-box {
  display: flex;
  gap: 10px;
}
.item__icons {
  display: flex;
  gap: 5px;
}
</style>
