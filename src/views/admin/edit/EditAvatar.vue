<template>
  <div>
    <img
      class="base-shadow rounded-lg"
      width="150px"
      :src="avatarUrl"
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

    <ReplaceAvatar
      ref="replaceAvatar"
      :popupActive="showAvatarPopup"
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
    avatar: String,
  },

  data: () => ({
    gender: 0,
    showAvatarPopup: false,
    avatarUrl: 'https://cdn.hrspider.top/default_avatar_male.jpg',
  }),

  watch: {
    gender: {
      handler(gender) {
        if (this.$refs.replaceAvatar?.avatarUrl?.length <= 0) {
          if (gender) {
            this.avatarUrl = 'https://cdn.hrspider.top/default_avatar_female.jpg'
          } else {
            this.avatarUrl = 'https://cdn.hrspider.top/default_avatar_male.jpg'
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
  },

  methods: {
  },
}
</script>
