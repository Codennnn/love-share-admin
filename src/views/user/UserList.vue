<template>
  <div class="pt-6">
    <!-- 统计卡片 -->
    <UserStatistics class="mb-8" />

    <!-- 用户列表 -->
    <div class="p-4 radius bg-semi overflow-hidden">
      <vs-table
        search
        pagination
        noDataText="暂无数据"
        :max-items="4"
        :data="userList"
      >
        <template slot="thead">
          <vs-th>头像</vs-th>
          <vs-th>昵称</vs-th>
          <vs-th>信用度</vs-th>
          <vs-th>乐享值</vs-th>
          <vs-th>注册时间</vs-th>
        </template>

        <template slot-scope="{data}">
          <vs-tr
            v-for="(tr, i) in data"
            :key="i"
          >
            <vs-td>
              <vs-avatar
                size="40px"
                :src="`${tr.avatar_url}?imageView2/2/w/40`"
                @click="$router.push({
                  path: '/user-detail',
                  query: {userId: tr._id}
                })"
              />
            </vs-td>
            <vs-td class="font-bold">{{ tr.nickname }}</vs-td>
            <vs-td>
              <vs-progress
                :height="8"
                :title="`${tr.credit_value}分`"
                :percent="(tr.credit_value / 1000) * 100"
                :color="setCreditColor(tr.credit_value)"
              ></vs-progress>
            </vs-td>
            <vs-td>
              <p class="ml-4 font-bold">{{ tr.share_value }}</p>
            </vs-td>
            <vs-td>
              <p>{{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}</p>
            </vs-td>
            <vs-td>
              <el-dropdown>
                <i class="el-icon-more-outline"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="contactUser(tr._id, tr.nickname)">
                    <div class="flex-row-center">
                      <feather
                        class="mr-2"
                        size="17"
                        stroke-width="1.4"
                        type="message-square"
                      ></feather>
                      联系
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="$router.push({
                    path: '/user-detail',
                    query: { userId: tr._id }
                  })">
                    <div class="flex-row-center">
                      <feather
                        class="mr-2"
                        size="17"
                        stroke-width="1.4"
                        type="disc"
                      ></feather>
                      查看
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item @click.native="$router.push({
                    path: '/user-detail',
                    query: { userId: tr._id }
                  })">
                    <div class="flex-row-center">
                      <feather
                        class="mr-2"
                        size="17"
                        stroke-width="1.4"
                        type="user-x"
                      ></feather>
                      禁用
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item divided>
                    <div class="flex-row-center danger">
                      <feather
                        class="mr-2"
                        size="17"
                        stroke-width="1.4"
                        type="trash-2"
                      ></feather>
                      删除
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
  </div>
</template>

<script>
import { setCreditColor } from '@/utils/util'
import UserStatistics from './components/UserStatistics.vue'

import { getUserList } from '@/request/api/user'

export default {
  name: 'UserList',
  components: { UserStatistics },

  data: () => ({
    setCreditColor,
    userList: [],
  }),

  activated() {
    this.getUserList()
  },

  methods: {
    async getUserList() {
      const { code, data } = await getUserList()
      if (code === 2000) {
        this.userList = data.user_list
      }
    },

    // 联系卖家
    async contactUser(_id, nickname) {
      if (!this.$bind()) {
        this.$vs.notify({
          time: 4000,
          title: '请绑定用户',
          text: '您的管理员账号尚未绑定用户，请前往个人中心进行绑定',
          color: 'warning',
        })
        return
      }

      if (!this.$store.getters['chat/isInChat'](_id)) {
        const code = await this.$store.dispatch('chat/addContact', _id)
        if (code !== 2000) return
      }
      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname })
      this.$store.commit('chat/SET_CHAT_OPEN')
    },
  },
}
</script>
