<template>
  <div
    id="main"
    class="mt-6 p-6 base-shadow bg-white rounded-lg vs-con-loading__container"
  >
    <div class="mb-6 flex items-center">
      <!-- 头像 -->
      <div class="pr-10 flex flex-col items-center justify-center">
        <img
          class="base-shadow rounded-lg"
          width="150px"
          :src="defaultAvatar"
        >
        <div class="my-3  flex">
          <div
            class="mr-3 px-3 py-1 text-primary rounded-lg cursor-pointer"
            style="background: rgba(var(--vs-primary), 0.1)"
            @click="gender = 0"
          >
            汉子
            <i
              v-show="!gender"
              class="el-icon-check"
            ></i>
          </div>
          <div
            class="px-3 py-1 text-danger rounded-lg cursor-pointer"
            style="background: rgba(var(--vs-danger), 0.1)"
            @click="gender = 1"
          >
            妹纸
            <i
              v-show="gender"
              class="el-icon-check"
            ></i>
          </div>
        </div>
        <vs-button
          class="w-full"
          size="small"
          type="border"
          @click="showAvatarPopup = true"
        >更换默认头像</vs-button>
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
    <div
      class="mb-5 p-5 rounded-lg"
      style="border: 1px solid #e4e4e4;"
    >
      <div class="flex items-center justify-between">
        <p class="text-lg text-gray-600">权 限</p>
        <div>
          <vs-switch v-model="allSelected">
            <span slot="on">已全选</span>
            <span slot="off">全选</span>
          </vs-switch>
        </div>
      </div>
      <vs-divider />
      <EditPermission
        ref="editPermissions"
        :all-selected="allSelected"
        :editable="true"
      />
    </div>

    <div class="flex justify-end">
      <vs-button @click="onCreate()">信息无误，确认创建</vs-button>
    </div>

    <ReplaceAvatar
      :popupActive="showAvatarPopup"
      :img="avatarImage"
      @closePopup="showAvatarPopup = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import EditForm from './edit/EditForm.vue'
import EditPassword from './edit/EditPassword.vue'
import EditPermission from './edit/EditPermission.vue'

import { createAdmin } from '@/request/api/admin'

const ReplaceAvatar = Vue.component(
  'ReplaceAvatar',
  () => import('./ReplaceAvatar.vue'),
)

export default {
  name: 'AdminCreate',
  components: {
    EditForm, EditPassword, EditPermission, ReplaceAvatar,
  },

  data: () => ({
    showAvatarPopup: false,
    avatarImage: '',
    gender: 0,
    allSelected: false,
  }),

  computed: {
    defaultAvatar() {
      if (this.gender) {
        return 'https://cdn.hrspider.top/default_avatar_female.jpg'
      }
      return 'https://cdn.hrspider.top/default_avatar_male.jpg'
    },
  },

  methods: {
    onSelect(file) {
      const isLt4M = ((file.size / 1024 / 1024) < 2)
      if (!isLt4M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return
      }

      const reader = new FileReader()
      reader.readAsDataURL(file.raw)
      reader.onload = (e) => {
        this.showAvatarPopup = true
        this.avatarImage = e.target.result
      }
    },

    async onCreate() {
      const { editForm, editPassword, editPermissions } = this.$refs

      if (editForm.submit() && editPassword.submit()) {
        this.$vs.loading({
          container: '#main',
          scale: 1,
        })

        const permissions = editPermissions.getPermissions()
        const payload = Object.assign(
          editForm.form,
          editPassword.form,
          { avatar_url: this.defaultAvatar },
          { gender: this.gender },
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
