<template>
  <div
    class="p-6 flex flex-col items-center bg-gray"
    style="width: 320px;"
  >
    <div class="w-full mb-5 flex justify-between items-center text-semi">
      <span>个人中心</span>
      <vs-dropdown vs-trigger-click>
        <MoreVerticalIcon size="1.2x"></MoreVerticalIcon>
        <vs-dropdown-menu class="w-24">
          <vs-dropdown-item class="text-sm text-center">
            编辑信息
          </vs-dropdown-item>
          <vs-dropdown-item class="text-sm text-center">
            退出登录
          </vs-dropdown-item>
        </vs-dropdown-menu>
      </vs-dropdown>
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
    <h3 class="mt-1 text-xl text-primary">{{ info.nickname }}</h3>
    <h4 class="text-semi text-xs">{{ info.email }}</h4>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { MoreVerticalIcon } from 'vue-feather-icons'

export default {
  name: 'TheProfileBar',
  components: { MoreVerticalIcon },
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
