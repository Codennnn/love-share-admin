<template>
  <div>
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
          <span>{{ it.device }}</span>
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
import { getSignLog } from '@/request/api/admin'

export default {
  data: () => ({
    log: {},
  }),

  computed: {
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
