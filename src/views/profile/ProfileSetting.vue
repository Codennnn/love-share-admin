<template>
  <div>
    <vs-tabs
      position="left"
      v-model="active"
    >
      <vs-tab
        label="信息编辑"
        icon="el-icon-user"
        icon-pack="el-icon"
      ></vs-tab>

      <vs-tab
        label="修改密码"
        icon="el-icon-lock"
        icon-pack="el-icon"
      >
        <div class="ml-10">
          <vs-input
            class="mb-2"
            label="原始密码"
            type="password"
            v-model.trim="oldPwd"
          />
          <vs-input
            label="新密码"
            placeholder="按回车键提交"
            type="password"
            v-model.trim="newPwd"
            @keyup.enter="updatePassword()"
          />
        </div>
      </vs-tab>

      <vs-tab
        label="锁屏密码"
        icon="el-icon-monitor"
        icon-pack="el-icon"
      >
        <div class="ml-10">
          <vs-input
            type="password"
            label="新的锁屏密码"
            placeholder="按回车键提交"
            v-model.trim="lockPwd"
            @keyup.enter="updateLockPassword()"
          />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import { updatePassword, updateLockPassword } from '@/request/api/admin'

export default {
  name: 'ProfileSetting',
  data: () => ({
    active: 0,
    oldPwd: '',
    newPwd: '',
    lockPwd: '',
  }),

  mounted() {
    // const { active } = this.$route.query
    // if (active) {
    //   this.active = active
    // }
  },

  methods: {
    async updatePassword() {
      if (this.oldPwd.length > 0 && this.newPwd.length > 0) {
        const { code } = await updatePassword({ old_pwd: this.oldPwd, new_pwd: this.newPwd })
        if (code === 2000) {
          await this.$store.dispatch('admin/SignOut')
          this.popupActive = false
          this.$router.replace('/sign')
        }
      }
    },
    async updateLockPassword() {
      if (this.lockPwd.length > 0) {
        const { code } = await updateLockPassword({ password: this.lockPwd })
        if (code === 2000) {
          await this.$store.dispatch('admin/getAdminInfo')
          this.popupActive = false
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-tabs::v-deep {
  .vs-tabs--btn {
    padding-right: 30px;
  }
  .vs-icon-primary {
    color: inherit;
  }
}
</style>
