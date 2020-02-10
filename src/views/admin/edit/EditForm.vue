<template>
  <div>
    <el-form
      ref="form"
      class="edit"
      :rules="rules"
      :model="form"
    >
      <el-form-item
        label="昵称"
        prop="nickname"
      >
        <el-input
          placeholder="只能是中文、字母、数字"
          v-model="form.nickname"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="真实姓名"
        prop="real_name"
      >
        <el-input v-model="form.real_name"></el-input>
      </el-form-item>
      <el-form-item
        label="邮箱（选填）"
        prop="email"
      >
        <el-input v-model="form.email"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
const checkNickname = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写昵称'))
  } else if (!/^[\d\w\u4e00-\u9fa5,.;:"'?!-]{2,12}$/.test(value)) {
    callback(new Error('昵称的格式不正确'))
  }
  callback()
}
const checkRealName = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请填写姓名'))
  } else if (!/^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(value)) {
    callback(new Error('姓名的格式不正确'))
  }
  callback()
}
const checkEmail = (rule, value, callback) => {
  if (!value) {
    callback()
  } else if (!/^[\u4e00-\u9fa5]{1,6}(·[\u4e00-\u9fa5]{1,6}){0,2}$/.test(value)) {
    callback(new Error('姓名的格式不正确'))
  }
  callback()
}
export default {
  name: 'EditForm',
  props: {
    formData: Object,
  },

  data: () => ({
    form: {},
    rules: {
      nickname: [
        { validator: checkNickname, trigger: 'blur' },
      ],
      real_name: [
        { validator: checkRealName, trigger: 'blur' },
      ],
      email: [
        { validator: checkEmail, trigger: 'blur' },
      ],
    },
  }),

  watch: {
    formData: {
      handler(v) {
        if (v) {
          this.form = v
        } else {
          this.form = {
            nickname: '',
            real_name: '',
            email: '',
          }
        }
      },
      immediate: true,
    },
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
