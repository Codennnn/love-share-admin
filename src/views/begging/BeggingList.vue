<template>
  <div class="mt-4">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      class="p-4"
      :max-items="8"
      :data="beggingList"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
      </div>

      <template slot="thead">
        <vs-th sort-key="name">求购标题</vs-th>
        <vs-th sort-key="category">分类</vs-th>
        <vs-th>求购价</vs-th>
        <vs-th sort-key="created_at">发布时间</vs-th>
        <vs-th sort-key="updated_at">最后更新</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
        >
          <vs-td>{{ tr.name }}</vs-td>
          <vs-td>
            <vs-chip
              class="mr-1"
              v-for="(item, i) in tr.category"
              :key="i"
            >
              {{ item.name }}
            </vs-chip>
          </vs-td>
          <vs-td>
            <p class="text-gray font-bold">
              ￥{{ $numFixed(tr.min_price) }} - ￥{{ $numFixed(tr.max_price) }}
            </p>
          </vs-td>
          <vs-td class="text-gray">
            {{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}
          </vs-td>
          <vs-td class="text-gray">
            {{ $dayjs(tr.updated_at).format('YYYY/MM/DD') }}
          </vs-td>
          <vs-td>
            <div>
              <el-dropdown>
                <i class="el-icon-more text-semi"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    class="danger"
                    @click="deleteBegging(tr.buying_id)"
                  >
                    <i class="el-icon-delete mr-2"></i>
                    <span>删除</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getBeggingList, deleteBegging } from '@/request/api/begging'

export default {
  data: () => ({
    beggingList: [],
  }),

  created() {
    this.getBeggingList()
  },

  methods: {
    async getBeggingList() {
      const { code, data } = await getBeggingList({
        page: 1,
        page_size: 50,
      })
      if (code === 2000) {
        this.beggingList = data.begging_list
      }
    },

    async deleteBegging() {
      await deleteBegging()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
