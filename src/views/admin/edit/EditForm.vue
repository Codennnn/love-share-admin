<template>
  <div>
    <el-form
      class="edit"
      label-position="top"
      label-width="80px"
    >
      <el-form-item label="名称">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditForm',
}
</script>

<style lang="scss" scoped>
.edit::v-deep {
  .el-form-item__label {
    line-height: normal;
    padding: 0;
  }
}
</style>
