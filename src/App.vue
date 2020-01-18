<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  watch: {
    '$store.state.themeStyle'(val) {
      this.switchBodyDataset(val)
    },
  },

  created() {
    this.$store.dispatch('getCategoryList')
    this.$store.dispatch('getSchoolList')
    this.$store.dispatch('todo/getTodoList')
  },

  methods: {
    switchBodyDataset(theme) {
      document.body.dataset.theme = theme
    },
  },
}
</script>

<style lang="scss">
@import "~@/assets/scss/theme/_themeify.scss";

@include themeify {
  .scroll-area {
    color: themed("text-color-primary");
  }
}

#app {
  height: 100%;
  background-color: rgb(245, 245, 245);
}

// 重设跳转进度条的颜色
#nprogress .bar {
  background: $primary !important;
}
</style>
