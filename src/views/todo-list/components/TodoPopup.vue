<template>
  <vs-popup
    class="todo-popup"
    :title="task._id ? '编辑任务' : '添加任务'"
    :active.sync="isPopupActiveLocal"
  >
    <!-- 选择标签 -->
    <div class="flex items-center justify-between">
      <div class="todo-tag__group flex items-center">
        <template v-for="(tag, i) in task.tags">
          <div
            class="task-tag flex items-center"
            v-if="tag"
            :key="i"
          >
            <span
              class="w-2 h-2 mr-2 rounded-full"
              :class="`bg-${tags[tag].color}`"
            ></span>
            <span>{{ tags[tag].text }}</span>
          </div>
        </template>
      </div>
      <div class="flex items-center">
        <feather
          size="19"
          type="bookmark"
          class="mr-2 text-gray cursor-pointer"
          :class="{'success': task.is_important}"
          @click="$set(task, 'is_important', !task.is_important)"
        ></feather>
        <feather
          size="19"
          type="star"
          class="mr-2 text-gray cursor-pointer"
          :class="{'warning': task.is_starred}"
          @click="$set(task, 'is_starred', !task.is_starred)"
        ></feather>
        <!-- 选择任务的标签 -->
        <el-dropdown>
          <feather
            size="19"
            type="tag"
            class="mt-2 text-gray"
          ></feather>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(tag, i) in tags"
              :key="i"
            >
              <vs-checkbox
                :vs-value="tag.type"
                v-model="task.tags"
                @click.stop
              >{{ tag.text }}</vs-checkbox>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 标题输入框 -->
    <div class="w-full pt-2">
      <!-- 输入标题框 -->
      <vs-input
        class="w-full no-dark"
        label-placeholder="标题"
        v-model.trim="task.title"
      />
    </div>

    <!-- 任务描述框 -->
    <vs-textarea
      class="mt-4"
      label="任务描述"
      v-model="task.content"
      :height="String(80)"
    />

    <!-- 计划完成日期 -->
    <div>
      <div class="mb-1 text-gray text-xs">计划完成日期</div>
      <el-date-picker
        class="no-dark"
        type="daterange"
        value-format="timestamp"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        v-model="task.complete_time"
      >
      </el-date-picker>
    </div>

    <div class="mt-2 flex justify-end">
      <vs-button
        color="#848484"
        type="flat"
        @click="isPopupActiveLocal = false"
      >取消</vs-button>
      <vs-button
        id="confirmBtn"
        class="vs-con-loading__container"
        :disabled="disabled || loading"
        @click="confirm"
      >{{ task._id ? '完成修改' : '添加任务' }}</vs-button>
    </div>
  </vs-popup>
</template>

<script>
const tags = {
  1: {
    text: '前端',
    color: 'primary',
    type: 1,
  },
  2: {
    text: '后端',
    color: 'warning',
    type: 2,
  },
  3: {
    text: '其它',
    color: 'success',
    type: 3,
  },
  4: {
    text: 'BUG',
    color: 'danger',
    type: 4,
  },
}
export default {
  name: 'TodoPopup',
  props: {
    isPopupActive: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    tags,
    task: {},
    loading: false,
    isPopupActiveLocal: false,
  }),

  watch: {
    isPopupActive: {
      handler(v) {
        this.isPopupActiveLocal = v
      },
      immediate: true,
    },
    isPopupActiveLocal(v) {
      if (!v) {
        // 关闭模态框
        this.$store.commit('todo/SET_TODO_POPUP_STATUS', { status: false })
      }
    },
    todoData(data) {
      this.task = this.$cloneDeepWith(data)
    },
  },

  computed: {
    todoData() {
      return this.$store.state.todo.todoData
    },
    disabled() {
      return !((this.task.title?.length > 0) && (this.task.complete_time?.length > 0))
    },
  },

  methods: {
    confirm() {
      if (this.task?._id) {
        this.updateTodo()
      } else {
        this.addTodo()
      }
    },

    async addTodo() {
      this.loading = true
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#confirmBtn',
        scale: 0.45,
      })
      try {
        await this.$store.dispatch('todo/addTodo', this.task)
        this.isPopupActiveLocal = false
      } finally {
        this.$vs.loading.close('#confirmBtn > .con-vs-loading')
        this.loading = false
      }
    },

    async updateTodo() {
      this.loading = true
      this.$vs.loading({
        background: 'primary',
        color: '#fff',
        container: '#confirmBtn',
        scale: 0.45,
      })
      try {
        await this.$store.dispatch('todo/updateTodo', this.task)
        this.isPopupActiveLocal = false
      } finally {
        this.$vs.loading.close('#confirmBtn > .con-vs-loading')
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 重设弹出框的宽度
.todo-popup::v-deep {
  .vs-popup {
    width: 450px;
  }
}

// 弹出框的 mark 标签
.todo-tag__group {
  height: 30px;
  .task-tag {
    margin: 0 5px;
    padding: 3px 10px;
    border-radius: 10px;
    font-size: 14px;
    background-color: #e6e6e6;
  }
}
</style>

<style>
.el-picker-panel {
  z-index: 99999 !important;
}
</style>
