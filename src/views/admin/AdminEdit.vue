<template>
  <div>
    <vs-tabs
      id="main"
      class="p-6 bg-main vs-con-loading__container"
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
          <div class="w-1/2">
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
        <div class="w-1/2">
          <EditPassword />
          <vs-button id="btn">确认修改密码</vs-button>
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

  created() {
    this.getAdminDetail()
  },

  methods: {
    // 获取管理员详细信息
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

    // 更新管理员信息
    onUpdateAmin() {
      if (this.$refs.editForm.submit()) {
        this.$loading(
          async () => {
            const payload = Object.assign({
              admin_id: this.info._id,
              gender: this.$refs.editAvatar.selectedGender,
              permissions: this.$refs.editPermissions.getPermissions(),
            }, this.$refs.editForm.form)

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
          },
          { container: '#main', scale: 1 },
          null,
          (err) => {
            this.$vs.notify({
              title: '信息更新失败',
              text: err,
              color: 'danger',
            })
          },
        )
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
  .vs-icon-primary {
    color: inherit;
  }
  .ul-tabs {
    box-shadow: none;
    .vs-tabs--li {
      color: #888;
    }
  }
  // "保存设置" 按钮
  .save:hover {
    color: white !important;
  }
}
</style>
