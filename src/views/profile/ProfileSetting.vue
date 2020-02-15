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
          <div class="w-1/3 mb-4">
            <EditForm
              ref="editForm"
              :form-data="info"
            />
            <vs-button
              id="btn"
              @click="onUpdateAmin()"
            >确认修改</vs-button>
          </div>
        </div>
      </vs-tab>

      <vs-tab
        label="修改密码"
        icon="el-icon-lock"
        icon-pack="el-icon"
      >
        <div class="px-8 mb-4 w-1/2">
          <EditPassword ref="editPassword" />
          <vs-button
            id="btn"
            @click="updatePassword()"
          >确认修改密码</vs-button>
        </div>
      </vs-tab>

      <vs-tab
        label="锁屏密码"
        icon="el-icon-monitor"
        icon-pack="el-icon"
      >
        <div class="w-2/3 ml-10 mb-4">
          <vs-input
            class="mb-4"
            type="password"
            label="登录密码"
            placeholder="请填写您的登录密码"
            v-model.trim="password"
            @keyup.enter="updateLockPassword()"
          />
          <vs-input
            class="mb-4"
            type="password"
            label="新的锁屏密码"
            placeholder="按回车键提交"
            v-model.trim="lockPwd"
            @keyup.enter="updateLockPassword()"
          />
          <vs-button
            id="btn"
            @click="updateLockPassword()"
          >修改锁屏密码</vs-button>
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
  updatePassword, updateLockPassword, getAdminDetail, updateAdmin,
} from '@/request/api/admin'

export default {
  name: 'ProfileSetting',
  components: { EditAvatar, EditForm, EditPassword },

  data: () => ({
    active: 0,
    info: {},
    detail: {},

    password: '',
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
      if (this.$refs.editPassword.submit()) {
        const { oldPassword: old_pwd, password2: new_pwd } = this.$refs.editPassword.form
        const { code } = await updatePassword({ old_pwd, new_pwd })
        if (code === 2000) {
          await this.$store.dispatch('admin/SignOut')
          this.$router.replace('/sign')
        }
      }
    },

    // 更新管理员信息
    async onUpdateAmin() {
      if (this.$refs.editForm.submit()) {
        const payload = Object.assign({
          admin_id: this.info._id,
          gender: this.$refs.editAvatar.selectedGender,
        }, this.$refs.editForm.form)

        try {
          const { code, msg } = await updateAdmin(payload)
          if (code === 2000) {
            await this.getAdminDetail()
            this.$vs.notify({
              title: '信息更新成功',
              text: msg,
              color: 'success',
            })
          } else {
            throw new Error(msg)
          }
        } catch (err) {
          this.$vs.notify({
            title: '信息更新失败',
            text: err,
            color: 'danger',
          })
        }
      }
    },

    async updateLockPassword() {
      if (this.password.length > 0 && this.lockPwd.length > 0) {
        const { code, msg } = await updateLockPassword({
          password: this.password,
          lock_password: this.lockPwd,
        })
        if (code === 2000) {
          await this.$store.dispatch('admin/getAdminInfo')
          this.$vs.notify({
            title: '更新成功',
            text: msg,
            color: 'success',
          })
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#btn {
  &:hover {
    color: #fff !important; // 修正样式
  }
}

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
