<template>
  <div class="pt-8">
    <vs-table
      search
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
            <div class="text-center">
              <vs-dropdown>
                <i class="el-icon-more-outline"></i>
                <vs-dropdown-menu class="w-24">
                  <vs-dropdown-item class="text-center">
                    <i class="el-icon-chat-round mr-2"></i>
                    <span>联系</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item class="text-center">
                    <i class="el-icon-news mr-2"></i>
                    <span>查看</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item
                    class="text-center danger"
                    divider
                  >
                    <i class="el-icon-delete mr-2"></i>
                    <span>删除</span>
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
const getBlackList = () => ({
  code: 2000,
  data: {
    balck_list: [...Array(50).keys()].map(el => ({
      avatar_url: 'https://cdn.hrspider.top/avatar-1578673645394.jpeg',
      nickname: `令狐少侠${el}`,
    })),
  },
})
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
      const { code, data: { balck_list } } = await getBlackList()
      if (code === 2000) {
        this.balckList = balck_list
      }
    },
  },
}
</script>
