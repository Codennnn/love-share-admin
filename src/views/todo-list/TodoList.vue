<template>
  <div class="pt-8">
    <div class="flex">
      <!-- 待办事项操作栏 -->
      <div style="width: 25%;">
        <TodoBar />
      </div>

      <!-- 待办事项列表 -->
      <div style="width: 75%;">
        <TodoItem />
      </div>
    </div>
  </div>
</template>

<script>
import TodoBar from './components/TodoBar.vue'
import TodoItem from './components/TodoItem.vue'

export default {
  name: 'TodoList',
  components: { TodoBar, TodoItem },
}
</script>
