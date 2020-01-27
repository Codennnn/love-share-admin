<template>
  <div class="h-screen flex justify-center items-center bg-primary">
    <div class="pb-20 flex flex-col justify-center items-center">
      <vs-avatar
        class="base-shadow"
        size="100px"
        :src="info.avatar_url"
      />
      <h3 class="my-4 text-primary text-xl font-bold">{{ info.nickname }}</h3>
      <div>
        <div
          class="w-full radius overflow-hidden flex"
          style="background: rgba(var(--vs-primary), 0.065);"
        >
          <vs-input
            class="pwd-input w-full"
            style="background: transparent;"
            size="large"
            placeholder="请输入密码..."
            v-model="password"
            @keyup.enter="unLocked()"
          />
          <el-tooltip
            content="解锁"
            :open-delay="300"
          >
            <div
              class="h-full flex items-center justify-center radius cursor-pointer"
              style="width: 60px; height: 50px; background: rgba(var(--vs-primary), 0.1);"
              @click="unLocked()"
            >
              <UnlockIcon
                size="1.3x"
                class="primary"
              />
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="w-64 mt-4">
        <vs-alert
          :active.sync="showAlert"
          color="danger"
          closable
          close-icon="close"
        >{{ alertText }}</vs-alert>
      </div>
    </div>

    <div
      class="fixed cursor-pointer"
      style="bottom: 20px; right: 30px;"
      @click="logout()"
    >
      <el-tooltip
        effect="light"
        content="退出登录"
      >
        <LogOutIcon class="text-semi" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { UnlockIcon, LogOutIcon } from 'vue-feather-icons'

export default {
  name: 'LockScreen',
  components: { UnlockIcon, LogOutIcon },

  data: () => ({
    showAlert: false,
    alertText: '',
    password: '',
  }),

  computed: {
    info() {
      const { avatar_url, nickname, lock_password } = this.$store.state.admin.info
      return { avatar_url, nickname, lock_password }
    },
  },

  methods: {
    unLocked() {
      if (this.password.length <= 0) {
        this.showAlert = true
        this.alertText = '请填写解锁密码'
      } else if (this.password !== this.info.lock_password) {
        this.showAlert = true
        this.alertText = '密码有误'
      } else if (this.password === this.info.lock_password) {
        localStorage.setItem('screen_lock', JSON.stringify({ isLocked: false }))
        this.$router.replace('/')
      }
    },

    async logout() {
      await this.$store.dispatch('admin/SignOut')
      this.$router.replace('/sign')
    },
  },
}
</script>

<style lang="scss" scoped>
// 重设输入框样式
.pwd-input::v-deep {
  .vs-inputx {
    border: none !important;
    box-shadow: none;
  }
  .input-span-placeholder {
    padding-top: 0.9rem;
  }
}
</style>
