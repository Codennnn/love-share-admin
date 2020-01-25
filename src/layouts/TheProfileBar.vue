<template>
  <div
    class="p-6 flex flex-col items-center bg-gray"
    style="width: 320px;"
  >
    <div class="w-full mb-5 flex justify-between items-center text-semi">
      <span>个人中心</span>
      <i class="el-icon-setting text-lg cursor-pointer"></i>
    </div>

    <div class="relative">
      <vs-avatar
        size="90px"
        :src="info.avatar_url"
      />
      <div
        class="absolute w-6 h-6 flex-row-center rounded-full"
        style="bottom: 10px; right: 10px;"
        :style="`background: rgba(var(--vs-${genderColor}), 0.8);`"
      >
        <i
          class="text-white"
          :class="info.gender === 0 ? 'el-icon-male' : 'el-icon-female'"
          style="font-size: 0.85rem;"
        ></i>
      </div>
    </div>
    <h3 class="my-2 text-xl text-primary">{{ info.nickname }}</h3>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'TheProfileBar',
  data: () => ({

  }),

  computed: {
    ...mapState('admin', ['info']),
    genderColor() {
      return this.info.gender ? 'danger' : 'primary'
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
