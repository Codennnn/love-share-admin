<template>
  <div class="pt-8">
    <vs-table
      pagination
      noDataText="暂无数据"
      :max-items="8"
      :data="balckList"
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
            />
          </vs-td>
          <vs-td class="font-bold">{{ tr.nickname }}</vs-td>
          <vs-td>
          </vs-td>
          <vs-td>
            <p class="ml-4 font-bold">{{ tr.share_value }}</p>
          </vs-td>
          <vs-td>
            <p>{{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}</p>
          </vs-td>
          <vs-td>
            <span
              class="danger cursor-pointer"
              @click="removeBlock(tr._id)"
            >解除黑名单</span>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getBlockUserList, updateUserAccountInfo } from '@/request/api/user'

export default {
  name: 'UserBlackList',
  data: () => ({
    balckList: [],
  }),

  created() {
    this.getBlackList()
  },

  methods: {
    async getBlackList() {
      const { code, data: { user_list } } = await getBlockUserList()
      if (code === 2000) {
        this.balckList = user_list
      }
    },

    async removeBlock(user_id) {
      const { code } = await updateUserAccountInfo({
        user_id,
        is_blocked: false,
        info: '',
      })
      if (code === 2000) {
        this.$message.success('用户已解除黑名单')
        this.getBlackList()
      }
    },
  },
}
</script>
