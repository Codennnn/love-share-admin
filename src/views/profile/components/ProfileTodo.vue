<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div class="text-primary text-lg font-bold">任务列表</div>
      <div
        class="w-10 h-10 flex justify-center items-center primary radius cursor-pointer"
        style="background: rgba(var(--vs-primary), 0.1);"
        @click="showPopup = true"
      >
        <PlusIcon size="1.4x"></PlusIcon>
      </div>
    </div>
    <VuePerfectScrollbar
      class="pb-6 overflow-hidden"
      style="max-height: 300px;"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <ul>
        <li
          class="mb-4 flex"
          v-for="(it, i) in todoList"
          :key="i"
        >
          <div class="mr-2">
            <i
              class="text-lg"
              :class="it.is_done ? 'el-icon-check text-semi' : 'el-icon-news primary'"
            ></i>
          </div>
          <div style="width: 90%;">
            <div class="text-semi font-bold">{{ it.title }}</div>
            <p class="text-overflow text-sm text-gray">{{ it.content }}</p>
          </div>
        </li>
      </ul>
    </VuePerfectScrollbar>

    <TodoPopup
      :is-popup-active="showPopup"
      :todo="todo"
      @hidePopup="showPopup = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { PlusIcon } from 'vue-feather-icons'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import TodoPopup from '@/views/todo-list/components/TodoPopup.vue'

export default {
  name: 'ProfileTodo',
  components: {
    VuePerfectScrollbar,
    PlusIcon,
    TodoPopup,
  },

  data: () => ({
    todo: {
      title: '',
      content: '',
      tags: [],
      is_done: false,
      is_important: false,
      is_starred: false,
      is_trashed: false,
    },
    showPopup: false,
  }),

  computed: {
    ...mapState('todo', ['todoList']),
  },
}
</script>

<style lang="scss" scoped>
.text-overflow {
  @include textOverflow($width: 300px, $line: 2);
}
</style>
