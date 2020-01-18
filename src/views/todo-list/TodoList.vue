<template>
  <div class="pt-8">
    <div class="flex">
      <!-- 待办事项操作栏 -->
      <div class="todo-bar">
        <TodoBar @addNewTodo="addNewTodo" />
      </div>

      <!-- 待办事项列表 -->
      <div class="todo-item">
        <TodoItem @editTodo="editTodo" />
      </div>

    </div>

    <TodoPopup
      :is-popup-active="showPopup"
      :todo="todo"
      @hidePopup="showPopup = false"
    />

  </div>
</template>

<script>
import TodoBar from './components/TodoBar.vue'
import TodoItem from './components/TodoItem.vue'
import TodoPopup from './components/TodoPopup.vue'

export default {
  name: 'TodoList',
  components: {
    TodoBar,
    TodoItem,
    TodoPopup,
  },

  data: () => ({
    showPopup: false,
    todo: {},
  }),

  methods: {
    addNewTodo() {
      this.showPopup = true
      this.todo = {
        title: '',
        content: '',
        tags: [],
        is_done: false,
        is_important: false,
        is_starred: false,
        is_trashed: false,
      }
    },

    editTodo(todo) {
      this.showPopup = true
      this.todo = todo
    },
  },
}
</script>

<style lang="scss" scoped>
.todo-bar {
  width: 25%;
}

.todo-item {
  width: 75%;
}
</style>
