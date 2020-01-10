<template>
  <div>
    <vs-tabs class="p-6 bg-white">
      <vs-tab
        icon="el-icon-user"
        icon-pack="el-icon"
        label="账号"
      >
        <div class="w-1/2 py-5 pr-4">
          <EditForm
            ref="editForm"
            :form-data="info"
          />
          <EditAvatar :avatar="info.avatar_url" />
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

export default {
  name: 'AdminEdit',
  components: {
    EditAvatar, EditForm, EditPassword, EditPermission,
  },

  data: () => ({
    info: {},
  }),

  mounted() {
    this.info = this.$route.query.detail
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
