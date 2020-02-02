<template>
  <div
    class="relative h-screen flex-row-center bg-primary"
    style="min-width: 1300px;"
  >
    <img
      class="absolute left-0 h-full"
      src="@/assets/images/sign-bg.png"
    >
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
              :is="currentComponent"
              @switchComponent="switchComponent"
            />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SignIn from './SignIn.vue'

const ForgetPassword = Vue.component(
  'ForgetPassword',
  () => import('./ForgetPassword.vue'),
)

export default {
  name: 'Sign',
  components: { SignIn, ForgetPassword },

  data: () => ({
    currentComponent: 'SignIn',
    imgStyle: 'block',
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
.quickly {
  animation-duration: 0.2s;
}
</style>
