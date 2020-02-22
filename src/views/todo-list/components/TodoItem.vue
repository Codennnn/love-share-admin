<template>
  <div class="h-full">
    <div class="flex items-center">
      <!-- 搜索框 -->
      <div
        class="relative flex-1 radius overflow-hidden"
        style="background: rgba(var(--vs-primary), 0.065);"
      >
        <div
          class="absolute left-0 z-50 h-full flex-row-center radius bg-primary-10 cursor-pointer"
          style="width: 50px; height: 50px;"
        >
          <feather
            class="primary-semi"
            type="search"
          ></feather>
        </div>
        <vs-input
          class="search-input sticky top-0 z-40 w-full"
          style="height: 50px; background: transparent;"
          size="large"
          placeholder="搜索..."
          v-model.lazy.trim="search"
        />
      </div>

      <div
        class="ml-4 w-24 py-3 flex-row-center text-sm radius cursor-pointer"
        style="transition: all 0.3s;"
        :class="{'primary-semi bg-primary-10': onlyToday, 'text-primary base-shadow ': !onlyToday}"
        @click="onlyToday = !onlyToday"
      >
        今日任务
      </div>
    </div>

    <VuePerfectScrollbar
      class="relative h-full pt-4"
      style="max-height: 636px;"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <!-- Todo项 -->
      <FlipList>
        <li
          class="todo-item p-3 w-full"
          v-for="todo in tasks"
          :key="todo._id"
          @click="$store.commit('todo/SET_TODO_POPUP_STATUS', {status: true, data: todo})"
        >
          <vs-row>
            <!-- todo项头部左侧 -->
            <vs-col vs-w="10">
              <div class="todo-item__header flex justify-between items-center">
                <div class="flex justify-between items-center">
                  <vs-checkbox
                    v-model="todo.is_done"
                    @click.stop="toggleType(todo._id, 'is_done', !todo.is_done)"
                  ></vs-checkbox>
                  <div
                    class="truncate mr-3 text-primary"
                    style="max-width: 12rem;"
                  >{{ todo.title }}</div>
                  <template v-if="todo.tags.length > 0">
                    <div
                      class="mr-1 flex justify-between items-center
                      rounded-full py-1 px-3 bg-gray"
                      v-for="tag in todo.tags"
                      :key="tag"
                    >
                      <!-- 标签胶囊前面的颜色点 -->
                      <span
                        class="w-2 h-2 mr-2 rounded-full"
                        :class="`bg-${tags[tag].color}`"
                      ></span>
                      <span class="text-gray text-xs">{{ tags[tag].text }}</span>
                    </div>
                  </template>
                </div>
              </div>
            </vs-col>
            <!-- todo项头部右侧 -->
            <vs-col
              vs-type="flex"
              vs-justify="flex-end"
              vs-w="2"
            >
              <div
                v-if="!todo.is_trashed"
                class="flex items-center text-gray"
              >
                <feather
                  size="19"
                  type="bookmark"
                  class="todo-mark__icon mr-2"
                  :class="{success: todo.is_important}"
                  @click.stop="toggleType(todo._id, 'is_important', !todo.is_important)"
                ></feather>
                <feather
                  size="19"
                  type="star"
                  class="todo-mark__icon mr-2"
                  :class="{warning: todo.is_starred}"
                  @click.stop="toggleType(todo._id, 'is_starred', !todo.is_starred)"
                ></feather>
                <feather
                  size="19"
                  type="trash-2"
                  class="todo-mark__icon"
                  @click.stop="toggleType(todo._id, 'is_trashed', !todo.is_trashed)"
                ></feather>
              </div>
              <div v-else>
                <i
                  title="还原"
                  class="todo-mark__icon mr-2 el-icon-upload2"
                  @click.stop="toggleType(todo._id, 'is_trashed', !todo.is_trashed)"
                ></i>
                <i
                  title="永久删除"
                  class="todo-mark__icon el-icon-close"
                  @click.stop="$store.dispatch('todo/deleteTodo', todo._id)"
                ></i>
              </div>
            </vs-col>
          </vs-row>
          <!-- todo项内容区域 -->
          <div class="p-2 pr-0 flex justify-between">
            <p class="content-overflow pr-5 text-gray">{{ todo.content }}</p>
            <div class="text-xs text-gray">
              {{ $dayjs(todo.complete_time[0]).format('YYYY-MM-DD') }}
              至
              {{ $dayjs(todo.complete_time[1]).format('YYYY-MM-DD') }}
            </div>
          </div>
        </li>
        <li
          key="123456"
          v-if="tasks.length === 0"
          class="todo-item w-full p-10 text-center text-gray"
        >
          <p>
            (｡•ˇ‸ˇ•｡) <br>
            无任务
          </p>
        </li>
      </FlipList>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import FlipList from '@/components/FlipList.vue'

const tags = {
  1: { text: '前端', color: 'primary' },
  2: { text: '后端', color: 'warning' },
  3: { text: '其它', color: 'success' },
  4: { text: 'BUG', color: 'danger' },
}
export default {
  name: 'TodoItem',
  components: { VuePerfectScrollbar, FlipList },

  data: () => ({
    tags,
    search: '',
    onlyToday: false,
  }),

  computed: {
    currentSelected() {
      return this.$store.state.todo.currentSelected
    },
    filterItems() {
      return this.$store.getters['todo/filterItems'](this.currentSelected)
    },
    queryItems() {
      if (this.search.length <= 0) {
        return this.filterItems
      }
      return this.filterItems.filter(it => it.title.indexOf(this.search) !== -1)
    },
    tasks() {
      if (this.onlyToday) {
        return this.$store.getters['todo/todayTask'].filter(el => this.queryItems.includes(el))
      }
      return this.queryItems
    },
  },

  methods: {
    toggleType(todo_id, type, flag) {
      this.$store.dispatch('todo/updateTodoType', { todo_id, type, flag })
    },
  },
}
</script>

<style lang="scss" scoped>
// 重设输入框样式
.search-input::v-deep {
  $padding: 0.9rem 0.6rem 0.6rem 4rem !important;
  .vs-inputx {
    padding: $padding;
  }
  .input-span-placeholder {
    padding: $padding;
  }
}

.todo-item {
  transition: all 0.5s;
  &:hover {
    transition: all 0.2s;
    transform: translateY(-4px);
  }
  // 标记的图标样式
  .todo-mark__icon {
    transition: all 0.2s;
    cursor: pointer;
  }
  .content-overflow {
    @include textOverflow($width: 500px, $line: 2);
  }
}
</style>
