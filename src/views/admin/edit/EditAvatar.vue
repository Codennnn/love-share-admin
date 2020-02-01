<template>
  <div>
    <img
      class="heavy-shadow radius"
      width="150px"
      :src="avatarUrl"
    >
    <div class="my-3  flex">
      <div
        class="mr-3 px-3 py-1 primary rounded-lg cursor-pointer"
        style="background: rgba(var(--vs-primary), 0.1)"
        @click="selectedGender = 0"
      >
        汉子
        <i
          v-show="!selectedGender"
          class="el-icon-check"
        ></i>
      </div>
      <div
        class="px-3 py-1 danger rounded-lg cursor-pointer"
        style="background: rgba(var(--vs-danger), 0.1)"
        @click="selectedGender = 1"
      >
        妹纸
        <i
          v-show="selectedGender"
          class="el-icon-check"
        ></i>
      </div>
    </div>
    <vs-button
      v-if="adminId"
      class="w-full max-w-xs"
      size="small"
      type="border"
      @click="showAvatarPopup = true"
    >更换头像</vs-button>

    <ReplaceAvatar
      ref="replaceAvatar"
      :admin-id="adminId"
      :popupActive="showAvatarPopup"
      @updateInfo="$emit('updateInfo')"
      @closePopup="showAvatarPopup = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'

const ReplaceAvatar = Vue.component(
  'ReplaceAvatar',
  () => import('../ReplaceAvatar.vue'),
)

export default {
  name: 'EditAvatar',
  components: { ReplaceAvatar },

  props: {
    adminId: String,
    avatar: String,
    gender: Number,
  },

  data: () => ({
    selectedGender: 0,
    showAvatarPopup: false,
    avatarUrl: 'https://cdn.hrspider.top/default_avatar_male.jpg',
    defaultAvatar: {
      male: 'https://cdn.hrspider.top/default_avatar_male.jpg',
      female: 'https://cdn.hrspider.top/default_avatar_female.jpg',
    },
  }),

  watch: {
    // 根据性别切换默认头像
    selectedGender: {
      handler(gender) {
        const { male, female } = this.defaultAvatar
        if (this.avatarUrl === male || this.avatarUrl === female) {
          if (gender) {
            this.avatarUrl = female
          } else {
            this.avatarUrl = male
          }
        }
      },
      immediate: true,
    },
    avatar: {
      handler(avatar) {
        if (avatar) {
          this.avatarUrl = avatar
        }
      },
      immediate: true,
    },
    gender: {
      handler(gender) {
        if (gender) {
          this.selectedGender = gender
        }
      },
      immediate: true,
    },
  },
}
</script>
