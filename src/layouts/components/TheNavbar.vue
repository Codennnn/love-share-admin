<template>
  <div
    class="nav-wrapper"
    :class="[{ collapse: sidebarCollapse }, navbarType]"
  >
    <div class="nav-bar rounded-lg">
      <div>
        <router-link
          v-for="(item, index) in navIcons"
          :key="index"
          :to="item.route"
        >
          <el-tooltip
            :open-delay="100"
            :content="item.tip"
            effect="light"
          >
            <i
              class="nav-icon mr-3"
              :class="item.icon"
            ></i>
          </el-tooltip>
        </router-link>
      </div>
      <div class="nav-right">
        <div class="flex items-center">

          <!-- 搜索图标 -->
          <el-tooltip
            :open-delay="100"
            :content="showSearchInput ? '关闭搜索' : '全站搜索'"
            effect="light"
          >
            <i
              class="nav-icon ml-3"
              :class="[showSearchInput ? 'el-icon-close' : 'el-icon-search']"
              @click="showSearchInput = !showSearchInput"
            ></i>
          </el-tooltip>
          <vs-input
            class="nav-search overflow-hidden"
            :class="[showSearchInput ? 'w-48': 'w-0']"
            placeholder="搜索你想要的宝贝"
            @keyup.esc="showSearchInput = false"
            @keyup.enter="search"
            v-model="searchText"
          />

          <!-- 全屏图标 -->
          <el-tooltip
            :open-delay="100"
            content="切换全屏"
            effect="light"
          >
            <i
              class="nav-icon mx-3"
              :class="[isFullScreen ? 'el-icon-crop' : 'el-icon-full-screen']"
              @click="screenfull"
            ></i>
          </el-tooltip>

          <!-- 通知图标 -->
          <Notice />

          <!-- 头像图标 -->
          <Avatar class="ml-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import screenfull from 'screenfull'
import { mapState } from 'vuex'

import Notice from './the-navbar/Notice.vue'
import Avatar from './the-navbar/Avatar.vue'

const navIcons = [
  { tip: '商品列表', icon: 'el-icon-box', route: '/goods-list' },
  { tip: '订单列表', icon: 'el-icon-files', route: '/order-list' },
  { tip: '用户列表', icon: 'el-icon-user', route: '/user-list' },
  { tip: '求购列表', icon: 'el-icon-sell', route: '/buying-list' },
]

export default {
  name: 'TheNavBar',
  components: { Notice, Avatar },

  data: () => ({
    navIcons,
    searchText: '',
    showSearchInput: false,
    isFullScreen: false, // 是否全屏,
  }),

  computed: {
    ...mapState(['sidebarCollapse']),
    navbarType() {
      if (this.$store.state.navbarType === 'fixed') {
        return 'nav-fixed'
      }
      return 'nav-scroll'
    },
  },

  mounted() {
    if (screenfull.enabled) {
      screenfull.on('change', this.screenChange)
    }
  },

  beforeDestroy() {
    if (screenfull.enabled) {
      screenfull.off('change', this.screenChange)
    }
  },


  methods: {
    // 网页全屏
    screenfull() {
      if (!screenfull.enabled) {
        this.$vs.notify({
          time: 3000,
          title: '不支持全屏',
          text: '检测到您的浏览器不支持全屏，请开启全屏显示模式',
          color: 'warning',
        })
        return
      }
      screenfull.toggle()
    },
    screenChange() {
      this.isFullScreen = screenfull.isFullscreen
    },

    // 搜索
    search() {
      console.log(this.searchText)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/theme/navbar.scss";

.nav-wrapper {
  width: calc(100% - #{$side-bar-width});
  min-width: 900px;
  box-sizing: border-box;
  transition: $side-bar-collapse-transition;

  &.collapse {
    width: calc(100% - #{$side-bar-width} + 190px);
  }
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  padding: 0.6rem 1rem;
  background: #fff;
  box-sizing: border-box;
  transition: all 0.3s;
}

.nav-right {
  display: flex;
  align-items: center;
}

// 搜索框
.nav-search::v-deep {
  // 重设输入框样式
  .vs-inputx {
    border: none !important;
    border-bottom: 2px solid #a0a0a0 !important;
    box-shadow: none;
    border-radius: 0;
    &.vs-input--input:focus {
      border: none !important;
      border-bottom: 2px solid #a0a0a0 !important;
    }
  }
}
</style>

<style lang="scss">
.nav-icon {
  cursor: pointer;
  font-size: $nav-icon-size;
  color: $nav-icon-color;
  font-weight: 500;
}
</style>
