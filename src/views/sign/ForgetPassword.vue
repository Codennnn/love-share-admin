<template>
  <div class="w-full">
    <p class="w-full pb-4 flex items-center text-2xl font-bold text-gray-700">
      重置密码
    </p>
    <vs-input
      class="w-full pb-1"
      val-icon-warning="warning"
      val-icon-danger="clear"
      v-for="(item, i) in inputs"
      :key="i"
      :type="item.type"
      :label-placeholder="item.placeholder"
      :warning="item.isWarnng"
      :warning-text="item.warningText"
      :danger="item.isError"
      :danger-text="item.errorText"
      :description-text="item.description"
      v-model.trim="item.value"
      @focus="item.isWarnng = false, item.isError = false"
      @keyup.enter="i === 2 ? onResetPassword() : ''"
    />
    <vs-button
      id="resetBtn"
      class="w-full mt-3 mb-1 vs-con-loading__container"
      color="rgba(var(--vs-primary), 1)"
      gradient-color-secondary="rgba(var(--vs-primary), .7)"
      type="gradient"
      :disabled="resetBtnDisable"
      @click="onResetPassword()"
    >重置密码</vs-button>
    <p
      class="mt-1 text-center text-gray-500 text-xs cursor-pointer"
      @click="switchToSignIn()"
    >返回到登录</p>
  </div>
</template>

<script>
import { resetPassword } from '@/request/api/user'

const inputs = [
  {
    placeholder: '手机号码',
    value: '',
    type: 'text',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '请填写注册时绑定的手机号码',
    noneEmptyText: '请填写手机号',
    noneCheckText: '请确认手机号的格式是否填写正确',
  },
  {
    placeholder: '新密码',
    value: '',
    type: 'password',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '6-16个字符，只能是字母、数字和下划线',
    noneEmptyText: '密码不能为空，请输入密码',
    noneCheckText: '密码格式不正确，请重新填写',
  },
  {
    placeholder: '确认密码',
    value: '',
    type: 'password',
    isWarnng: false,
    isError: false,
    warningText: '',
    errorText: '',
    description: '',
    noneEmptyText: '密码不能为空，请输入密码',
    noneCheckText: '与前一次不相同，请确保两次密码输入已知',
  },
]

export default {
  name: 'SignReset',
  data: () => ({
    inputs,
    resetBtnDisable: false,
  }),

  methods: {
    onResetPassword() {
      if (this.validate() && this.check()) {
        this.$loading(
          async () => {
            this.resetBtnDisable = true
            const [account, password] = [this.inputs[0].value, this.inputs[1].value]

            resetPassword({ account, password })
              .then(({ code }) => {
                if (code === 2000) {
                  this.$vs.notify({
                    title: '重置成功',
                    text: '密码已重置，请重新登录~',
                    position: 'top-center',
                    color: 'success',
                  })
                  this.switchToSignIn()
                }
              })
          },
          {
            background: 'primary',
            color: '#fff',
            container: '#resetBtn',
            scale: 0.45,
          },
          () => { this.resetBtnDisable = false },
        )
      }
    },

    // 输入框非空验证
    validate() {
      return this.inputs.every((input) => {
        if (input.value.length <= 0) {
          input.isWarnng = true
          input.warningText = input.noneEmptyText
          return false
        }
        return true
      })
    },

    check() {
      // 手机号码格式不正确，退出
      if (!/^[1]([3-9])[0-9]{9}$/.test(this.inputs[0].value)) {
        this.inputs[0].isError = true
        this.inputs[0].errorText = this.inputs[0].noneCheckText
        return false
      }
      if (!/^[\w]{6,16}$/.test(this.inputs[1].value)) {
        this.inputs[1].isError = true
        this.inputs[1].errorText = this.inputs[1].noneCheckText
        return false
      }
      if (this.inputs[1].value !== this.inputs[2].value) {
        this.inputs[2].isError = true
        this.inputs[2].errorText = this.inputs[2].noneCheckText
        return false
      }
      return true
    },

    switchToSignIn() {
      this.$emit('switchComponent', 'SignIn')
      document.title = '登录 - 乐享校园'
    },
  },
}
</script>
