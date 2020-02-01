<template>
  <div class="px-6 py-2 bg-primary">
    <!-- 添加任务按钮 -->
    <div class="text-center">
      <vs-button
        class="w-48"
        @click="$store.commit('todo/SET_TODO_POPUP_STATUS', {status: true})"
      >添加任务</vs-button>
    </div>

    <div class="py-5">
      <div
        class="label-item text-semi"
        :class="{'primary': !currentSelected.type}"
        @click="setActive()"
      >
        <feather
          class="mr-2"
          size="22"
          stroke-width="1.8"
          type="layers"
        ></feather>
        <span class="label-text">所有任务</span>
      </div>
    </div>

    <vs-divider />

    <!-- 筛选项 -->
    <div class="py-5">
      <div class="text-lg text-primary">筛 选</div>
      <div
        class="label-item text-semi"
        v-for="(item, i) in labelItems"
        :key="i"
        :class="{'primary': currentSelected.value === item.value}"
        @click="setActive('filter', item.value)"
      >
        <feather
          class="mr-2"
          size="22"
          stroke-width="1.8"
          :type="item.icon"
        ></feather>
        <span>{{ item.text }}</span>
      </div>
    </div>

    <vs-divider />

    <!-- 标签项 -->
    <div class="py-5">
      <div class="text-lg text-primary">标 签</div>
      <div
        class="label-item  text-semi"
        v-for="(item, i) in labelMarks"
        :key="i + 10"
        :class="{'primary': currentSelected.value === item.value}"
        @click="setActive('tag', item.value)"
      >
        <div
          class="w-3 h-3 rounded-full"
          :class="`bg-${item.color}`"
        ></div>
        <span class="ml-2">{{ item.text }}</span>
      </div>
    </div>

  </div>
</template>

<script>
const labelItems = [
  {
    icon: 'bookmark',
    text: '重要事项',
    value: 'is_important',
  },
  {
    icon: 'star',
    text: '星号标记',
    value: 'is_starred',
  },
  {
    icon: 'check-square',
    text: '已完成',
    value: 'is_done',
  },
  {
    icon: 'trash-2',
    text: '丢弃的',
    value: 'is_trashed',
  },
]
const labelMarks = [
  { color: 'main', text: '前端', value: 1 },
  { color: 'warning', text: '后端', value: 2 },
  { color: 'success', text: '其它', value: 3 },
  { color: 'danger', text: 'BUG', value: 4 },
]
export default {
  name: 'TodoBar',
  data: () => ({
    labelItems,
    labelMarks,
  }),

  computed: {
    currentSelected() {
      return this.$store.state.todo.currentSelected
    },
  },

  methods: {
    // 设置当前激活的项
    setActive(type, value) {
      this.$store.commit('todo/SET_CURRENT_SELECTED', { type, value })
    },
  },
}
</script>

<style lang="scss">
.label-item {
  display: flex;
  align-items: center;
  margin-top: 20px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    transform: translateX(5px);
  }
}
</style>
