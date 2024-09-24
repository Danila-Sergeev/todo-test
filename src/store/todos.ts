import { defineStore } from "pinia";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [] as Todo[],
  }),
  actions: {
    addTodo(text: string) {
      const newTodo: Todo = {
        id: Date.now(),
        text,
        completed: false,
      };
      this.todos.push(newTodo);
      this.saveTodos();
    },
    updateTodo(todo: Todo) {
      const index = this.todos.findIndex((t: Todo) => t.id === todo.id);
      if (index !== -1) {
        this.todos[index] = todo;
        this.saveTodos();
      }
    },
    deleteTodo(id: number) {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
      this.saveTodos();
    },
    loadTodos() {
      const storedTodos = localStorage.getItem("todos");
      if (storedTodos) {
        this.todos = JSON.parse(storedTodos);
      }
    },
    saveTodos() {
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },
  },
});
