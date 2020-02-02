<template>
  <div
    class="bg-gray flex radius overflow-hidden"
    :class="{'p-5 items-center': info, 'px-5 pt-5 justify-between': !info}"
  >
    <template v-if="!info">
      <div class="flex-1 mr-6 pb-4 flex-col-center">
        <div class="text-primary text-lg">您好，请绑定用户</div>
        <div
          class="input-wrapper mt-2 flex overflow-hidden"
          :class="{'show-input': showInput, 'hide-input': !showInput}"
        >
          <vs-input
            placeholder="请输入用户账号..."
            v-model="phone"
            @keyup.esc="showInput = !showInput"
            @keyup.enter="bindUser()"
          />
          <div
            class="btn h-full flex-row-center cursor-pointer"
            @click="onBindUser()"
          >
            <div
              v-if="!showInput"
              class="text-white text-sm"
            >绑定用户</div>
            <feather
              v-else
              class="text-white"
              size="22"
              type="link-2"
            ></feather>
          </div>
        </div>
      </div>
      <img
        class="svg_img w-48"
        src="@/assets/images/bind_user.svg"
      >
    </template>

    <template v-else>
      <div>
        <el-image
          class="w-24 mr-4 radius base-shadow"
          :src="`${info.avatar_url}?imageView2/2/w/150`"
        />
      </div>
      <div>
        <div class="text-lg text-primary font-bold">
          {{ info.nickname }}
        </div>
        <div class="my-1 text-xs text-gray">
          {{ info.school.name }}
        </div>
        <div
          class="danger text-sm cursor-pointer"
          @click="unbindUser()"
        >解除绑定</div>
      </div>
      <div class="ml-auto">
        <vs-button
          icon="el-icon-right"
          icon-pack="el-icon"
          @click="$router.push({
            path: '/user-detail',
            query: { userId },
          })"
        ></vs-button>
      </div>
    </template>
  </div>
</template>

<script>
import { bindUser, unbindUser, getUserInfo } from '@/request/api/admin'

export default {
  name: 'ProfileLog',
  data: () => ({
    phone: '',
    showInput: false,
    info: null,
  }),

  computed: {
    userId() {
      return this.$store.getters['admin/userId']
    },
  },

  created() {
    if (this.userId) {
      this.getUserInfo()
    }
  },

  methods: {
    // 点击绑定用户按钮
    onBindUser() {
      if (!this.showInput) {
        this.showInput = true
      } else if (this.phone.length > 0) {
        this.bindUser()
      }
    },

    // 绑定用户
    async bindUser() {
      const { code } = await bindUser({ phone: this.phone })
      if (code === 2000) {
        await this.$store.dispatch('admin/getAdminInfo')
        this.$store.dispatch('chat/getContactList')
        this.$store.dispatch('chat/getChatData')
        this.getUserInfo()
      }
    },

    // 解除绑定
    async unbindUser() {
      if (this.userId) {
        const { code } = await unbindUser()
        if (code === 2000) {
          this.info = null
          this.$store.dispatch('admin/getAdminInfo')
        }
      }
    },

    // 获取绑定的用户的信息
    async getUserInfo() {
      const { code, data } = await getUserInfo({ user_id: this.userId })
      if (code === 2000) {
        this.info = data.user_info
      }
    },
  },
}
</script>

<style lang="scss" scoped>
// 重设输入框样式
.vs-input::v-deep {
  .vs-inputx {
    border: none !important;
    box-shadow: none;
    background: transparent;
    padding-left: 0.5rem;
    padding-right: 55px;
  }
  .input-span-placeholder {
    padding-top: 0.45rem;
  }
}

.svg_img {
  transition: all 0.3s;
  @media (max-width: 1300px) {
    width: 8rem;
  }
}

.input-wrapper::v-deep {
  position: relative;
  transition: all 0.3s;
  .btn {
    position: absolute;
    right: 0;
  }
  &.show-input {
    width: 100%;
    border-radius: $large-radius;
    background: rgba(var(--vs-primary), 0.07);
    .vs-input {
      width: 100%;
    }
    .btn {
      width: 45px;
      border-radius: $large-radius;
      background: rgba(var(--vs-primary), 0.8);
    }
  }
  &.hide-input {
    width: 6rem;
    border-radius: $small-radius;
    .vs-input {
      width: 0;
    }
    .btn {
      width: 6rem;
      border-radius: $small-radius;
      background: $bg-primary-gradient;
    }
  }
}
</style>
