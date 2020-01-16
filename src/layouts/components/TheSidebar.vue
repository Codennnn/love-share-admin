<template>
  <div
    class="menu-main"
    :class="[{collapse: sidebarCollapse}, menuClass]"
  >
    <!-- 顶部LOGO -->
    <div
      class="logo sticky top-0 left-0 z-50 w-full flex items-center h-16 cursor-pointer"
      @click="switchCollapse"
    >
      <img
        style="width: 2.6rem;"
        :src="logo"
      />
      <transition
        enter-active-class="animated fadeIn faster"
        leave-active-class="animated fadeOut faster"
        mode="out-in"
      >
        <img
          v-show="!sidebarCollapse"
          class="w-24 ml-3"
          :src="logoText"
        >
      </transition>
    </div>

    <VuePerfectScrollbar
      class="menu-scroll-wrapper"
      :settings="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <el-menu
        router
        unique-opened
        class="main"
        :default-active="$route.path"
        :class="{ 'side-bar-menu': !sidebarCollapse }"
        :collapse="sidebarCollapse"
      >
        <!-- 菜单主内容 -->
        <template v-for="(menuItem,index) in sidebarList">
          <template v-if="!menuItem.hidden">
            <!-- 嵌套子菜单 -->
            <el-submenu
              class="multi-menu"
              v-if="menuItem.children && !menuItem.single"
              :key="index"
              :index="index.toString()"
            >
              <template slot="title">
                <i
                  class="menu-icon"
                  :class="menuItem.meta.icon"
                ></i>
                <span slot="title">{{ menuItem.meta.title }}</span>
              </template>
              <el-menu-item-group
                v-for="(subItem, index, key) in menuItem.children"
                :key="key"
              >
                <el-menu-item :index="subItem.path">{{ subItem.meta.title }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <!-- 单个菜单项 -->
            <el-menu-item
              v-else-if="menuItem.children && menuItem.single"
              class="single-menu mt-3"
              :key="index"
              :index="menuItem.children[0].path"
            >
              <i
                class="menu-icon"
                :class="menuItem.children[0].meta.icon"
              ></i>
              <span slot="title">{{ menuItem.children[0].meta.title }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce' // 引入防抖函数
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const logoLight = require('@/assets/images/logo-light.png')
const logoDark = require('@/assets/images/logo-dark.png')
const logoTextDark = require('@/assets/images/logo-text-dark.png')
const logoTextLight = require('@/assets/images/logo-text-light.png')

export default {
  name: 'TheSidebar',
  components: { VuePerfectScrollbar },

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1300) {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', true)
      } else {
        this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false)
      }
    }, 400)
  },

  beforeDestroy() {
    window.onresize = null
  },

  computed: {
    menuTheme() {
      return this.$store.state.menuTheme === 'menu-dark'
    },
    logo() {
      if (this.menuTheme) {
        return logoLight
      }
      return logoDark
    },
    logoText() {
      if (this.menuTheme) {
        return logoTextLight
      }
      return logoTextDark
    },
    menuClass() {
      if (this.menuTheme) {
        return 'menu-semi'
      }
      return 'menu-default'
    },
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse
    },
    sidebarList() {
      return this.$store.state.permission.routes
    },
  },

  methods: {
    switchCollapse() {
      this.$store.commit(
        'SWITCH_SIDEBAR_COLLAPSE',
        !this.sidebarCollapse,
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.menu-main {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  height: 100%;
  &.collapse {
    .logo {
      width: 64px;
      padding: 0 18px;
    }
  }
}

// 滚动区域
.menu-scroll-wrapper {
  height: calc(100% - 64px);
  padding-bottom: 4rem;
  overflow: hidden;
}

.logo {
  width: $side-bar-width;
  padding: 0 36px;
  overflow: hidden;
  transition: $side-bar-collapse-transition;
}

.el-menu.main {
  max-width: $side-bar-width;
  border-right: none;
  &:not(.el-menu--collapse) {
    // 必须设置，否则会出现动画卡顿问题
    width: $side-bar-width;
  }
  &.side-bar-menu {
    padding: 0 18px;
  }
}

.el-submenu::v-deep {
  margin-bottom: 10px;
  .el-submenu__title {
    &:hover {
      border-radius: 0.5rem;
    }
    .menu-icon {
      margin-right: 10px;
      font-size: 22px;
      font-weight: normal;
    }
  }
  .el-submenu__icon-arrow {
    transform: rotateZ(-90deg);
  }
  &.is-opened {
    .el-submenu__title {
      border-radius: 0.5rem;
      .el-submenu__icon-arrow {
        transform: rotateZ(0);
      }
    }
  }
  &.is-active .el-submenu__title {
    border-radius: 0.5rem;
  }

  .el-menu-item-group {
    .el-menu-item {
      height: 40px;
      line-height: 40px;
      &:hover {
        border-radius: 5px;
      }
    }
  }
}

.el-menu-item {
  line-height: 40px;
  height: 40px;
  &:hover {
    border-radius: 5px;
  }
  .menu-icon {
    margin-right: 15px;
    font-size: 22px;
    font-weight: normal;
  }
}

.el-menu-item.is-active {
  color: #fff;
  border-radius: 5px;
  .menu-icon {
    color: inherit;
  }
}
</style>

<style lang="scss">
@import "~@/assets/scss/theme/sidebar.scss";

.el-menu--vertical {
  .el-menu--popup {
    padding: 0;
    border-radius: 0.5rem;
    overflow: hidden;
  }
  .el-menu-item-group {
    background: white;
    .el-menu-item-group__title {
      padding: 0;
    }
  }

  .el-menu-item.is-active {
    background: $bg-primary-gradient;
    color: white;
    opacity: 0.9;
  }
}
</style>
