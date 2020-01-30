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
            class="btn flex items-center justify-center cursor-pointer"
            style="height: 40px;"
            @click="onBindUser()"
          >
            <div
              v-if="!showInput"
              class="text-white text-sm"
            >绑定用户</div>
            <Link2Icon
              v-else
              size="1.2x"
              class="text-white"
            />
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
        <vs-avatar
          size="80px"
          class=" base-shadow"
          :src="info.avatar_url"
        />
      </div>
      <div>
        <div class="text-lg text-primary">
          {{ info.nickname }}
        </div>
        <div>
          {{ info.school.name }}
        </div>
        <div
          class="primary text-sm cursor-pointer"
          @click="unbindUser()"
        >解除绑定</div>
      </div>
    </template>
  </div>
</template>
// style="background: rgba(var(--vs-primary), 0.9)"
<script>
import { Link2Icon } from 'vue-feather-icons'
import { bindUser, unbindUser, getUserInfo } from '@/request/api/admin'

export default {
  name: 'ProfileLog',
  components: { Link2Icon },

  data: () => ({
    phone: '',
    showInput: false,
    info: null,
  }),

  computed: {
    userId() {
      return this.$store.state.admin.info?.user?._id
    },
  },

  created() {
    if (this.userId) {
      this.getUserInfo()
    }
  },

  methods: {
    onBindUser() {
      if (!this.showInput) {
        this.showInput = true
      } else if (this.phone.length > 0) {
        this.bindUser()
      }
    },

    async bindUser() {
      const { code } = await bindUser({ phone: this.phone })
      if (code === 2000) {
        await this.$store.dispatch('admin/getAdminInfo')
        this.getUserInfo()
      }
    },

    async unbindUser() {
      if (this.userId) {
        const { code } = await unbindUser()
        if (code === 2000) {
          this.info = null
          this.$store.dispatch('admin/getAdminInfo')
        }
      }
    },

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
