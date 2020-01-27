<template>
  <div
    class="footer flex items-center"
    :class="{'px-3': !sidebarCollapse}"
    style="height: 50px;"
  >
    <div
      v-show="!sidebarCollapse"
      class="relative w-3/4 h-full"
    >
      <div
        class="task absolute bottom-0 left-0 px-3
           bg-gray text-primary radius cursor-pointer overflow-hidden"
        :class="{'is-open bg-semi': isTaskOpen}"
        @click="isTaskOpen = true"
      >
        <!-- 头部 -->
        <div
          class="absolute w-full flex items-center"
          style="top: 14px;"
        >
          <LayersIcon
            size="1.2x"
            class="mx-3"
          ></LayersIcon>
          <div>我的任务</div>
          <div
            v-show="isTaskOpen"
            class="ml-auto mr-8 w-8 h-8 rounded-full flex items-center justify-center bg-gray"
            @click.stop="isTaskOpen = false"
          >
            <ChevronDownIcon
              stroke-width="1.6px"
              class="mt-1 cursor-pointer"
            ></ChevronDownIcon>
          </div>
        </div>
        <div
          v-show="isTaskOpen"
          class="mt-6 py-10"
        >
          <p class="mb-2 text-xl text-primary font-bold">今日任务</p>
          <VuePerfectScrollbar
            class="h-48 overflow-hidden"
            :settings="{
              maxScrollbarLength: 160,
              wheelSpeed: 0.60,
            }"
          >
            <ul class="h-full">
              <li
                class="px-2 py-1 flex"
                v-for="(it, i) in todoList"
                :key="i"
              >
                <i class="el-icon-news mt-1 mr-3 primary text-2xl"></i>
                <div class="flex-1">
                  <div class="text-semi font-bold">{{ it.title }}</div>
                  <div class="text-xs text-gray">
                    {{ $dayjs(it.created_at).format('YYYY-MM-DD') }}
                  </div>
                </div>
                <!-- <div class="text-semi text-sm">{{ it.content }}</div> -->
              </li>
            </ul>
          </VuePerfectScrollbar>
        </div>
        <!-- 尾部 -->
        <div
          v-show="isTaskOpen"
          class="absolute pl-4 pr-3 py-1 flex items-center cursor-pointer bg-gray radius"
          style="bottom: 10px; right: 10px;"
        >
          <div
            class="flex items-center text-gray"
            @click.stop="viewAll()"
          >
            <span class="mr-1 text-sm">查看全部</span>
            <ChevronRightIcon size="1x"></ChevronRightIcon>
          </div>
        </div>
      </div>
    </div>

    <div
      class="chat flex justify-center items-center radius cursor-pointer"
      style="height: 50px; width: 50px; margin-left: 0.4rem;"
      @click="$store.commit('chat/SET_CHAT_OPEN')"
    >
      <MessageSquareIcon
        size="1.3x"
        class="chat-icon"
      ></MessageSquareIcon>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {
  MessageSquareIcon, LayersIcon, ChevronRightIcon, ChevronDownIcon,
} from 'vue-feather-icons'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'SidebarFooter',
  components: {
    VuePerfectScrollbar, MessageSquareIcon, LayersIcon, ChevronRightIcon, ChevronDownIcon,
  },

  props: {
    sidebarCollapse: Boolean,
  },

  data: () => ({
    isTaskOpen: false,
  }),

  watch: {
    sidebarCollapse(v) {
      if (!v) {
        this.isTaskOpen = false
      }
    },
  },

  computed: {
    ...mapState('todo', ['todoList']),
  },

  methods: {
    viewAll() {
      this.$router.push('/todo-list')
      this.isTaskOpen = false
    },
  },
}
</script>

<style lang="scss" scoped>
.footer {
  .task {
    transition: all 0.3s;
    width: 95%;
    height: 50px;
    max-height: 100%;
    &.is-open {
      width: 450px;
      height: 600px;
      max-height: 600px;
      box-shadow: $base-shadow;
      cursor: default;
    }
  }
}
</style>
