<template>
  <div class="flex items-center">
    <!-- 用户名称 -->
    <div class="user-text mr-2 text-right">
      <div class="text-right text-lg">{{ nickname }}</div>
      <small>系统管理员</small>
    </div>

    <!-- 头像 -->
    <el-dropdown vs-custom-content>
      <div class="flex-row-center">
        <vs-avatar
          size="40px"
          :src="`${avatar}`"
        />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          class="w-32"
          v-for="(pop, i) in popItems"
          :key="i"
          @click.native="routeTo(pop.route, pop.text)"
        >
          <div class="flex-row-center">
            <feather
              size="15"
              stroke-width="1.5"
              :type="pop.icon"
            ></feather>
            <span class="inner-text ml-2 text-sm">{{ pop.text }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const popItems = [
  { icon: 'user', text: '个人中心', route: '/profile' },
  { icon: 'message-square', text: '我的消息', route: '/notice' },
  { icon: 'settings', text: '账号设置', route: '/profile-setting' },
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
        this.$router.push({
          path: '/profile-setting',
          query: { active: 2 },
        })
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
