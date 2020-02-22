<template>
  <div style="width: 320px;">
    <VuePerfectScrollbar
      class="fixed right-0 h-screen max-h-full bg-main overflow-hidden"
      style="width: 320px; box-shadow: -1px 0 15px rgba(0, 0, 0, 0.05);"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <div class="p-6 flex flex-col items-center">
        <div class="w-full mb-5 flex justify-between items-center text-semi">
          <span>个人中心</span>
          <el-dropdown>
            <feather
              size="20"
              type="more-vertical"
            ></feather>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(menu, i) in menuItems"
                :key="i"
                class="text-sm text-center"
                @click.native="dispatch(menu.method)"
              >
                {{ menu.text }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

        <div class="text-center">
          <div class="relative">
            <vs-avatar
              size="90px"
              :src="info.avatar_url"
            />
            <div
              class="absolute w-6 h-6 flex-row-center rounded-full"
              style="bottom: 10px; right: 30px;"
              :style="`background: rgba(var(--vs-${genderColor}), 0.8);`"
            >
              <i
                class="text-white"
                :class="info.gender === 0 ? 'el-icon-male' : 'el-icon-female'"
                style="font-size: 0.85rem;"
              ></i>
            </div>
          </div>
          <h3 class="mt-1 text-xl text-primary">{{ info.nickname }}</h3>
          <h4 class="mb-10 text-semi text-xs">{{ info.email }}</h4>
        </div>

        <!-- 联系人 -->
        <div
          v-if="contactList.length > 0"
          class="w-full"
        >
          <div class="mb-2 text-primary">最近联系</div>
          <ul class="avatar-line flex">
            <li
              class="avatar"
              v-for="(it, i) in firstFewContacts"
              :key="i"
            >
              <el-tooltip
                :open-delay="200"
                :content="it.nickname"
              >
                <vs-avatar
                  size="32px"
                  class="m-0 border-2 border-solid border-white"
                  :src="`${it.avatar_url}?imageView2/2/w/80`"
                  @click="$router.push({
                    path: '/user-detail',
                    query: { userId: it._id }
                  })"
                />
              </el-tooltip>
            </li>
            <li
              v-if="firstFewContacts.length > 6"
              class="avatar"
            >
              <vs-avatar
                size="32px"
                class="m-0 border-2 border-solid border-white"
                :text="`+${contactList - firstFewContacts.length}`"
              />
            </li>
          </ul>
        </div>

        <!-- 新通知 -->
        <div
          v-if="unreadAmount > 0"
          class="relative w-full mt-6 overflow-hidden"
        >
          <div class="mb-4 flex justify-between items-center text-primary">
            <div>新消息</div>
            <div class="relative">
              <feather
                size="18"
                class="opacity-50"
                type="bell"
              ></feather>
              <div class="dot absolute bg-danger"></div>
            </div>
          </div>
          <VuePerfectScrollbar
            class="pb-6 overflow-hidden"
            style="max-height: 260px;"
            :settings="{
              maxScrollbarLength: 200,
              wheelSpeed: 0.60,
            }"
          >
            <ul>
              <li
                class="mb-3 flex items-center"
                v-for="(it, i) in firstFewNotices"
                :key="i"
              >
                <div class="mr-2">
                  <div
                    class="w-10 h-10 flex-row-center"
                    style="border-radius: 0.5rem;"
                    :style="`background: rgba(var(--vs-${noticeType[it.type].color}), 0.1);`"
                  >
                    <feather
                      size="18"
                      :class="noticeType[it.type].color"
                      :type="noticeType[it.type].icon"
                    ></feather>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="text-primary">{{ it.title }}</span>
                    <span class="text-xs text-gray">{{ $timeDiff(it.created_at) }}</span>
                  </div>
                  <div class="w-48 truncate text-gray text-xs">{{ it.content }}</div>
                </div>
              </li>
              <li
                v-if="unreadAmount > firstFewNotices.length"
                class="mb-12 flex justify-center"
              >
                <div class="py-1 px-5 flex items-center text-sm text-gray
             bg-gray radius cursor-pointer">
                  查看全部 +{{ unreadAmount - firstFewNotices.length }}
                </div>
              </li>
            </ul>
          </VuePerfectScrollbar>
          <div
            v-if="firstFewNotices.length >= 5"
            class="shadow-hidden absolute bottom-0 py-3 bg-main"
            style="width: 280px;"
          ></div>
        </div>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const menuItems = [
  { text: '账号设置', method: 'routeToProfileSetting' },
  { text: '锁定账号', method: 'lock' },
  { text: '退出登录', method: 'logout' },
]
const noticeType = {
  1: { icon: 'message-square', color: 'primary' },
  2: { icon: 'check-circle', color: 'success' },
  3: { icon: 'help-circle', color: 'warning' },
  4: { icon: 'alert-triangle', color: 'danger' },
}
export default {
  name: 'TheProfileBar',
  components: {
    VuePerfectScrollbar,
  },

  data: () => ({
    menuItems,
    noticeType,
    showPopup: false,
  }),

  computed: {
    ...mapState('admin', ['info']),
    ...mapState('chat', ['contactList']),
    ...mapGetters('notice', ['unreadAmount']),
    firstFewContacts() {
      return this.contactList.slice(0, 5)
    },
    firstFewNotices() {
      return this.$store.getters['notice/getFewNotices'](5)
    },
    genderColor() {
      return this.info.gender ? 'danger' : 'primary'
    },
  },

  methods: {
    dispatch(methodName) {
      this[methodName]()
    },

    routeToProfileSetting() {
      this.$router.push('/profile-setting')
    },

    lock() {
      if (this.$store.getters['admin/lockPwd']) {
        this.$router.push('/lock-screen')
        localStorage.setItem('screen_lock', JSON.stringify({ isLocked: true }))
      } else {
        this.$router.push({
          path: '/profile-setting',
          query: { active: 2 },
        })
      }
    },

    // 退出登录
    async logout() {
      await this.$store.dispatch('admin/SignOut')
      this.$router.replace('/sign')
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  .dot {
    top: -2px;
    right: -1px;
    width: 0.7rem;
    height: 0.7rem;
    border: 3px solid;
    border-radius: 50%;
    border-color: themed("bg-color-main");
  }
}

.avatar-line {
  .avatar {
    transition: all 0.2s;
    &:first-child {
      &:hover {
        transform: translateY(-6px);
        z-index: 50;
      }
    }
    &:not(:first-child) {
      transform: translateX(-10px);
      &:hover {
        transform: translate(-10px, -6px);
        z-index: 50;
      }
    }
  }
}
</style>
