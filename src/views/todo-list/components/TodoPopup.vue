<template>
  <vs-popup
    class="todo-popup"
    :title="task._id ? '编辑任务' : '添加任务'"
    :active.sync="isPopupActiveLocal"
  >
    <vs-row class="flex items-center justify-center">
      <vs-col vs-w="9">
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
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="flex-end"
        vs-w="3"
      >
        <div class="todo-icon__group flex items-center">
          <BookmarkIcon
            size="1.4x"
            stroke-width="1.5px"
            class="mr-2 text-gray cursor-pointer"
            :class="{success: task.is_important}"
            @click="task.is_important = !task.is_important"
          />
          <StarIcon
            size="1.4x"
            stroke-width="1.5px"
            class="mr-2 text-gray cursor-pointer"
            :class="{warning: task.is_starred}"
            @click="task.is_starred = !task.is_starred"
          />
          <!-- 选择任务的标签 -->
          <vs-dropdown>
            <TagIcon
              size="1.4x"
              stroke-width="1.5px"
              class="text-gray"
            />
            <vs-dropdown-menu>
              <vs-dropdown-item
                v-for="(tag, i) in tags"
                :key="i"
              >
                <vs-checkbox
                  :vs-value="tag.type"
                  v-model="task.tags"
                  @click.stop
                >{{ tag.text }}</vs-checkbox>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>
      </vs-col>
    </vs-row>

    <vs-row>
      <vs-col
        class="pt-3"
        vs-w="12"
      >
        <div class="w-full">
          <!-- 输入标题框 -->
          <vs-input
            class="w-full"
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
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-model="task.complete_time"
          >
          </el-date-picker>
        </div>
      </vs-col>
    </vs-row>

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
import _cloneDeepWith from 'lodash/cloneDeepWith'
import { BookmarkIcon, StarIcon, TagIcon } from 'vue-feather-icons'

const tags = {
  1: {
    text: '前端',
    color: 'main',
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
  components: { BookmarkIcon, StarIcon, TagIcon },
  props: {
    isPopupActive: {
      type: Boolean,
      required: true,
    },
    todo: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    tags,
    task: null,
    loading: false,
    isPopupActiveLocal: false,
  }),

  watch: {
    todo: {
      handler(todo) {
        this.task = _cloneDeepWith(todo)
      },
      immediate: true,
    },
    isPopupActive: {
      handler(v) {
        this.isPopupActiveLocal = v
      },
      immediate: true,
    },
    isPopupActiveLocal(v) {
      if (!v) {
        this.$emit('hidePopup')
      }
    },
  },

  computed: {
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

// 弹出框的图标
.todo-icon__group {
  .icon {
    margin-left: 8px;
    font-size: 18px;
    transition: all 0.2s;
    color: #848484;
  }
}
</style>

<style>
.el-picker-panel {
  z-index: 99999 !important;
}
</style>
