<template>
  <div class="py-6">
    <div class="w-1/2">
      <div class="mb-6 flex justify-between items-center">
        <div class="text-primary text-lg font-bold">任务列表</div>
        <div
          class="w-10 h-10 flex justify-center items-center primary radius cursor-pointer"
          style="background: rgba(var(--vs-primary), 0.1);"
        >
          <PlusIcon size="1.4x"></PlusIcon>
        </div>
      </div>
      <ul>
        <li
          class="mb-4 flex"
          v-for="(it, i) in todoList"
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
            <p class="text-overflow text-sm text-gray">{{ it.content }}</p>
          </div>
        </li>
      </ul>
    </div>

    <div class="w-1/2">
      <h2 class="mb-2 text-primary text-lg font-bold">登录日志</h2>
      <ul>
        <li
          class="mb-4 p-3 text-gray text-sm bg-gray radius"
          v-for="(it, i) in log"
          :key="i"
        >
          <div v-if="it.position.code === 1">
            <i class="el-icon-map-location mr-1"></i>
            <span>{{ it.position.regeocode.formatted_address }}</span>
          </div>
          <div v-else>
            <i class="el-icon-warning-outline mr-1"></i>
            <span>未记录位置</span>
          </div>
          <div
            title="登录设备"
            class="my-2"
          >
            <i class="el-icon-monitor mr-1"></i>
            <span class="text-xs">{{ it.device }}</span>
          </div>
          <div title="登录时间">
            <i class="el-icon-time mr-1"></i>
            <span class="text-xs">{{ $dayjs(it.created_at).format('YYYY/MM/DD HH:mm:ss') }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { PlusIcon } from 'vue-feather-icons'

import { getSignLog } from '@/request/api/admin'

export default {
  name: 'Profile',
  components: {
    PlusIcon,
  },

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
.text-overflow {
  @include textOverflow($width: 300px, $line: 2);
}
</style>
