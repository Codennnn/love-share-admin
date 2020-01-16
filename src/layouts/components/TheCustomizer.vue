<template>
  <div>
    <vs-button
      v-show="!active"
      title="主题定制"
      class="fixed right-0 rounded-r-none"
      icon="el-icon-loading"
      icon-pack="el-icon"
      style="top: 50%; z-index: 9999;"
      @click.stop="active = true"
    ></vs-button>

    <vs-sidebar
      class="sidebar-main overflow-hidden"
      style="top: 50%;"
      position-right
      hidden-background
      v-model="active"
    >
      <div class="sidebar-header mt-4 flex items-center justify-between px-6">
        <div>
          <div class="text-lg font-bold">主题定制</div>
          <div class="text-sm">自定义主题，实时预览</div>
        </div>
        <i
          class="el-icon-close text-2xl font-bold cursor-pointer"
          @click.stop="active = false"
        ></i>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <VuePerfectScrollbar
        class="scroll-area pt-4 pb-6"
        :settings="{
          maxScrollbarLength: 180,
          wheelSpeed: 0.60,
        }"
      >
        <div class="p-6">
          <div>
            <p class="section-title mb-4">主题颜色</p>
            <ul class="px-2 flex">
              <li
                title="明亮模式"
                class="relative mr-4"
                @click="switchTheme('light')"
              >

                <img src="@/assets/images/sidebar_default.svg">
                <i
                  v-show="themeStyle === 'light'"
                  class="el-icon-check absolute primary"
                  style="right: 5px; bottom: 5px;"
                ></i>
              </li>
              <li
                title="黑暗模式"
                class="relative"
                @click="switchTheme('dark')"
              >
                <img src="@/assets/images/dark.svg">
                <i
                  v-show="themeStyle === 'dark'"
                  class="el-icon-check absolute primary"
                  style="right: 5px; bottom: 5px;"
                ></i>
              </li>
            </ul>
          </div>

          <vs-divider></vs-divider>

          <div>
            <p class="section-title mb-4">顶部导航</p>
            <ul class="px-2 flex">
              <li class="mr-6">
                <vs-radio
                  vs-value="fixed"
                  v-model="navbarType"
                >固定</vs-radio>
              </li>
              <li>
                <vs-radio
                  vs-value="scroll"
                  v-model="navbarType"
                >随页面滚动</vs-radio>
              </li>
            </ul>
          </div>

          <vs-divider></vs-divider>

          <div>
            <p class="section-title mb-4">侧边栏样式</p>
            <ul class="px-2 flex">
              <li
                title="跟随主题"
                class="relative mr-4"
                @click="switchSidebar('menu-light')"
              >
                <img src="@/assets/images/sidebar_default.svg">
                <i
                  v-show="menuTheme === 'menu-light'"
                  class="el-icon-check absolute primary"
                  style="right: 5px; bottom: 5px;"
                ></i>
              </li>
              <li
                title="突出显示"
                class="relative"
                @click="switchSidebar('menu-dark')"
              >
                <img src="@/assets/images/sidebar_semi.svg">
                <i
                  v-show="menuTheme === 'menu-dark'"
                  class="el-icon-check absolute primary"
                  style="right: 5px; bottom: 5px;"
                ></i>
              </li>
            </ul>
          </div>

          <vs-divider></vs-divider>

        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'TheCustomizer',
  components: { VuePerfectScrollbar },

  data: () => ({
    active: false,
    navType: 'fixed',
  }),

  computed: {
    themeStyle() {
      return this.$store.state.themeStyle
    },
    menuTheme() {
      return this.$store.state.menuTheme
    },
    navbarType: {
      set(type) {
        this.$store.commit('SET_NAV_TYPE', type)
      },
      get() {
        return this.$store.state.navbarType
      },
    },
  },

  methods: {
    switchTheme(theme) {
      this.$store.commit('SET_THEME_STYLE', theme)
    },
    switchSidebar(theme) {
      this.$store.commit('SET_MENU_THEME', theme)
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/theme/_themeify.scss";

@include themeify {
  .sidebar-main::v-deep {
    color: themed("text-color-primary");
    .vs-sidebar {
      background: themed("bg-color-primary");
      .sidebar-header {
        color: themed("text-color-gray-600");
      }
      .section-title {
        color: themed("text-color-gray-600");
      }
      .con-vs-radio {
        color: themed("text-color-gray-500");
      }
    }
  }
}

.sidebar-main::v-deep {
  .vs-sidebar {
    position: fixed;
    max-width: 400px;
  }
  .vs-sidebar--items {
    padding: 0;
    overflow: hidden;
  }
}

.scroll-area {
  height: calc(100% - 4rem);
}
</style>
