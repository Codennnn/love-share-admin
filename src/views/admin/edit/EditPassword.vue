<template>
  <div>
    <el-form
      ref="form"
      class="edit"
      label-position="top"
      :rules="rules"
      :model="form"
    >
      <el-form-item
        label="原始密码"
        prop="oldPassword"
      >
        <el-input
          type="password"
          placeholder="请填写账号原始密码"
          v-model="form.oldPassword"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        prop="password"
      >
        <el-input
          type="password"
          placeholder="6-16个字符，只能是字母、数字和下划线"
          v-model="form.password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认密码"
        prop="password2"
      >
        <el-input
          type="password"
          placeholder="请再次输入密码"
          v-model="form.password2"
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const checkAccount = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写原始密码'))
  }
  callback()
}

const checkPassword = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写密码'))
  } else if (!/^[\w]{6,16}$/.test(value)) {
    callback(new Error('密码不符合规范'))
  }
  callback()
}

export default {
  name: 'EditPassword',
  data() {
    const checkPassword2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请确认二次密码'))
      } else if (value !== this.form.password) {
        callback(new Error('与前一次密码不一致'))
      }
      callback()
    }
    return {
      form: {
        oldPassword: '',
        password: '',
        password2: '',
      },
      rules: {
        oldPassword: [
          { validator: checkAccount, trigger: 'blur' },
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' },
        ],
        password2: [
          { validator: checkPassword2, trigger: 'blur' },
        ],
      },
    }
  },

  methods: {
    submit() {
      let flag
      this.$refs.form.validate((valid) => {
        if (valid) {
          flag = true
          return true
        }
        flag = false
        return false
      })
      return flag
    },
  },
}
</script>

<style lang="scss" scoped>
.edit::v-deep {
  .el-form-item__label {
    line-height: normal;
    padding: 0 0 0.2rem 0;
  }
}
</style>
