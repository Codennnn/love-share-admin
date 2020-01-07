<template>
  <div class="h-screen px-10 flex justify-center items-center bg-white">
    <div class="h-screen flex flex-col justify-center items-center overflow-auto">
      <div style="width: 20rem; margin: 2.5rem 0;">
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
      <img
        :style="{ display: imgStyle }"
        src="@/assets/images/sign_bg.jpg"
      >
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import _debounce from 'lodash/debounce'
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

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientHeight <= 666) {
        this.imgStyle = 'none'
      } else {
        this.imgStyle = 'block'
      }
    }, 400)
  },

  beforeDestroy() {
    window.onresize = null
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
