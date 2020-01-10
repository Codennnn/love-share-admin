<template>
  <div>
    <vs-tabs class="p-6 bg-white">
      <vs-tab
        class="px-4 py-10"
        icon="el-icon-user"
        icon-pack="el-icon"
        label="账号"
      >
        <div class="mb-8 flex">
          <div class="mr-16">
            <EditAvatar
              :admin-id="info._id"
              :avatar="info.avatar_url"
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
          class="mb-5 p-5 rounded-lg"
          style="border: 1px solid #e4e4e4;"
        >
          <p class="text-lg text-gray-600">权 限</p>
          <vs-divider />
          <EditPermission
            ref="editPermissions"
            :permissions="info.permissions"
            :editable="true"
          />
        </div>

        <div class="flex justify-end">
          <vs-button>保存设置</vs-button>
        </div>
      </vs-tab>
      <vs-tab
        class="px-4 py-10"
        icon="el-icon-key"
        icon-pack="el-icon"
        label="安全"
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

import { getAdminDetail } from '@/request/api/admin'

export default {
  name: 'AdminEdit',
  components: {
    EditAvatar, EditForm, EditPassword, EditPermission,
  },

  data: () => ({
    info: {},
  }),

  mounted() {
    this.getAdminDetail()
  },

  methods: {
    getAdminDetail() {
      getAdminDetail({ admin_id: this.$route.query.adminId }).then(({ code, data }) => {
        if (code === 2000) {
          this.info = data.admin_detail
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.vs-tabs::v-deep {
  .ul-tabs {
    box-shadow: none;
  }
}
</style>
