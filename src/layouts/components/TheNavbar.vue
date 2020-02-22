<template>
  <transition
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
    mode="out-in"
  >
    <div
      class="nav-wrapper"
      v-show="navbarType !== 'hidden'"
      :class="[{ collapse: sidebarCollapse }, navbarType]"
    >
      <div class="nav-bar rounded-lg">
        <div class="flex items-center">
          <router-link
            v-for="(item, index) in navIcons"
            :key="index"
            :to="item.route"
          >
            <el-tooltip
              :content="item.tip"
              effect="light"
            >
              <feather
                class="nav-icon mr-4"
                :type="item.icon"
              ></feather>
            </el-tooltip>
          </router-link>
        </div>
        <div class="nav-right">
          <div class="flex items-center">

            <!-- 搜索图标 -->
            <div class="relative flex items-center">
              <el-tooltip
                class="relative z-50 transition"
                :class="{'mr-2': showSearchInput}"
                :content="showSearchInput ? '关闭搜索' : '全站搜索'"
                effect="light"
              >
                <feather
                  class="nav-icon"
                  :type="showSearchInput ? 'x' : 'search'"
                  @click="showSearchInput = !showSearchInput"
                ></feather>
              </el-tooltip>
              <vs-input
                class="nav-search absolute right-0 top-0 z-40 overflow-hidden"
                :class="showSearchInput ? 'w-48': 'w-0 opacity-0'"
                placeholder="搜索你想要的宝贝"
                @keyup.esc="showSearchInput = false"
                @keyup.enter="search"
                v-model="searchText"
              />
            </div>

            <!-- 全屏图标 -->
            <el-tooltip
              :open-delay="100"
              :content="isFullScreen ? '退出全屏' : '进入全屏'"
              effect="light"
            >
              <feather
                class="nav-icon mx-4"
                :type="isFullScreen ? 'minimize' : 'maximize'"
                @click="screenfull"
              ></feather>
            </el-tooltip>

            <!-- 通知图标 -->
            <Notice />

            <el-tooltip
              :open-delay="100"
              content="网站日志"
              effect="light"
            >
              <feather
                class="nav-icon ml-4"
                type="terminal"
                @click="$router.push('/log')"
              ></feather>
            </el-tooltip>

            <!-- 头像图标 -->
            <Avatar class="ml-5" />

          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import screenfull from 'screenfull'
import { mapState } from 'vuex'

import Notice from './the-navbar/Notice.vue'
import Avatar from './the-navbar/Avatar.vue'

const navIcons = [
  { tip: '商品列表', icon: 'package', route: '/goods-list' },
  { tip: '订单列表', icon: 'clipboard', route: '/order-list' },
  { tip: '用户列表', icon: 'users', route: '/user-list' },
  { tip: '求购列表', icon: 'shopping-bag', route: '/begging-list' },
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
    ...mapState(['sidebarCollapse', 'navbarType']),
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
      // console.log(this.searchText)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/theme/navbar.scss";

@include themeify {
  .nav-bar::v-deep {
    background: themed("bg-color-main");
    .nav-icon {
      color: themed("nav-icon-color");
    }
    .user-text {
      color: themed("text-color-semi");
    }
  }
}

.nav-wrapper {
  width: calc(100% - #{$side-bar-width});
  min-width: $content-area-min-width;
  max-width: $router-view-max-width;
  padding: 1.2rem $router-view-padding;
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
</style>

<style lang="scss">
.nav-icon {
  margin-top: 0.5rem;
  font-size: $nav-icon-size;
  font-weight: 500;
  cursor: pointer;
}
</style>
