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
          <Edit />
        </template>
      </ButtonIcon>
      <ButtonIcon @click="deleteTodo" v-if="!editing">
        <template v-slot:icon>
          <Delete />
        </template>
      </ButtonIcon>
      <ButtonIcon @click="updateTodo" v-if="editing && !todo.completed">
        <template v-slot:icon> <Save /> </template>
      </ButtonIcon>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useTodosStore, Todo } from "@/store/todos";
import Edit from "@/assets/edit.svg?component";
import Delete from "@/assets/delete.svg?component";
import Save from "@/assets/save.svg?component";
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
