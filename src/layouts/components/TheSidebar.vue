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
        :class="{'side-bar-menu': !sidebarCollapse}"
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
                <div class="flex items-center">
                  <component
                    class="menu-icon"
                    size="1x"
                    stroke-width="1.8px"
                    :is="menuItem.meta.icon"
                  ></component>
                  <span slot="title">{{ menuItem.meta.title }}</span>
                </div>
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
              class="single-menu mt-3 flex items-center"
              :key="index"
              :index="menuItem.children[0].path"
            >
              <div class="flex items-center">
                <component
                  class="menu-icon"
                  size="1x"
                  stroke-width="1.8px"
                  :is="menuItem.children[0].meta.icon"
                ></component>
                <span slot="title">{{ menuItem.children[0].meta.title }}</span>
              </div>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </VuePerfectScrollbar>

    <SidebarFooter
      class="mt-8"
      :sidebar-collapse="sidebarCollapse"
    />
  </div>
</template>

<script>
import _debounce from 'lodash/debounce' // 引入防抖函数
import { mapState } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import {
  ActivityIcon, UsersIcon, ShoppingBagIcon, MapIcon, PackageIcon,
  MonitorIcon, AtSignIcon, ClipboardIcon, ListIcon, ServerIcon,
} from 'vue-feather-icons'
import SidebarFooter from './the-sidebar/SidebarFooter.vue'


const logoLight = require('@/assets/images/logo-light.png')
const logoDark = require('@/assets/images/logo-dark.png')
const logoTextDark = require('@/assets/images/logo-text-dark.png')
const logoTextLight = require('@/assets/images/logo-text-light.png')

export default {
  name: 'TheSidebar',
  components: {
    SidebarFooter,
    VuePerfectScrollbar,
    UsersIcon,
    ActivityIcon,
    ShoppingBagIcon,
    MapIcon,
    PackageIcon,
    MonitorIcon,
    AtSignIcon,
    ClipboardIcon,
    ListIcon,
    ServerIcon,
  },

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
    ...mapState(['sidebarCollapse']),
    ...mapState('permission', { sidebarList: 'routes' }),
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
  height: calc(100% - 64px - 100px);
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
    transition: $side-bar-collapse-transition;
  }
}

.multi-menu::v-deep {
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

.single-menu {
  line-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
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

.el-submenu::v-deep .el-submenu__title {
  display: flex;
  align-items: center;
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
