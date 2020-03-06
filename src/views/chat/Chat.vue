<template>
  <div
    id="chat-app"
    class="relative border border-solid base-shadow border-primary overflow-hidden"
    style="border-radius: 1rem;"
  >
    <!-- 左侧 -->
    <vs-sidebar
      id="chat-list-sidebar"
      parent="#chat-app"
      v-model="isChatSidebarActive"
      :click-not-close="true"
      :hidden-background="clickNotClose"
    >
      <div class="flex items-center px-4 py-3 bg-main">
        <div class="relative inline-flex">
          <vs-avatar
            v-if="userId"
            class="m-0"
            size="40px"
            :src="`${$store.state.admin.info.user.avatar_url}?imageView2/2/w/60`"
          />
        </div>
        <vs-input
          icon-no-border
          class="w-full mx-5"
          placeholder="搜索或新建聊天"
          icon="el-icon-search"
          icon-pack="el-icon"
          v-model="chatSearch"
        />
        <i
          class="el-icon-d-arrow-left text-xl text-gray-700 cursor-pointer"
          v-if="!clickNotClose"
          @click.stop="isChatSidebarActive = false"
        ></i>
      </div>
      <vs-divider class="m-0" />

      <VuePerfectScrollbar
        class="chat-scroll-area bg-main"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div class="chat__chats-list mb-8">
          <ul
            v-if="contactList.length > 0"
            class="chat__active-chats bordered-items"
          >
            <li
              class="cursor-pointer"
              v-for="(contact, i) in contactList"
              :key="i"
              @click="updateActiveChatUser(contact)"
            >
              <ChatContact
                :contact="contact"
                :lastMessaged="chatLastMessaged(contact._id)"
                :isActiveChatUser="isActiveChatUser(contact._id)"
              />
            </li>
          </ul>
          <div
            v-else
            class="h-full py-40 flex flex-col items-center justify-center text-sm text-gray"
          >
            <i class="el-icon-chat-dot-round mb-4 text-4xl"></i>
            <p v-if="userId">暂无联系人</p>
            <p v-else>还未绑定用户哦</p>
          </div>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>

    <!-- 右侧 -->
    <div
      class="relative bg-gray"
      :class="{'sidebar-spacer--wide': clickNotClose}"
    >
      <div class="chat-navbar">
        <ChatNavbar
          :nickname="activeChatNickname"
          :isSidebarCollapsed="!clickNotClose"
          @openContactsSidebar="isChatSidebarActive = true"
        />
      </div>

      <!-- 聊天内容 -->
      <VuePerfectScrollbar
        ref="chatLogPS"
        class="chat-content-scroll-area"
        style="min-width: 400px;"
        :settings="{
          maxScrollbarLength: 60,
          wheelSpeed: 0.70,
        }"
      >
        <div ref="chatLog">
          <ChatLog :contactId="activeChatUser" />
        </div>
      </VuePerfectScrollbar>

      <!-- 输入框 -->
      <div
        v-if="activeChatUser"
        class="chat-input flex items-center px-4 py-3 bg-main"
      >
        <el-popover
          class="mr-2 cursor-pointer"
          popper-class="emoji-dropdown"
          transition="el-zoom-in-bottom"
        >
          <VEmojiPicker
            labelSearch="搜索..."
            @select="onSelectEmoji"
          />
          <div
            slot="reference"
            class="py-2 px-3 bg-gray radius"
          >
            😊
          </div>
        </el-popover>

        <div class="message relative flex-1 radius overflow-hidden bg-gray">
          <vs-input
            class="type-input w-full"
            placeholder="输入您的消息..."
            v-model="message"
            @keyup.enter="sendMessage()"
          />
          <div
            class="absolute top-0 right-0 w-12 h-full ml-4 flex-row-center
             bg-gray text-semi text-sm rounded cursor-pointer"
            @click="sendMessage()"
          >
            <feather
              size="19"
              stroke-width="1.8"
              type="send"
            ></feather>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _debounce from 'lodash/debounce'
import { mapState, mapGetters } from 'vuex'

import VEmojiPicker from 'v-emoji-picker'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import ChatContact from './components/ChatContact.vue'
import ChatNavbar from './components/ChatNavbar.vue'
import ChatLog from './components/ChatLog.vue'

export default {
  name: 'Chat',
  components: {
    VEmojiPicker,
    VuePerfectScrollbar,
    ChatContact,
    ChatNavbar,
    ChatLog,
  },

  data: () => ({
    // 侧边栏是否激活
    clickNotClose: true,
    isChatSidebarActive: true,

    deleteContactId: '',
    chatSearch: '', // 搜索聊天
    message: '', // 要发送的消息
  }),

  computed: {
    ...mapState('chat', ['activeChatUser', 'activeChatNickname']),
    ...mapGetters('admin', ['userId']),
    // 全部联系人
    contactList() {
      return this.$store.getters['chat/getContactList']
    },
    // 最后一条发送的消息
    chatLastMessaged() {
      return contactId => this.$store.getters['chat/chatLastMessaged'](contactId)
    },
    // 没读的消息条数
    chatUnseenMessages() {
      return (contactId) => {
        const unseenMsg = this.$store.getters['chat/chatUnseenMessages'](contactId)
        if (unseenMsg) {
          return unseenMsg
        }
        return 0
      }
    },
    // 当前打开的聊天
    isActiveChatUser() {
      return contactId => contactId === this.activeChatUser
    },
  },

  created() {
    this.$store.dispatch('chat/initChat')
  },

  mounted() {
    window.onresize = _debounce(() => {
      if (document.body.clientWidth <= 1000) {
        this.setSidebarActive(false)
      } else {
        this.setSidebarActive(true)
      }
    }, 400)

    // 监听自身 ID 接收消息
    this.sockets.subscribe(this.userId, (msg) => {
      this.$store.dispatch('chat/receiveMessage', msg)
    })
  },

  beforeDestroy() {
    window.onresize = null
  },

  methods: {
    updateActiveChatUser({ _id, nickname, avatar_url }) {
      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname, avatar_url })
      this.$store.dispatch('chat/markSeenAllMessages', _id)
      this.message = ''
      this.$nextTick(() => {
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
      })
    },

    onSelectEmoji(emoji) {
      this.message += emoji.data
    },

    sendMessage() {
      if (this.message.length <= 0) return

      const message = {
        type: 'text',
        msg: this.message,
        is_sent: true,
        is_seen: false,
        client: this.userId,
        target: this.activeChatUser,
        time: Date.now(),
      }
      this.$socket.emit('sendMessage', message)
      this.$store.commit('chat/SEND_CHAT_MESSAGE', message)
      this.message = ''
      this.$nextTick(() => {
        // 发送消息后聊天框滚动到底部
        this.$refs.chatLogPS.$el.scrollTop = this.$refs.chatLog.scrollHeight
      })
    },

    setSidebarActive(active) {
      if (active) {
        this.clickNotClose = true
        this.isChatSidebarActive = true
      } else {
        this.clickNotClose = false
        this.isChatSidebarActive = false
      }
    },

    async deleteContact() {
      await this.$store.dispatch('chat/deleteContact', this.deleteContactId)
    },
  },
}
</script>

<style lang="scss" scoped>
// 联系人侧边栏宽度
$sidebar-width: 310px;

@include themeify {
  #chat-list-sidebar::v-deep {
    .vs-sidebar {
      border-right: 1px solid themed("border-color-primary");
    }
  }
}

#chat-app::v-deep {
  #chat-list-sidebar,
  #chat-profile-sidebar {
    .vs-sidebar {
      max-width: $sidebar-width;
    }
    .vs-sidebar--background {
      position: absolute;
      background: rgba(0, 0, 0, 0.1);
    }
    .vs-sidebar--items {
      height: 100%;
      padding: 0;
      overflow: hidden;
    }
    .vs-con-input {
      .vs-inputx {
        border-radius: 20px;
      }
      .vs-icon {
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
      }
    }
  }

  #chat-list-sidebar {
    .chat-scroll-area {
      position: relative;
      margin: auto;
      width: 100%;
      height: calc(100% - 64px);
      .chat__contact {
        transition: background-color 0.1s;
        &:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      }
    }
  }

  .sidebar-spacer--wide {
    width: calc(100% - #{$sidebar-width});
    margin-left: $sidebar-width;
  }
}

.chat-navbar {
  position: relative;
  width: 100%;
  z-index: 999;
}
.chat-content-scroll-area {
  top: 0;
  margin: auto;
  width: 100%;
  height: calc(100vh - 350px);
}
.chat-input {
  position: relative;
  width: 100%;
}

.message .type-input::v-deep {
  .vs-inputx {
    border: none !important;
    box-shadow: none;
    background: transparent;
    padding: 0.6rem 3rem 0.6rem 0.6rem;
  }
  .input-span-placeholder {
    padding: 0.6rem 3rem 0.6rem 0.6rem;
  }
}
</style>

<style lang="scss">
#chat-app {
  // 给头像加白色边框
  .con-vs-avatar {
    .con-img.vs-avatar--con-img {
      border: 2px solid white;
    }
  }
}

.emoji-dropdown {
  z-index: 999999 !important;
  padding: 0 !important;
  border-radius: $large-radius !important;
  overflow: hidden;
  #EmojiPicker {
    border-radius: $large-radius !important;
    border: none;
    .category {
      padding: 0.5rem 0;
      &.active {
        border-color: $primary;
      }
    }
  }
}
</style>
