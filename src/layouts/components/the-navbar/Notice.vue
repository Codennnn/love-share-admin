<template>
  <vs-dropdown vs-custom-content>
    <el-badge
      class="nav-icon"
      style="margin-top: 0.85rem;"
      :value="unreadAmount > 0 ? unreadAmount : ''"
    >
      <feather
        size="23"
        type="bell"
      ></feather>
    </el-badge>
    <vs-dropdown-menu
      id="div-with-loading"
      class="menu-box"
    >
      <div
        class="notice-header w-full text-center text-white cursor-pointer"
        style="height: 65px;"
      >
        <div
          class="h-full flex-row-center"
          @click="noticesRefresh()"
        >
          <div
            title="点击刷新 (=・ω・=)"
            class="text-xl"
          >收到 {{ unreadAmount }} 条未读通知</div>
        </div>
      </div>
      <VuePerfectScrollbar
        class="bg-main"
        style="height: 350px;"
        :settings="{
          maxScrollbarLength: 160,
          wheelSpeed: 0.60,
        }"
      >
        <ul
          v-if="unreadAmount > 0"
          class="vs-con-loading__container"
        >
          <li
            class="notice relative p-4 flex justify-between cursor-pointer"
            style="transition: all 0.3s;"
            v-for="(nt, i) in unreadNotices"
            :key="i"
          >
            <div class="flex items-start">
              <feather
                :class="noticeType[nt.type].color"
                :type="noticeType[nt.type].icon"
              ></feather>
              <div class="mx-2 flex-1">
                <div>
                  <div :class="[`${noticeType[nt.type].color}`]">{{ nt.title }}</div>
                  <div
                    class="notice-content text-sm text-gray"
                    v-html="nt.content"
                    :title="nt.content"
                  ></div>
                </div>
              </div>
            </div>
            <small class="text-gray whitespace-no-wrap">{{ $timeDiff(nt.created_at) }}</small>
            <feather
              title="不再通知"
              type="bell-off"
              size="15"
              class="read absolute text-gray"
              @click="setNoticeRead(nt._id)"
            ></feather>
          </li>
        </ul>
        <div
          class="h-full flex flex-col items-center justify-center bg-main"
          v-else
        >
          <vs-icon
            size="80px"
            icon="blur_on"
            color="#718096"
          ></vs-icon>
          <div class="mt-4 text-gray text-sm">暂无更多新的通知</div>
        </div>
      </VuePerfectScrollbar>
      <div
        class="w-full py-2 px-4 flex justify-between items-center text-sm
        bg-gray"
        style="transition: all 0.3s;"
      >
        <span
          class="text-gray cursor-pointer"
          @click="setAllNoticesRead()"
        >全部已读</span>
        <span
          class="primary cursor-pointer"
          @click="$router.push('/notice')"
        >查看全部通知</span>
      </div>
    </vs-dropdown-menu>
  </vs-dropdown>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { setNoticeRead, setAllNoticesRead } from '@/request/api/notice'

const noticeType = {
  1: { icon: 'message-square', color: 'primary' },
  2: { icon: 'check-circle', color: 'success' },
  3: { icon: 'help-circle', color: 'warning' },
  4: { icon: 'alert-triangle', color: 'danger' },
}

export default {
  name: 'Notice',
  components: { VuePerfectScrollbar },

  data: () => ({
    noticeType,
  }),

  created() {
    this.getUnreadNotices()
  },

  mounted() {
    this.sockets.subscribe(`receiveNotice${this.adminId}`, (notice) => {
      this.$vs.notify({
        title: notice.title,
        text: `${notice.content.substring(0, 10)}...`,
        icon: 'chat',
        color: ['primary', 'success', 'warning', 'danger'][notice.type - 1],
        position: 'top-right',
        time: 5000,
      })
      this.$store.dispatch('notice/getUnreadNotices')
    })
  },

  computed: {
    ...mapState('notice', ['unreadNotices']),
    ...mapGetters('notice', ['unreadAmount']),
    adminId() {
      return this.$store.state.admin.info._id
    },
  },

  methods: {
    // 获取未读通知
    async getUnreadNotices() {
      await this.$store.dispatch('notice/getUnreadNotices')
    },

    // 刷新通知
    async noticesRefresh() {
      this.$vs.loading({
        type: 'point',
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        await this.getUnreadNotices()
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },

    async setNoticeRead(notice_id) {
      const { code } = await setNoticeRead({ notice_id })
      if (code === 2000) {
        this.$store.commit('notice/REMOVE_UNREAD_ITEM', notice_id)
      }
    },

    async setAllNoticesRead() {
      if (this.unreadNotices.length > 0) {
        const noticeIdList = this.unreadNotices.map(el => el._id)
        const { code } = await setAllNoticesRead({ notice_id_list: noticeIdList })
        if (code === 2000) {
          this.$store.commit('notice/SET_UNREAD_NOTICES', [])
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  .vs-dropdown-menu.menu-box::v-deep {
    .notice-header {
      background: themed("notice-header-bg-color");
    }
    .vs-dropdown--menu--after {
      background: themed("notice-header-bg-color");
    }
    .notice {
      &:hover {
        background: themed("notice-hover-color");
      }
    }
  }
}

.notice {
  .read {
    right: -30px;
    bottom: 5px;
    transition: all 0.2s;
    opacity: 0;
  }
  &:hover {
    .read {
      right: 15px;
      opacity: 1;
    }
  }
}

.vs-dropdown-menu.menu-box::v-deep {
  width: 365px;

  .vs-dropdown--menu {
    padding: 0 !important;
    border: 0;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .notice-content {
    @include textOverflow($width: 240px, $line: 2);
  }
}
</style>
