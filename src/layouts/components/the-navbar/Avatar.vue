<template>
  <div class="flex items-center">
    <!-- 用户名称 -->
    <div class="user-text mr-2 text-right">
      <div class="text-right text-lg">{{ nickname }}</div>
      <small>系统管理员</small>
    </div>

    <!-- 头像 -->
    <vs-dropdown vs-custom-content>
      <div class="flex-row-center">
        <vs-avatar
          size="40px"
          :src="`${avatar}`"
        />
      </div>
      <vs-dropdown-menu>
        <vs-dropdown-item
          class="w-32"
          v-for="(pop, i) in popItems"
          :key="i"
          @click="routeTo(pop.route, pop.text)"
        >
          <div class="flex-row-center">
            <feather
              size="15"
              stroke-width="1.5"
              :type="pop.icon"
            ></feather>
            <span class="inner-text ml-2 text-sm">{{ pop.text }}</span>
          </div>
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const popItems = [
  { icon: 'user', text: '个人中心', route: '/profile' },
  { icon: 'message-square', text: '我的消息', route: '/notice' },
  { icon: 'lock', text: '锁定后台' },
  { icon: 'log-out', text: '退出登录' },
]
export default {
  name: 'Avatar',
  data: () => ({
    popItems,
  }),

  computed: {
    ...mapGetters('admin', ['nickname', 'avatar']),
  },

  methods: {
    routeTo(route, text) {
      if (text === '锁定后台') {
        this.lock()
      } else if (text === '退出登录') {
        this.logout()
      } else {
        this.$router.push(route)
      }
    },

    lock() {
      if (this.$store.getters['admin/lockPwd']) {
        this.$router.push('/lock-screen')
        localStorage.setItem('screen_lock', JSON.stringify({ isLocked: true }))
      } else {
        this.$router.push('/profile-setting')
      }
    },

    // 退出登录
    async logout() {
      await this.$store.dispatch('admin/SignOut')
      this.$router.replace('/sign')
    },
  },
}
</script>
