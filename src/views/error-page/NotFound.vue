<template>
  <div class="bg">
    <div class="btn-group">
      <vs-button
        class="mr-5"
        color="primary"
        type="border"
        @click="goBack"
      >返回上一页</vs-button>
      <vs-button to="Analytics">带我回家</vs-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  position: relative;
  width: 100%;
  height: 100vh;
  background: url(https://gitee.com/chinesee/images/raw/master/img/img_019.png)
    no-repeat center center;
  background-size: cover;
}

.btn-group {
  position: absolute;
  bottom: 100px;
  right: 140px;
}
</style>
