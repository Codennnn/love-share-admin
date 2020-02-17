<template>
  <div
    class="w-full"
    style="transform: translateY(-20%);"
  >
    <p class="pb-4 text-2xl font-bold text-gray-700">
      欢迎登录
    </p>
    <vs-input
      class="w-full pb-1"
      val-icon-warning="warning"
      v-model.trim="item.value"
      v-for="(item, i) in signInInput"
      :key="i"
      :type="item.type"
      :label-placeholder="item.placeholder"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      @focus="() => { signInInput[i].isWarnng = false }"
      @keyup.enter="login"
    />
    <vs-alert
      closable
      close-icon="close"
      color='danger'
      :active.sync="signInError"
    >{{ signInErrorText }}</vs-alert>
    <div class="text-right">
      <span
        class="forget-pwd text-sm text-gray-500 cursor-pointer"
        @click="switchToReset()"
      >忘记密码？</span>
    </div>
    <vs-button
      id="signInBtn"
      class="w-full mt-3 vs-con-loading__container"
      color="rgba(var(--vs-primary), 1)"
      gradient-color-secondary="rgba(var(--vs-primary), .7)"
      type="gradient"
      :disabled="signInDisable"
      @click="login"
    >登 录</vs-button>
  </div>
</template>

<script>
const signInInput = [
  {
    placeholder: '管理员账号',
    value: '',
    type: 'text',
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
]
export default {
  name: 'Login',
  data: () => ({
    signInInput,
    signInError: false,
    signInErrorText: '账号或密码有误，请确认是否已注册',
    signInDisable: false,

    position: {}, // 登录的位置信息
  }),

  methods: {
    async login() {
      if (this.validate()) {
        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#signInBtn',
          scale: 0.45,
        })
        this.signInDisable = true

        const [account, password] = [this.signInInput[0].value, this.signInInput[1].value]
        const position = await this.getPosition()
        const device = navigator.userAgent

        const code = await this.$store.dispatch('admin/signIn', {
          account,
          password,
          position,
          device,
        })

        // 2000-成功，4001-账号未注册，4003-密码错误
        if (code === 2000) {
          this.$router.replace('/')
        } else if (code === 4001 || code === 4003) {
          this.signInError = true
        } else {
          this.$message.error('登录失败，请再次尝试')
        }
        this.$vs.loading.close('#signInBtn > .con-vs-loading')
        this.signInDisable = false
      }
    },

    // 输入框非空验证
    validate() {
      for (let i = 0; i < 2; i += 1) {
        if (this.signInInput[i].value.length === 0) {
          this.signInInput[i].isWarnng = true
          this.signInInput[i].warningText = (i === 0 ? '请输入账号' : '请输入密码')
          return false
        }
      }
      return true
    },

    switchToReset() {
      this.$emit('switchComponent', 'ForgetPassword')
      document.title = '重置密码 - 乐享校园'
    },

    getPosition() {
      /* 地理位置服务可用 */
      if ('geolocation' in navigator) {
        return new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude }, timestamp }) => {
              resolve({
                code: 1,
                latitude,
                longitude,
                timestamp,
              })
            },
            ({ message }) => {
              resolve({
                code: 2,
                message,
              })
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            },
          )
        })
      }

      /* 地理位置服务不可用 */
      return {
        code: 3,
        message: 'Geolocation Service Is Unavailable',
      }
    },
  },
}
</script>

<style lang="scss" scoped>
#signInBtn {
  &:hover {
    color: #fff !important; // 修正样式
  }
}

.forget-pwd {
  transition: 0.3s;
  &:hover {
    color: rgba(var(--vs-primary), 0.8);
  }
}
</style>
