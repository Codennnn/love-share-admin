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
      >
        <div class="pt-2 px-8 flex">
          <div class="mr-16">
            <EditAvatar
              ref="editAvatar"
              :admin-id="detail._id"
              :avatar="detail.avatar_url"
              :gender="detail.gender"
              @updateInfo="getAdminDetail()"
            />
          </div>
          <div class="w-1/3">
            <EditForm
              ref="editForm"
              :form-data="info"
            />
          </div>
        </div>
      </vs-tab>

      <vs-tab
        label="修改密码"
        icon="el-icon-lock"
        icon-pack="el-icon"
      >
        <div class="px-8 w-2/3">
          <EditPassword ref="editPassword" />
          <vs-button>确认修改密码</vs-button>
        </div>
      </vs-tab>

      <vs-tab
        label="锁屏密码"
        icon="el-icon-monitor"
        icon-pack="el-icon"
      >
        <div class="ml-10 w-2/3">
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
import EditAvatar from '@/views/admin/edit/EditAvatar.vue'
import EditForm from '@/views/admin/edit/EditForm.vue'
import EditPassword from '@/views/admin/edit/EditPassword.vue'

import {
  updatePassword, updateLockPassword, getAdminDetail,
} from '@/request/api/admin'

export default {
  name: 'ProfileSetting',
  components: { EditAvatar, EditForm, EditPassword },

  data: () => ({
    active: 0,
    info: {},
    detail: {},
    lockPwd: '',
  }),

  created() {
    this.getAdminDetail()
  },

  mounted() {
    // const { active } = this.$route.query
    // if (active) {
    //   this.active = active
    // }
  },

  methods: {
    // 获取管理员详细信息
    async getAdminDetail() {
      const {
        code,
        data: { admin_detail },
      } = await getAdminDetail({ admin_id: this.$store.getters['admin/adminId'] })
      if (code === 2000) {
        this.detail = admin_detail
        this.info = {
          _id: admin_detail._id,
          nickname: admin_detail.nickname,
          real_name: admin_detail.real_name,
          email: admin_detail.email,
        }
      }
    },

    async updatePassword() {
      if (this.editPassword) {
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
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-tabs::v-deep {
  .con-slot-tabs {
    flex: 1;
  }
  .vs-tabs--btn {
    padding-right: 30px;
  }
  .vs-icon-primary {
    color: inherit;
  }
}
</style>
