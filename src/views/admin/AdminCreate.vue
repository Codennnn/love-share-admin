<template>
  <div class="mt-6 p-6 base-shadow bg-white rounded-lg">
    <div class="mb-5 flex">
      <div class="w-1/2 pr-5">
        <vs-button @click="showAvatarPopup = true">添加头像</vs-button>
      </div>
      <div class="w-1/2">
        <EditForm />
      </div>
    </div>

    <div
      class="mb-5 p-5 rounded-lg"
      style="border: 1px solid #e4e4e4;"
    >
      <p class="text-lg text-gray-600">权 限</p>
      <vs-divider />
      <EditPermission :editable="true" />
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
import EditPermission from './edit/EditPermission.vue'

const ReplaceAvatar = Vue.component(
  'ReplaceAvatar',
  () => import('./ReplaceAvatar.vue'),
)

export default {
  name: 'AdminCreate',
  components: { EditForm, EditPermission, ReplaceAvatar },

  data: () => ({
    showAvatarPopup: false,
    avatarImage: '',
  }),

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
  },
}
</script>
