<template>
  <div>
    <vs-button
      v-show="!active"
      title="主题定制"
      class="fixed right-0 rounded-r-none"
      icon="el-icon-loading"
      icon-pack="el-icon"
      style="top: 50%; z-index: 999999;"
      @click.stop="active = true"
    ></vs-button>
    <vs-sidebar
      class="sidebar-main overflow-hidden"
      style="top: 50%;"
      position-right
      hidden-background
      v-model="active"
    >
      <div class="mt-4 flex items-center justify-between px-6">
        <div>
          <div class="text-lg text-gray-600 font-bold">主题定制</div>
          <div class="text-sm text-gray-600">自定义主题，实时预览</div>
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
          <p class="mb-4">侧边栏颜色</p>
          <ul class="flex">
            <li
              class="w-10 h-10 mr-4 rounded-lg bg-white border-2 cursor-pointer"
              :class="{'shadow-outline': menuTheme === 'menu-light'}"
              @click="switchSidebar('menu-light')"
            ></li>
            <li
              class="w-10 h-10 rounded-lg bg-primary cursor-pointer"
              :class="{'shadow-outline': menuTheme === 'menu-dark'}"
              @click="switchSidebar('menu-dark')"
            ></li>
          </ul>
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
  }),

  computed: {
    menuTheme() {
      return this.$store.state.menuTheme
    },
  },

  methods: {
    switchSidebar(theme) {
      this.$store.commit('SET_MENU_THEME', theme)
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebar-main::v-deep {
  .vs-sidebar {
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
