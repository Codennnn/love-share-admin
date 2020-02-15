<template>
  <div class="mt-4">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      class="p-4"
      :max-items="10"
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
          :data="tr"
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
            <div class="text-center">
              <vs-dropdown>
                <i class="el-icon-more-outline"></i>
                <vs-dropdown-menu class="w-24">
                  <vs-dropdown-item
                    class="text-center"
                    @click="addNewDataSidebar = true, sidebarTitle = '编辑更新信息', sidebarData = tr"
                  >
                    <i class="el-icon-edit mr-2"></i>
                    <span>编辑</span>
                  </vs-dropdown-item>
                  <vs-dropdown-item
                    divider
                    class="text-center danger"
                    @click="deleteBegging(tr.buying_id)"
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

    <!-- 侧边抽屉 -->
    <AddNewDataSidebar
      :title="sidebarTitle"
      :isSidebarActive="addNewDataSidebar"
      :data="sidebarData"
      @closeSidebar="addNewDataSidebar = false"
    />
  </div>
</template>

<script>
import AddNewDataSidebar from './components/AddNewDataSidebar.vue'

import {
  getBeggingList,
  updateBegging,
  deleteBegging,
} from '@/request/api/begging'

export default {
  data: () => ({
    selected: [],
    beggingList: [],
    sidebarTitle: '',
    sidebarData: {},
    addNewDataSidebar: false,
  }),

  components: { AddNewDataSidebar },

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

    async updateBegging() {
      await updateBegging()
    },

    async deleteBegging() {
      await deleteBegging()
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
