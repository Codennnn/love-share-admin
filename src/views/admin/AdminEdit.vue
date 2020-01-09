<template>
  <div>
    <vs-tabs class="p-6 bg-white">
      <vs-tab
        icon="el-icon-user"
        icon-pack="el-icon"
        label="账号"
      >
        <div class="w-1/2 py-5 pr-4">
          <EditForm />
        </div>

        <div
          class="mb-5 p-5 rounded-lg"
          style="border: 1px solid #e4e4e4;"
        >
          <p class="text-lg text-gray-600">权 限</p>
          <vs-divider />
          <EditPermission :editable="true" />
        </div>

        <div class="flex justify-end">
          <vs-button>保存设置</vs-button>
        </div>
      </vs-tab>
      <vs-tab
        icon="el-icon-user"
        icon-pack="el-icon"
        label="账号"
      >
        <div class="con-tab-ejemplo">
          Service
        </div>
      </vs-tab>
    </vs-tabs>
  </div>
</template>

<script>
import EditForm from './edit/EditForm.vue'
import EditPermission from './edit/EditPermission.vue'

export default {
  name: 'AdminEdit',
  components: { EditForm, EditPermission },
}
</script>

<style lang="scss" scoped>
.vs-tabs {
  .ul-tabs {
    box-shadow: none;
  }
}
</style>
