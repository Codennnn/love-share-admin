<template>
  <div class="todo-items">
    <VuePerfectScrollbar
      class="scroll-area"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <!-- 搜索框 -->
      <vs-input
        class="search-input sticky top-0 z-40 w-full radius bg-gray overflow-hidden"
        icon="search"
        size="large"
        icon-no-border
        placeholder="搜索..."
        v-model="search"
      />

      <!-- Todo项 -->
      <transition-group
        tag="ul"
        name="flip-list"
        enter-active-class="animated fadeInUp faster"
        leave-active-class="animated fadeOutDown faster"
      >
        <li
          class="todo-item p-3 w-full cursor-pointer"
          v-for="todo in filterItems"
          :key="todo._id"
          @click="$emit('editTodo', todo)"
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
                  <div class="todo-item__title mr-3">{{ todo.title }}</div>
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
            <!-- end -->
            <!-- todo项头部右侧 -->
            <vs-col
              vs-type="flex"
              vs-justify="flex-end"
              vs-w="2"
            >
              <div>
                <i
                  class="todo-mark__icon el-icon-collection-tag text-semi"
                  :class="{success: todo.is_important}"
                  @click.stop="toggleType(todo._id, 'is_important', !todo.is_important)"
                ></i>
                <i
                  class="todo-mark__icon el-icon-star-off text-semi"
                  :class="{warning: todo.is_starred}"
                  @click.stop="toggleType(todo._id, 'is_starred', !todo.is_starred)"
                ></i>
                <i
                  class="todo-mark__icon el-icon-delete text-semi"
                  @click.stop="toggleType(todo._id, 'is_trashed', !todo.is_trashed)"
                ></i>
              </div>
            </vs-col>
            <!-- end -->
          </vs-row>
          <!-- todo项内容区域 -->
          <div class="p-2 pr-16">
            <p class="content-overflow text-gray">{{ todo.content }}</p>
          </div>
        </li>
      </transition-group>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const tags = {
  1: {
    text: '前端',
    color: 'main',
  },
  2: {
    text: '后端',
    color: 'warning',
  },
  3: {
    text: '其它',
    color: 'success',
  },
  4: {
    text: 'BUG',
    color: 'danger',
  },
}
export default {
  name: 'TodoItem',
  components: { VuePerfectScrollbar },

  data() {
    return {
      tags,
      search: '',
    }
  },

  computed: {
    currentSelected() {
      return this.$store.state.todo.currentSelected
    },
    filterItems() {
      return this.$store.getters['todo/filterItems'](this.currentSelected)
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
.scroll-area {
  position: relative;
  height: 686px;
}

.search-input::v-deep {
  // 重设输入框样式
  .vs-inputx {
    padding-left: 2.4rem;
    border: none !important;
    box-shadow: none;
  }
  .input-span-placeholder {
    padding-left: 2.5rem;
  }
  .vs-input--icon {
    top: 0.7rem;
    left: 0.5rem;
    font-size: 25px;
  }
}

.todo-item__title {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-overflow {
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.flip-list-move {
  transition: transform 1s;
}

.todo-item {
  &:hover {
    // box-shadow: 0 3px 10px 0 #ccc;
    transform: translateY(-4px);
    transition: all 0.2s;
  }
  // 标记的图标样式
  .todo-mark__icon {
    padding: 6px;
    font-size: 18px;
    transition: all 0.2s;
    cursor: pointer;
  }
}
</style>
