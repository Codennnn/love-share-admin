<template>
  <div
    id="main"
    class="mt-6 p-6 bg-semi radius vs-con-loading__container"
  >
    <div class="mb-6 flex items-center">
      <!-- 头像 -->
      <div class="pr-10 flex flex-col items-center justify-center">
        <EditAvatar ref="editAvatar" />
      </div>
      <!-- 表单 -->
      <div class="flex-1">
        <div class="flex">
          <div class="w-1/2 pr-4">
            <EditForm ref="editForm" />
          </div>
          <div class="w-1/2 pl-4">
            <EditPassword ref="editPassword" />
          </div>
        </div>
      </div>
    </div>

    <!-- 权限 -->
    <div class="mb-5 radius">
      <div
        class="mb-2 py-4 px-2 flex items-center justify-between"
        style="box-shadow: 0 10px 10px 0 rgba(var(--vs-gray),0.06);"
      >
        <p class="text-lg text-semi">权 限</p>
        <div>
          <vs-switch v-model="allSelected">
            <span slot="on">全选</span>
            <span slot="off">全选</span>
          </vs-switch>
        </div>
      </div>
      <EditPermission
        ref="editPermissions"
        class="px-1"
        :all-selected="allSelected"
        :editable="true"
      />
    </div>

    <div class="flex justify-end">
      <vs-button @click="onCreate()">信息无误，确认创建</vs-button>
    </div>
  </div>
</template>

<script>
import EditAvatar from './edit/EditAvatar.vue'
import EditForm from './edit/EditForm.vue'
import EditPassword from './edit/EditPassword.vue'
import EditPermission from './edit/EditPermission.vue'

import { createAdmin } from '@/request/api/admin'

export default {
  name: 'AdminCreate',
  components: {
    EditAvatar, EditForm, EditPassword, EditPermission,
  },

  data: () => ({
    allSelected: false,
  }),

  methods: {
    async onCreate() {
      const {
        editAvatar, editForm, editPassword, editPermissions,
      } = this.$refs

      if (editForm.submit() && editPassword.submit()) {
        this.$vs.loading({
          container: '#main',
          scale: 1,
        })

        const permissions = editPermissions.getPermissions()
        // 数据载体
        const payload = Object.assign(
          editForm.form,
          editPassword.form,
          { avatar_url: editAvatar.avatarUrl },
          { gender: editAvatar.selectedGender },
          { permissions },
        )
        try {
          const { code } = await createAdmin(payload)
          if (code === 2000) {
            this.$router.push('/admin-list')
          } else if (code === 4002) {
            this.$vs.notify({
              time: 3000,
              title: '创建失败',
              text: '昵称已存在，请重新填写',
              color: 'warning',
            })
          } else if (code === 4003) {
            this.$vs.notify({
              time: 3000,
              title: '创建失败',
              text: '账号已存在，请直接登录',
              color: 'warning',
            })
          }
        } catch (err) {
          this.$vs.notify({
            time: 3000,
            title: '创建失败',
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
