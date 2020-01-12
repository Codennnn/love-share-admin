<template>
  <div class="layout-main">

    <!-- 侧边栏 -->
    <TheSidebar />

    <div
      id="content-area"
      :class="{'content-area-full': sidebarCollapse}"
    >
      <div class="content-wrapper">
        <!-- 回到顶部按钮 -->
        <BackToTop
          bottom="5%"
          visibleoffset="500"
        >
          <vs-button
            icon="arrow_upward"
            class="shadow-lg"
          />
        </BackToTop>

        <!-- 头部 -->
        <TheNavbar />

        <div class="router-view">
          <div class="router-content pt-24">
            <!-- 面包屑导航 -->
            <transition
              enter-active-class="animated zoomIn faster"
              leave-active-class="animated zoomOut faster"
              mode="out-in"
            >
              <div
                class="flex items-center mt-1 ml-1 mb-3"
                v-if="$route.meta && $route.meta.breadcrumb"
              >
                <i
                  title="返回"
                  class="iconfont icon-back text-semi cursor-pointer"
                  style="font-size: 25px;"
                  @click="$router.go(-1)"
                ></i>
                <vs-breadcrumb>
                  <template v-for="(br, i) in $route.meta.breadcrumb">
                    <li
                      class="text-sm"
                      :class="{'pointer-events-none': br.active}"
                      :key="i"
                    >
                      <router-link
                        class="text-semi"
                        :class="{'primary': br.active}"
                        :to="String(br.to)"
                      >{{ br.title }}</router-link>
                      <span
                        v-if="!br.active"
                        class="vs-breadcrum--separator"
                      >
                        <i class="el-icon-arrow-right text-semi"></i>
                      </span>
                    </li>
                  </template>
                </vs-breadcrumb>
              </div>
            </transition>

            <!-- 主区域 -->
            <transition
              enter-active-class="animated fadeIn faster"
              leave-active-class="animated fadeOut faster"
              mode="out-in"
            >
              <keep-alive
                :include="alivePages"
                :max="5"
              >
                <router-view />
              </keep-alive>
            </transition>
          </div>

          <!-- 页脚 -->
          <TheFooter class="router-footer" />
        </div>
      </div>
    </div>

    <!-- 自定义栏 -->
    <TheCustomizer />

  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import TheSidebar from './components/TheSidebar.vue'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import TheCustomizer from './components/TheCustomizer.vue'

export default {
  name: 'Main',
  components: {
    TheSidebar,
    TheNavbar,
    TheFooter,
    TheCustomizer,
    BackToTop,
  },

  data: () => ({
    alivePages: ['Analytics', 'GoodsList'], // 允许缓存的路由
  }),

  computed: {
    sidebarCollapse() {
      return this.$store.state.sidebarCollapse
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/theme/_themeify.scss";

@include themeify {
  .layout-main {
    background: themed("bg-color-primary");
  }
}

.layout-main {
  position: relative;
  height: 100%;
}

.el-breadcrumb::v-deep {
  .el-breadcrumb__inner {
    font-size: 0.95rem;
    &.is-link {
      font-weight: normal;
    }
    &:not(.is-link) {
      cursor: default;
      color: gray;
      &:hover {
        color: gray;
      }
    }
  }
}

#content-area {
  min-height: 100%;
  min-width: 900px;
  margin-left: $side-bar-width;
  transition: margin-left 0.5s;
  &.content-area-full {
    margin-left: 65px;
  }
  .content-wrapper {
    min-height: 100vh;
  }
}

.router-view {
  position: relative;
  min-height: 100vh;
  padding: 0 2rem;
  .router-content {
    min-height: calc(100vh - #{$footer-height});
  }
  .router-footer {
    height: $footer-height;
    line-height: $footer-height;
  }
}
</style>
