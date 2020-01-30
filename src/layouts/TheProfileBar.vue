<template>
  <div style="width: 320px;">
    <VuePerfectScrollbar
      class="fixed right-0 h-screen bg-primary overflow-hidden"
      style="max-height: 100%; width: 320px; box-shadow: -1px 0 15px rgba(0, 0, 0, 0.05);"
      :settings="{
        maxScrollbarLength: 200,
        wheelSpeed: 0.60,
      }"
    >
      <div class="p-6 flex flex-col items-center">
        <div class="w-full mb-5 flex justify-between items-center text-semi">
          <span>个人中心</span>
          <vs-dropdown vs-trigger-click>
            <MoreVerticalIcon size="1.2x"></MoreVerticalIcon>
            <vs-dropdown-menu class="w-24">
              <vs-dropdown-item class="text-sm text-center">
                编辑信息
              </vs-dropdown-item>
              <vs-dropdown-item class="text-sm text-center">
                退出登录
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
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
              v-for="(it, i) in contactList"
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
                />
              </el-tooltip>

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
              <BellIcon
                size="1.1x"
                class="opacity-50"
              />
              <div class="dot absolute bg-danger"></div>
            </div>
          </div>
          <VuePerfectScrollbar
            class="overflow-hidden"
            style="max-height: 250px;"
            :settings="{
              maxScrollbarLength: 200,
              wheelSpeed: 0.60,
            }"
          >
            <ul>
              <li
                class="mb-3 flex items-center"
                v-for="(it, i) in fewNotices"
                :key="i"
              >
                <div class="mr-2">
                  <div
                    class="w-10 h-10 flex-row-center"
                    style="border-radius: 0.5rem;"
                    :style="`background: rgba(var(--vs-${noticeType[it.type].color}), 0.1);`"
                  >
                    <component
                      size="1x"
                      style="margin-top: 2px;"
                      :class="noticeType[it.type].color"
                      :is="noticeType[it.type].icon"
                    ></component>
                  </div>
                </div>
                <div class="flex-1">
                  <div class="flex justify-between items-center">
                    <span class="text-primary">{{ it.title }}</span>
                    <span class="text-xs text-gray">{{ $timeDiff(it.created_at) }}</span>
                  </div>
                  <div class="w-48 text-overflow text-gray text-xs">{{ it.content }}</div>
                </div>
              </li>
              <li
                v-if="unreadAmount > fewNotices.length"
                class="mb-12 flex justify-center"
              >
                <div class="py-1 px-5 flex items-center text-sm text-gray
             bg-gray radius cursor-pointer">
                  查看全部
                </div>
              </li>
            </ul>
          </VuePerfectScrollbar>
          <div
            v-if="unreadAmount > fewNotices.length"
            class="shadow-hidden absolute bottom-0 py-3 bg-primary"
            style="width: 280px;"
          ></div>
        </div>
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import {
  BellIcon, MoreVerticalIcon, MessageSquareIcon, CheckCircleIcon, HelpCircleIcon, AlertTriangleIcon,
} from 'vue-feather-icons'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

const noticeType = {
  1: { icon: 'MessageSquareIcon', color: 'primary' },
  2: { icon: 'CheckCircleIcon', color: 'success' },
  3: { icon: 'HelpCircleIcon', color: 'warning' },
  4: { icon: 'AlertTriangleIcon', color: 'danger' },
}
export default {
  name: 'TheProfileBar',
  components: {
    VuePerfectScrollbar,
    BellIcon,
    MoreVerticalIcon,
    MessageSquareIcon,
    CheckCircleIcon,
    HelpCircleIcon,
    AlertTriangleIcon,
  },

  data: () => ({
    noticeType,
  }),

  computed: {
    ...mapState('admin', ['info']),
    ...mapState('chat', ['contactList']),
    ...mapGetters('notice', ['unreadAmount']),
    genderColor() {
      return this.info.gender ? 'danger' : 'primary'
    },
    fewNotices() {
      return this.$store.getters['notice/getFewNotices'](5)
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
    border-color: themed("bg-color-primary");
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
