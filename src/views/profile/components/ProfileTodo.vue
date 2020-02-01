<template>
  <div>
    <div class="mb-6 flex justify-between items-center">
      <div class="text-primary text-lg font-bold">任务列表</div>
      <div
        class="w-10 h-10 flex justify-center items-center
         primary-semi bg-main-10 radius cursor-pointer"
        @click="$store.commit('todo/SET_TODO_POPUP_STATUS', true)"
      >
        <PlusIcon size="1.4x"></PlusIcon>
      </div>
    </div>
    <VuePerfectScrollbar
      class="overflow-hidden"
      style="max-height: 300px;"
      :class="{'pb-6': filterItems.length > 5}"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <ul>
        <li
          class="mb-4 flex"
          v-for="(it, i) in filterItems"
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
            <p class="content-overflow text-sm text-gray">{{ it.content }}</p>
          </div>
        </li>

        <li
          v-if="filterItems.length === 0"
          class="p-5 flex-row-center bg-gray radius text-semi"
        >
          <p class="text-center">
            ✧*｡٩(ˊωˋ*)و✧*｡ <br>
            <span class="text-sm">没有任务</span>
          </p>
        </li>
      </ul>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import { PlusIcon } from 'vue-feather-icons'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'ProfileTodo',
  components: {
    VuePerfectScrollbar,
    PlusIcon,
  },

  computed: {
    filterItems() {
      return this.$store.getters['todo/filterItems']({})
    },
  },
}
</script>

<style lang="scss" scoped>
.content-overflow {
  @include textOverflow($width: 300px, $line: 2);
}
</style>
