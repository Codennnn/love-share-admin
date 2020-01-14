<template>
  <div>
    <vs-tabs
      id="main"
      class="p-6 bg-primary vs-con-loading__container"
    >
      <vs-tab
        class="px-4 py-10"
        icon="el-icon-user"
        icon-pack="el-icon"
        label="账号信息"
      >
        <div class="mb-8 flex">
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

        <div
          class="mb-5 p-5 rounded-lg border-primary"
          style="border-width: 1px; border-style: solid;"
        >
          <p class="text-lg text-semi">权 限</p>
          <vs-divider />
          <EditPermission
            ref="editPermissions"
            :permissions="detail.permissions"
            :editable="true"
          />
        </div>

        <div class="flex">
          <vs-button
            class="save ml-auto"
            @click="onUpdateAmin()"
          >保存设置</vs-button>
        </div>
      </vs-tab>
      <vs-tab
        class="px-4 py-10"
        icon="el-icon-key"
        icon-pack="el-icon"
        label="安全设置"
      >
        <div>
          <EditPassword ref="editPassword" />
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import EditAvatar from './edit/EditAvatar.vue'
import EditForm from './edit/EditForm.vue'
import EditPassword from './edit/EditPassword.vue'
import EditPermission from './edit/EditPermission.vue'

import { getAdminDetail, updateAdmin } from '@/request/api/admin'

export default {
  name: 'AdminEdit',
  components: {
    EditAvatar, EditForm, EditPassword, EditPermission,
  },

  data: () => ({
    info: {},
    detail: {},
  }),

  mounted() {
    this.getAdminDetail()
  },

  methods: {
    async getAdminDetail() {
      const {
        code,
        data: { admin_detail },
      } = await getAdminDetail({ admin_id: this.$route.query.adminId })
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

    async onUpdateAmin() {
      if (this.$refs.editForm.submit()) {
        this.$vs.loading({ container: '#main', scale: 1 })

        const payload = Object.assign({
          admin_id: this.info._id,
          gender: this.$refs.editAvatar.selectedGender,
          permissions: this.$refs.editPermissions.getPermissions(),
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
        } finally {
          this.$vs.loading.close('#main > .con-vs-loading')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-tabs::v-deep {
  .ul-tabs {
    box-shadow: none;
  }
  .save:hover {
    color: white !important;
  }
}
</style>
