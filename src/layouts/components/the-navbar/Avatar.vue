<template>
  <div class="flex items-center">
    <!-- 用户名称 -->
    <div class="user-text mr-2 text-right">
      <div class="text-right text-lg">{{ nickname }}</div>
      <small>{{ setTitle(roles) }}</small>
    </div>

    <!-- 头像 -->
    <vs-dropdown vs-custom-content>
      <div class="flex items-center justify-center">
        <vs-avatar
          size="40px"
          :src="`${avatar}`"
        />
      </div>
      <vs-dropdown-menu>
        <vs-dropdown-item
          class="w-32"
          v-for="(pop, index) in popItems"
          :key="index"
        >
          <router-link
            tag="div"
            class="flex items-center"
            :to="pop.route || ''"
            @click.native="!pop.route && logout()"
          >
            <i
              class="inner-icon text-base font-medium"
              :class="pop.icon"
            ></i>
            <span class="inner-text ml-3">{{ pop.text }}</span>
          </router-link>
        </vs-dropdown-item>
      </vs-dropdown-menu>
    </vs-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

const popItems = [
  { icon: 'el-icon-user', text: '个人中心', route: '/admin-detail' },
  { icon: 'el-icon-message', text: '我的消息', route: '/my-club' },
  { icon: 'el-icon-switch-button', text: '退出登录' },
]
export default {
  name: 'Avatar',
  data: () => ({
    popItems,
  }),

  computed: {
    ...mapGetters('admin', ['nickname', 'roles', 'avatar']),
  },

  methods: {
    setTitle(roles) {
      if (roles.includes('super_admin')) {
        return '超级管理员'
      }
      if (roles.includes('admin')) {
        return '普通管理员'
      }
      return '身份不明'
    },

    // 退出登录
    async logout() {
      await this.$store.dispatch('admin/SignOut')
      this.$router.replace('/sign')
    },
  },
}
</script>
