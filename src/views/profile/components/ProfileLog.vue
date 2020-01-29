<template>
  <div class="relative overflow-hidden">
    <h2 class="mb-2 text-primary text-lg font-bold">登录日志</h2>
    <VuePerfectScrollbar
      class="pb-6 overflow-hidden"
      style="max-height: 350px;"
      :settings="{
          maxScrollbarLength: 200,
          wheelSpeed: 0.60,
        }"
    >
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
    </VuePerfectScrollbar>
    <div
      class="shadow-hidden absolute bottom-0 py-3 bg-primary bg-gray-200"
      style="width: 110%; left: 50%; transform: translateX(-50%);"
    ></div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { getSignLog } from '@/request/api/admin'

export default {
  name: 'ProfileLog',
  components: { VuePerfectScrollbar },

  data: () => ({
    log: {},
  }),

  created() {
    this.getSignLog()
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
