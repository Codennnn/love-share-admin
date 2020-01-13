<template>
  <div class="data-list mt-4">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      :max-items="10"
      :data="beggingList"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
      </div>

      <template slot="thead">
        <vs-th sort-key="name">商品标题</vs-th>
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
              ￥{{ Number(tr.min_price).toFixed(2) }} - ￥{{ Number(tr.max_price).toFixed(2) }}
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
                    @click="deleteData(tr.buying_id)"
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
      @addListData="addData"
      @updateListData="updateData"
      @closeSidebar="addNewDataSidebar = false"
    />
  </div>
</template>

<script>
import AddNewDataSidebar from './components/AddNewDataSidebar.vue'

import {
  getBeggingList,
  addBuying,
  deleteBuying,
  updateBuying,
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

    notify({
      title, text, color = 'success', time = 3000,
    }) {
      this.$vs.notify({
        title, text, color, time,
      })
    },

    async addData(info) {
      const { code, data } = await addBuying()
      if (code === 2000) {
        info.buying_id = data.buying_id
        this.buyingList.unshift(info)
        this.notify({ title: '添加成功', text: '成功添加一条求购商品信息' })
      }
    },

    async deleteData(id) {
      this.buyingList.forEach((el, i, _this) => {
        if (el.buying_id === id) {
          _this.splice(i, 1)
        }
      })
      const { code } = await deleteBuying()
      if (code === 2000) {
        this.notify({
          title: '删除成功',
          text: '成功删除一条求购商品信息',
          color: 'danger',
          time: 5000,
        })
      }
    },

    async updateData(data) {
      this.buyingList.forEach((el, i, _this) => {
        if (el.buying_id === data.buying_id) {
          _this.splice(i, 1, data)
        }
      })
      const { code } = await updateBuying()
      if (code === 2000) {
        this.notify({ title: '更新成功', text: '成功更新一条求购商品信息' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.data-list {
  .vs-con-table {
    background: transparent;
    &::v-deep {
      .vs-table--header {
        height: 45px;
        display: flex;
        flex-wrap: wrap-reverse;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search {
          .vs-table--search-input {
            padding: 0.5rem 2.5rem;
            border: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 1rem;
            & + i {
              left: 1rem;
            }
            &:focus + i {
              left: 1rem;
            }
          }
          .vs-icon {
            font-size: 1.4rem;
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;
        & .is-selected {
          border: none;
          border-radius: 5px;
          box-shadow: 0 0 10px 0 rgba(var(--vs-primary), 0.2) !important;
          overflow: hidden;
        }
        tr {
          box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
          td {
            padding: 20px;
            &:first-child {
              border-top-left-radius: 0.5rem;
              border-bottom-left-radius: 0.5rem;
            }
            &:last-child {
              border-top-right-radius: 0.5rem;
              border-bottom-right-radius: 0.5rem;
            }
          }
          td.td-check {
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead {
        th {
          padding-top: 0;
          padding-bottom: 0;
          .vs-table-text {
            text-transform: uppercase;
            font-weight: 600;
            color: #6e6e6e;
          }
        }
        th.td-check {
          padding: 0 15px !important;
          .con-td-check {
            background: transparent;
            box-shadow: none;
          }
        }
        tr {
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
}
</style>
