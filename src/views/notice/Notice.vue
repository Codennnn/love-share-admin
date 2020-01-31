<template>
  <div class="flex pt-8">
    <!-- 左侧 -->
    <div class="w-1/4 pr-5">
      <div class="p-2 bg-gray radius">
        <div class="p-1">
          <div
            class="py-3 text-primary text-lg font-bold cursor-default"
            style="box-shadow: 0 7px 7px -5px rgba(0, 0, 0, 0.08)"
          >消息中心</div>
          <ul class="pt-4">
            <li
              class="li-item px-3 py-1 text-gray cursor-pointer"
              v-for="(item, i) in list"
              :key="i"
              :class="{'text-primary': currentActive === item.title}"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="w-3/4">
      <div
        id="message-with-loading"
        class="p-4 bg-primary radius vs-con-loading__container"
      >
        <div class="mb-4 flex items-center justify-end">
          <el-dropdown
            class="mr-auto"
            @command="handleCommand"
          >
            <span class="el-dropdown-link text-semi">
              {{ label }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(it, i) in menuItem"
                :key="i"
                :command="it.command"
                :icon="it.icon"
              >
                {{ it.name }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- 操作栏 -->
          <div class="relative flex items-center">
            <div
              class="action-line absolute flex items-center text-xl text-semi bg-gray"
              :class="{'show': showAction}"
            >
              <vs-checkbox
                title="全选"
                v-model="selectAll"
              ></vs-checkbox>
              <i
                title="设为已读"
                class="el-icon-finished mx-2 cursor-pointer"
                @click="setAllNoticesRead()"
              ></i>
              <i
                title="删除"
                class="el-icon-delete mx-2 cursor-pointer"
                @click="deleteManyNotices()"
              ></i>
              <i
                title="关闭"
                class="el-icon-close cursor-pointer"
                @click="showAction = false"
              ></i>
            </div>
            <vs-icon
              v-show="!showAction"
              class="mx-1 text-gray cursor-pointer"
              title="管理"
              size="25px"
              icon="settings_ethernet"
              @click.native="showAction = true"
            ></vs-icon>
          </div>

          <vs-icon
            class="text-gray cursor-pointer"
            title="刷新"
            size="25px"
            icon="refresh"
            @click.native="selectAll = false, showAction = false, refreshNoticeList()"
          ></vs-icon>
        </div>

        <ul
          v-show="dataList.length > 0"
          style="height: 650px; overflow: auto;"
          v-infinite-scroll="loadMore"
          :infinite-scroll-disabled="stop"
        >
          <li
            class="mb-3 p-2 flex items-center radius"
            style="transition: all 0.3s;"
            v-for="(it, i) in dataList"
            :key="i"
            :data-id="it._id"
          >
            <div>
              <div class="mb-2 flex items-center">
                <vs-icon
                  size="small"
                  :icon="noticeType[it.type].icon"
                  :color="noticeType[it.type].color"
                ></vs-icon>
                <span
                  class="ml-2"
                  :class="[`${noticeType[it.type].color}`,
                  {'font-bold': isUnread(it._id)}]"
                >
                  {{ it.title }}
                </span>
              </div>
              <div
                class="px-8 text-semi"
                v-html="it.content"
              >
              </div>
            </div>
            <div class="ml-auto">
              <div class="ml-4 text-gray text-xs">
                {{ setTime(it.created_at) }}
              </div>
              <vs-checkbox
                v-show="showCheckBox"
                v-model="select"
                :vs-value="it._id"
              ></vs-checkbox>
            </div>
          </li>
        </ul>

        <!-- 无数据 -->
        <div
          v-if="dataList.length <= 0"
          class="mt-5 py-10 flex-col-center radius bg-gray"
        >
          <img
            class="w-48 mb-5"
            src="@/assets/images/no_data.svg"
          >
          <p class="text-semi">暂无通知</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getNoticeList, setAllNoticesRead, deleteNotice, deleteManyNotices,
} from '@/request/api/notice'

const list = [
  { title: '系统通知' },
  { title: '我的消息' },
]
const menuItem = [
  { name: '全部消息', command: { label: '全部消息', type: 0 }, icon: '' },
  { name: '系统', command: { label: '系统消息', type: 1 }, icon: 'el-icon-chat-square' },
  { name: '成功', command: { label: '成功消息', type: 2 }, icon: 'el-icon-check' },
  { name: '提示', command: { label: '提示消息', type: 3 }, icon: 'el-icon-news' },
  { name: '重要', command: { label: '重要消息', type: 4 }, icon: 'el-icon-warning-outline' },
  { name: '未读', command: { label: '未读消息', type: 5 }, icon: 'el-icon-bell' },
]
const noticeType = {
  1: { icon: 'chat_bubble_outline', color: 'primary' },
  2: { icon: 'done_outline', color: 'success' },
  3: { icon: 'help_outline', color: 'warning' },
  4: { icon: 'error_outline', color: 'danger' },
}

export default {
  name: 'Notice',
  data: () => ({
    list,
    menuItem,
    noticeType,
    currentActive: '系统通知',
    label: '全部消息',

    rawData: [], // 原始数据
    dataList: [], // 显示数据
    select: [], // 选中的数据
    deleteId: null,
    selectAll: false, // 是否全选
    showAction: false, // 显示更多操作
    stop: false, // 禁用无限滚动

    page: 1,
    pageSize: 10,
  }),

  watch: {
    select() {
      if (this.isAllSelect) {
        this.selectAll = true
      } else {
        this.selectAll = false
      }
    },
    selectAll(val) {
      if (val) {
        this.onSelectAll()
      } else if (this.isAllSelect) {
        this.onCancelSelectAll()
      }
    },
  },

  computed: {
    isAllSelect() {
      return this.dataList.every(el => this.select.includes(el._id))
    },
    showCheckBox() {
      return this.showAction
    },
    isUnread() {
      return id => this.$store.getters['notice/isUnread'](id)
    },
  },

  methods: {
    // 获取通知列表
    async getNoticeList(page) {
      this.$vs.loading({
        type: 'point',
        container: '#message-with-loading',
        scale: 1,
      })
      this.stop = true

      try {
        const { code, data } = await getNoticeList({ page, page_size: this.pageSize })
        if (code === 2000) {
          this.rawData.push(...data.notice_list)
          this.dataList = [...this.rawData]
          this.page += 1
          this.stop = false
          if (data.notice_list.length < this.pageSize) {
            this.stop = true
          }
        }
      } catch {
        this.stop = true
      } finally {
        this.$vs.loading.close('#message-with-loading > .con-vs-loading')
      }
    },

    // 加载更多
    async loadMore() {
      if (!this.stop) {
        this.getNoticeList(this.page)
      }
    },

    // 设置显示时间
    setTime(time) {
      const noticeTime = this.$dayjs(time)
      const diffYear = this.$dayjs().diff(noticeTime, 'year')
      if (diffYear < 1) {
        return noticeTime.format('M月DD日')
      }
      return noticeTime.format('YYYY年MM月DD日')
    },

    // 刷新通知列表
    refreshNoticeList() {
      this.label = '全部消息'
      this.page = 1
      this.rawData = []
      this.getNoticeList(this.page)
    },

    // 多条消息设为已读
    async setAllNoticesRead() {
      if (this.select.length > 0) {
        const { code } = await setAllNoticesRead({ notice_id_list: this.select })
        if (code === 2000) {
          this.$store.dispatch('notice/getUnreadNotices')
          this.$vs.notify({
            title: '已设为已读',
            text: '该消息已被设置为已读消息',
          })
        }
      }
    },

    // 删除消息
    async deleteNotice() {
      const { code } = await deleteNotice({ notice_id: this.deleteId })
      if (code === 2000) {
        this.$store.dispatch('notice/getUnreadNotices')
        this.refreshNoticeList()
      }
    },

    // 删除多条消息
    async deleteManyNotices() {
      if (this.select.length > 0) {
        const { code } = await deleteManyNotices({ notice_id_list: this.select })
        if (code === 2000) {
          this.$store.dispatch('notice/getUnreadNotices')
          this.handleCommand({ label: '全部消息' })
          await this.refreshNoticeList()
          this.selectAll = false
        }
      }
    },

    // 选择全部
    onSelectAll() {
      this.select = this.dataList.map(el => el._id)
    },

    // 取消选择全部
    onCancelSelectAll() {
      this.select = []
    },

    // 筛选通知类型
    handleCommand({ label, type }) {
      this.label = label
      if (type === 0) {
        this.dataList = this.rawData
      } else if (type === 5) {
        this.dataList = this.rawData.filter(el => !el.is_read)
      } else {
        this.dataList = this.rawData.filter(el => el.type === type)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.li-item {
  transition: color 0.3s;
  &:hover {
    color: rgba(var(--vs-primary), 0.8);
  }
}

.action-line {
  z-index: 999;
  top: 50%;
  right: 0;
  max-width: 0;
  height: 35px;
  line-height: 35px;
  transform: translateY(-50%);
  transition: all 0.4s;
  border-radius: 1rem;
  overflow: hidden;
  opacity: 0;
  &.show {
    opacity: 1;
    max-width: 150px;
    padding: 0 0.6rem;
  }
}
</style>
