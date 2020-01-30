<template>
  <div class="bg-gray px-5 pt-5 flex justify-between radius overflow-hidden">
    <div class="flex-1 mr-6 pb-4 flex-col-center">
      <div class="text-primary text-lg">您好，请绑定用户</div>
      <div
        class="input-wrapper mt-2 flex overflow-hidden"
        :class="{'show-input': showInput, 'hide-input': !showInput}"
      >
        <vs-input
          placeholder="请输入用户账号..."
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
  </div>
</template>
// style="background: rgba(var(--vs-primary), 0.9)"
<script>
import { Link2Icon } from 'vue-feather-icons'

export default {
  name: 'ProfileLog',
  components: { Link2Icon },

  data: () => ({
    showInput: false,
  }),

  methods: {
    onBindUser() {
      if (!this.showInput) {
        this.showInput = true
      } else {
        this.bindUser()
      }
    },

    async bindUser() {
      console.log('bind!')
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
