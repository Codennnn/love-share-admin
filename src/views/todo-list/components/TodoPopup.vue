<template>
  <vs-popup
    class="todo-popup"
    v-if="task"
    :title="task._id ? '编辑任务' : '添加任务'"
    :active.sync="isPopupActiveLocal"
  >
    <vs-row class="todo-tag flex items-center justify-center">
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
        <div class="todo-icon__group">
          <i
            class="icon el-icon-collection-tag cursor-pointer"
            :class="{success: task.is_important}"
            @click="task.is_important = !task.is_important"
          ></i>
          <i
            class="icon el-icon-star-off cursor-pointer"
            :class="{warning: task.is_starred}"
            @click="task.is_starred = !task.is_starred"
          ></i>
          <!-- 选择任务的标签 -->
          <vs-dropdown>
            <i class="icon el-icon-price-tag"></i>
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
          :height="String(150)"
        />
      </vs-col>
    </vs-row>

    <div class="todo-button mt-2">
      <vs-button
        color="#848484"
        type="flat"
        @click="isPopupActive = false"
      >取消</vs-button>
      <vs-button
        style="margin-left: .5rem"
        color="primary"
        type="filled"
        :disabled="task.title && task.title.length === 0"
        @click="confirm"
      >{{ task._id ? '完成修改' : '添加任务' }}</vs-button>
    </div>
  </vs-popup>
</template>

<script>
import _isEqual from 'lodash/isEqual'
import _cloneDeepWith from 'lodash/cloneDeepWith'

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
    tempTodo: '',
    isPopupActiveLocal: false,
  }),

  watch: {
    isPopupActive: {
      handler(v) {
        this.isPopupActiveLocal = v
      },
      immediate: true,
    },
    todo: {
      handler(v) {
        this.task = _cloneDeepWith(v)
      },
      immediate: true,
    },
    isPopupActiveLocal: {
      handler(v) {
        if (!v) {
          this.$emit('hidePopup')
        }
      },
      immediate: true,
    },
  },

  methods: {
    confirm() {
      /* eslint-disable */
      this.task && this.task.id ? this.editTodo() : this.addTodo();
    },

    addTodo() {
      Bus.$emit('getAddedTodo', this.task);
    },

    // 编辑修改 todo 项
    editTodo() {
      if (!_isEqual(this.task, this.refTodo)) {
        // 判断是否相等，如果否，说明有修改过，触发下面的 Bus.$emit
      } else {
        this.isPopupActive = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-popup::v-deep {
  // 重设弹出框的宽度
  .vs-popup {
    width: 450px;
  }
}

// 弹出框的mark标签
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

// .vs-dropdown-menu::v-deep .material-icons {
//   font-size: inherit;
// }

// 弹出框底部的按钮
.todo-button {
  display: flex;
  justify-content: flex-end;
}
</style>
