<template>
  <div class="layout-main bg-primary">

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

        <div class="flex">
          <div class="router-view flex-1">
            <div
              class="router-content flex-1"
              :class="{'router-content--hidden': navbarType === 'hidden'}"
            >
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
                  <feather
                    class="text-semi cursor-pointer"
                    type="arrow-left-circle"
                    stroke-width="1.5"
                    @click="$router.go(-1)"
                  ></feather>
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
                        <i
                          v-if="!br.active"
                          class="el-icon-arrow-right text-semi vs-breadcrum--separator"
                        ></i>
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

          <!-- 个人中心 -->
          <TheProfileBar v-show="$route.path === '/profile'" />
        </div>
      </div>
    </div>

    <!-- 在线聊天 -->
    <transition
      enter-active-class="animated zoomIn quickly"
      leave-active-class="animated zoomOutLeft faster"
      mode="out-in"
    >
      <template>
        <div
          id="chat-container"
          v-show="showChatbox"
        >
          <Chat />
        </div>
      </template>
    </transition>

    <!-- 自定义栏 -->
    <TheCustomizer />
  </div>
</template>

<script>
import BackToTop from 'vue-backtotop'
import { mapState } from 'vuex'
import TheSidebar from './components/TheSidebar.vue'
import TheNavbar from './components/TheNavbar.vue'
import TheFooter from './components/TheFooter.vue'
import TheCustomizer from './components/TheCustomizer.vue'
import TheProfileBar from './components/TheProfileBar.vue'
import Chat from '@/views/chat/Chat.vue'

export default {
  name: 'Main',
  components: {
    TheSidebar,
    TheNavbar,
    TheFooter,
    TheCustomizer,
    TheProfileBar,
    Chat,
    BackToTop,
  },

  sockets: {
    connect() {
      this.$socket.emit('setOnline')
    },
  },

  data: () => ({
    alivePages: [
      'Analytics', 'GoodsList', 'OrderList', 'UserList',
    ], // 允许缓存的路由
  }),

  computed: {
    ...mapState(['sidebarCollapse', 'navbarType']),
    ...mapState('chat', ['showChatbox']),
  },

  created() {
    this.$store.dispatch('getCategoryList')
    this.$store.dispatch('getSchoolList')
    this.$store.dispatch('todo/getTodoList')
  },
}
</script>

<style lang="scss" scoped>
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
  min-width: $content-area-min-width;
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
  max-width: $router-view-max-width;
  padding: 0 $router-view-padding;
  .router-content {
    min-height: calc(100vh - #{$footer-height});
    padding-top: 6rem;
    transition: all 0.3s;
    &.router-content--hidden {
      padding-top: 0;
    }
  }
  .router-footer {
    height: $footer-height;
    line-height: $footer-height;
  }
}

#chat-container {
  position: fixed;
  left: 30px;
  bottom: 30px;
  z-index: 9999;
}
</style>
