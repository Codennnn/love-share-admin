<template>
  <div>
    <div class="w-1/2">
      <div class="flex justify-between items-center">
        <div class="text-primary text-lg font-bold">任务列表</div>
        <div
          class="w-10 h-10 flex justify-center items-center primary radius cursor-pointer"
          style="background: rgba(var(--vs-primary), 0.1);"
        >
          <i class="el-icon-plus"></i>
        </div>
      </div>
      <ul>
        <li
          v-for="(it, i) in todoList"
          :key="i"
        >
          <div>{{ it.title }}</div>
          <p></p>
        </li>
      </ul>
    </div>

    <ul>
      <li
        class="text-gray text-sm"
        v-for="(it, i) in log"
        :key="i"
      >
        <div v-if="it.position.code === 1">{{ it.position.regeocode.formatted_address }}</div>
        <div v-else>未记录位置</div>
        <div>
          <span>登录设备</span>
          <span class="text-xs">{{ it.device }}</span>
        </div>
        <div>
          <span>时间</span>
          <span>{{ $dayjs(it.created_at).format('YYYY/MM/DD HH:mm:ss') }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSignLog } from '@/request/api/admin'

export default {
  data: () => ({
    log: {},
  }),

  computed: {
    ...mapState('todo', ['todoList']),
  },

  created() {
    this.$store.commit('SET_NAV_TYPE', 'hidden')
    this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', true)

    this.getSignLog()
  },

  destroyed() {
    this.$store.commit('SET_NAV_TYPE', 'fixed')
    this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false)
  },

  methods: {
    async getSignLog() {
      const { code, data } = await getSignLog()
      if (code === 2000) {
        this.log = data.log
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
