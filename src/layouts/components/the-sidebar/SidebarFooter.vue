<template>
  <div
    class="footer flex items-center"
    :class="{'px-3': !sidebarCollapse}"
    style="height: 50px;"
  >
    <div
      v-show="!sidebarCollapse"
      class="relative w-3/4 h-full"
    >
      <div
        class="task absolute bottom-0 left-0 px-3
           bg-gray text-primary radius cursor-pointer overflow-hidden"
        :class="{'is-open bg-semi': isTaskOpen}"
        @click="isTaskOpen = true"
      >
        <!-- 头部 -->
        <div
          class="absolute w-full flex items-center"
          style="top: 14px;"
        >
          <feather
            class="mx-3"
            size="21"
            type="layers"
          ></feather>
          <div>我的任务</div>
          <div
            v-show="isTaskOpen"
            class="ml-auto mr-8 w-8 h-8 rounded-full flex-row-center bg-gray cursor-pointer"
            @click.stop="isTaskOpen = false"
          >
            <feather type="chevron-down"></feather>
          </div>
        </div>

        <!-- 今日任务 -->
        <div
          v-show="isTaskOpen"
          class="mt-6 py-10 overflow-hidden"
          style="height: 420px;"
        >
          <div class="mb-2 flex items-center">
            <p class="text-xl text-primary font-bold">今日任务</p>
            <div
              class="ml-3 mt-1 w-6 h-6 primary-semi bg-main-10
             flex-row-center rounded-lg cursor-pointer"
              @click="$store.commit('todo/SET_TODO_POPUP_STATUS', {status: true})"
            >
              <feather
                size="16"
                type="plus"
              ></feather>
            </div>
          </div>
          <VuePerfectScrollbar
            v-if="remainingTask.length > 0"
            class="w-full mb-4 overflow-hidden"
            style="max-height: 12rem;"
            :settings="{
              maxScrollbarLength: 160,
              wheelSpeed: 0.60,
            }"
          >
            <ul class="h-full">
              <li
                class="todo-item relative px-2 py-1 flex items-start"
                v-for="(it, i) in remainingTask"
                :key="i"
              >
                <i
                  class="el-icon-news mt-1 mr-3 primary text-2xl cursor-pointer"
                  @click="viewItem(it)"
                ></i>
                <div>
                  <div class="flex items-center ">
                    <div class="text-primary truncate">
                      {{ it.title }}
                    </div>
                    <el-dropdown>
                      <div class="flex items-center">
                        <feather
                          class="more-icon ml-4 text-gray transition opacity-0 cursor-pointer"
                          size="18"
                          type="more-horizontal"
                        ></feather>
                      </div>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="toggleType(it._id, 'is_done', !it.is_done)">
                          设为完成
                        </el-dropdown-item>
                        <template v-if="it.tags.length > 0">
                          <el-dropdown-item disabled>
                            <div class="py-2 flex items-center justify-end">
                              <div
                                class="w-3 h-1 ml-1 rounded-full"
                                v-for="(tag, i) in it.tags"
                                :key="i"
                                :class="`bg-${['main', 'warning', 'success', 'danger'][tag - 1]}`"
                              ></div>
                            </div>
                          </el-dropdown-item>
                        </template>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div class="truncate text-semi text-xs">{{ it.content }}1</div>
                </div>
              </li>
            </ul>
          </VuePerfectScrollbar>
          <p v-else>无任务</p>

          <div class="pt-5 flex justify-end">
            <div class="w-20">
              <div>
                <span class="text-sm">今日任务</span>
                <span class="font-bold"> {{ todayTask.length }}</span>
              </div>
              <div>
                <span class="text-sm">已完成</span>
                <span class="font-bold"> {{ todayTask.length - remainingTask.length }}</span>
              </div>
            </div>
            <div class="w-32">
              <vue-apex-charts
                type="radialBar"
                height="200px"
                width="200px"
                :options="radialBarOptions"
                :series="radialBarValue"
              ></vue-apex-charts>
            </div>
          </div>
        </div>

        <!-- 进度条 -->
        <div v-show="isTaskOpen">
          <div class="grid">
            <div
              class="text-sm"
              v-for="(it, i) in progress"
              :key="i"
              :title="`占比：${it.percent * 100}%`"
            >
              {{ it.label }}
              <vs-progress
                class="mt-0"
                :color="it.color"
                :percent="it.percent * 100"
              ></vs-progress>
            </div>
          </div>
        </div>

        <!-- 底部 -->
        <div
          v-show="isTaskOpen"
          class="absolute pl-4 pr-3 py-1 flex items-center cursor-pointer bg-gray radius"
          style="bottom: 10px; right: 10px;"
        >
          <div
            class="flex items-center text-gray"
            @click.stop="viewAll()"
          >
            <span class="mr-1 text-sm">查看全部</span>
            <feather
              size="16"
              type="chevron-right"
            ></feather>
          </div>
        </div>
      </div>
    </div>

    <div
      class="chat flex-row-center radius cursor-pointer"
      style="height: 50px; width: 50px; margin-left: 0.4rem;"
      @click="$store.commit('chat/SET_CHAT_OPEN')"
    >
      <feather
        class="chat-icon"
        size="21"
        type="message-square"
      ></feather>
    </div>

    <!-- 创建任务模态框 -->
    <TodoPopup :is-popup-active="showTodoPopup" />
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import TodoPopup from '@/views/todo-list/components/TodoPopup.vue'

const options = {
  labels: ['完成度'],
  chart: {
    offsetY: -30,
    offsetX: -40,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    radialBar: {
      hollow: {
        size: '55%',
        background: 'transparent',
        dropShadow: {
          enabled: true,
          top: 0,
          left: 0,
          blur: 3,
          opacity: 1,
        },
      },
      dataLabels: {
        name: {
          offsetY: -12,
          color: '#555',
          fontSize: '13px',
        },
        value: {
          offsetY: 5,
          color: '#555',
          fontSize: '25px',
          formatter: val => `${Number(val).toFixed(0)}%`,
        },
      },
    },
  },
  stroke: { lineCap: 'round' },
  colors: ['#6165f7'],
}
export default {
  name: 'SidebarFooter',
  components: {
    VuePerfectScrollbar,
    VueApexCharts,
    TodoPopup,
  },

  props: {
    sidebarCollapse: Boolean,
  },

  data: () => ({
    isTaskOpen: false,
  }),

  watch: {
    sidebarCollapse(v) {
      if (!v) {
        this.isTaskOpen = false
      }
    },
  },

  computed: {
    showTodoPopup() {
      return this.$store.state.todo.showTodoPopup
    },

    todayTask() {
      return this.$store.getters['todo/todayTask']
    },
    remainingTask() {
      return this.todayTask.filter(el => !el.is_done)
    },
    progress() {
      const progress = [
        { label: '前端', color: 'primary' },
        { label: '后端', color: 'warning' },
        { label: '其它', color: 'success' },
        { label: 'BUG', color: 'danger' },
      ]
      const allCount = [0, 0, 0, 0]
      const { todoList } = this.$store.state.todo
      todoList.forEach(({ tags, is_trashed }) => {
        if (tags.length > 0 && !is_trashed) {
          tags.forEach((tag) => { allCount[tag - 1] += 1 })
        }
      })

      const todayCount = [0, 0, 0, 0]
      this.todayTask.forEach(({ tags }) => {
        if (tags.length > 0) {
          tags.forEach((tag) => { todayCount[tag - 1] += 1 })
        }
      })

      todayCount
        .map((el, i) => el / allCount[i])
        .forEach((el, i) => {
          progress[i].percent = el
        })

      return progress
    },

    radialBarValue() {
      const doneNum = this.todayTask.length - this.remainingTask.length
      const percent = (doneNum / this.todayTask.length * 100) || 0
      return [percent]
    },
    radialBarOptions() {
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        return options
      }
      const opt = this.$cloneDeepWith(options)
      opt.plotOptions.radialBar.dataLabels.name.color = '#ccc'
      opt.plotOptions.radialBar.dataLabels.value.color = '#ccc'
      return opt
    },
  },

  methods: {
    viewItem(todo) {
      this.$store.commit('todo/SET_TODO_POPUP_STATUS', { status: true, data: todo })
    },

    viewAll() {
      this.$router.push('/todo-list')
      this.isTaskOpen = false
    },

    toggleType(todo_id, type, flag) {
      this.$store.dispatch('todo/updateTodoType', { todo_id, type, flag })
    },
  },
}
</script>

<style lang="scss" scoped>
.task {
  transition: all 0.3s;
  width: 95%;
  height: 50px;
  max-height: 100%;
  &.is-open {
    width: 450px;
    height: 600px;
    max-height: 600px;
    box-shadow: $base-shadow;
    cursor: default;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 10px;
  }

  .todo-item {
    max-width: 20rem;
    &:hover {
      .more-icon {
        opacity: 1;
      }
    }
  }
}
</style>
