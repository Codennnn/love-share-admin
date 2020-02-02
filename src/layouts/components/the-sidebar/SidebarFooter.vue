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
            v-if="todayTask.length > 0"
            class="w-full mb-4 overflow-hidden"
            style="max-height: 12rem;"
            :settings="{
              maxScrollbarLength: 160,
              wheelSpeed: 0.60,
            }"
          >
            <ul class="h-full">
              <li
                class="todo-item relative px-2 py-1 flex"
                v-for="(it, i) in todayTask"
                :key="i"
              >
                <i
                  class="el-icon-news mt-1 mr-3 text-2xl cursor-pointer"
                  :class="it.is_done ? 'text-gray' : 'primary'"
                  @click.stop="toggleType(it._id, 'is_done', !it.is_done)"
                ></i>
                <div class="flex-1">
                  <div
                    class="flex items-center"
                    :class="it.is_done ? 'text-gray' : 'text-primary'"
                  >
                    {{ it.title }}
                  </div>
                  <div class="w-64 truncate text-semi text-xs">{{ it.content }}</div>
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
                <span class="font-bold"> {{ todayDoneTaskNum }}</span>
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
            >
              {{ it.label }}
              <vs-progress
                :title="it.percent"
                class="mt-0"
                :color="it.color"
                :percent="it.percent"
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
import _cloneDeepWith from 'lodash/cloneDeepWith'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import TodoPopup from '@/views/todo-list/components/TodoPopup.vue'

const progress = [
  { label: '前端', color: 'primary', percent: 50 },
  { label: '后端', color: 'warning', percent: 70 },
  { label: '其它', color: 'success', percent: 20 },
  { label: 'BUG', color: 'danger', percent: 10 },
]
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
    progress,
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
      const allTask = this.$store.getters['todo/filterItems']({})
      return allTask.filter((it) => {
        const start = this.$dayjs(it.complete_time[0])
        const end = this.$dayjs(it.complete_time[1])
        return (this.$dayjs().isSame(end, 'day') || this.$dayjs().isAfter(start, 'day'))
         && (this.$dayjs().isSame(end, 'day') || this.$dayjs().isBefore(end, 'day'))
      })
    },
    todayDoneTaskNum() {
      return this.todayTask.filter(el => el.is_done).length
    },
    radialBarValue() {
      const percent = (this.todayDoneTaskNum / this.todayTask.length * 100) || 0
      return [percent]
    },
    radialBarOptions() {
      const theme = this.$store.state.themeStyle
      if (theme === 'light') {
        return options
      }
      const opt = _cloneDeepWith(options)
      opt.plotOptions.radialBar.dataLabels.name.color = '#ccc'
      opt.plotOptions.radialBar.dataLabels.value.color = '#ccc'
      return opt
    },
  },

  methods: {
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
}
</style>
