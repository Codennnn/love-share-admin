<template>
  <div id="app">
    <!-- 网络状态检测 -->
    <div
      v-show="isOffline"
      class="fixed top-0 w-full h-16 flex-row-center"
      style="z-index: 99999999; left: 50%; width: 250px; transform: translate(-50%, 0);"
    >
      <vs-alert
        class="alert"
        color="danger"
        icon="rss_feed"
        :active="isOffline"
      >
        <span>
          网络不可用，请检测您的网络配置
        </span>
      </vs-alert>
    </div>

    <router-view />
  </div>
</template>

<script>
import consoleLog from '@/utils/console-log'

export default {
  name: 'App',
  data: () => ({
    isOffline: false, // 是否处于网络
  }),

  watch: {
    '$store.state.themeStyle': {
      handler(theme) {
        document.body.dataset.theme = theme
      },
      immediate: true,
    },
  },

  mounted() {
    window.addEventListener('online', () => {
      this.isOffline = false
    })
    window.addEventListener('offline', () => {
      this.isOffline = true
    })

    consoleLog()
  },
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: rgb(245, 245, 245);
}

// 重设跳转进度条的颜色
#nprogress .bar {
  background: $primary !important;
}

// 断网警告
.alert {
  .vs-icon {
    font-size: 1.2rem;
  }
}
</style>
