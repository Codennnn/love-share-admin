<template>
  <div
    class="relative h-screen flex-row-center bg-white"
    style="min-width: 1300px;"
  >
    <img
      class="absolute left-0 h-full"
      src="@/assets/images/sign-bg.png"
    />
    <div
      class="absolute h-screen flex flex-col justify-center items-center overflow-auto"
      style="left: 50%;"
    >
      <div style="width: 20rem;">
        <transition
          enter-active-class="animated fadeIn quickly"
          leave-active-class="animated fadeOut quickly"
          mode="out-in"
        >
          <keep-alive>
            <component
              class="input-component"
              :is="currentComponent"
              @switchComponent="switchComponent"
            />
          </keep-alive>
        </transition>
      </div>
    </div>

    <div
      class="absolute right-0 top-0 mt-5 mr-5 flex-row-center
     text-gray-600 text-sm cursor-pointer"
      @click="isSidebarActive = true"
    >
      <feather
        class="mr-2"
        size="20"
        type="user-plus"
      ></feather>
      成为管理员
    </div>

    <SignUp
      :is-sidebar-active="isSidebarActive"
      @closeSidebar="isSidebarActive = false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import SignIn from './SignIn.vue'

const SignUp = Vue.component('SignUp', () => import('./SignUp.vue'))
const ForgetPassword = Vue.component('ForgetPassword', () => import('./ForgetPassword.vue'))

export default {
  name: 'Sign',
  components: { SignIn, SignUp, ForgetPassword },

  data: () => ({
    currentComponent: 'SignIn',
    imgStyle: 'block',
    isSidebarActive: false,
  }),

  created() {
    this.currentComponent = 'SignIn'
  },

  methods: {
    switchComponent(com) {
      this.currentComponent = com
    },
  },
}
</script>

<style lang="scss" scoped>
.input-component::v-deep {
  $padding: 0.75rem 0.5rem !global;
  .vs-inputx {
    border: none !important;
    box-shadow: none;
    padding: $padding;
    background: rgba(var(--vs-gray), 0.08) !important;
  }
  .input-span-placeholder {
    padding: $padding;
  }
  .vs-button {
    padding: 0.6rem !important;
  }
}
</style>
