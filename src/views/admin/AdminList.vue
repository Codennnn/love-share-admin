<template>
  <div class="data-list mt-4">
    <vs-table
      search
      pagination
      noDataText="暂无数据"
      :max-items="5"
      :data="adminList"
      v-model="selected"
    >
      <div
        slot="header"
        class="flex flex-wrap-reverse items-center flex-grow justify-between"
      >
        <vs-button
          style="padding: 7px 10px;"
          color="primary"
          type="border"
          size="small"
          @click="$router.push('/admin-create')"
        >
          <i class="el-icon-plus mr-1 font-semibold"></i>
          <span>添加管理员</span>
        </vs-button>
      </div>

      <template slot="thead">
        <vs-th>头像</vs-th>
        <vs-th>昵称</vs-th>
        <vs-th>真实姓名</vs-th>
        <vs-th>性别</vs-th>
        <vs-th>登录账号</vs-th>
        <vs-th sort-key="created_at">注册时间</vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
          :data="tr"
        >
          <vs-td>
            <vs-avatar
              size="80px"
              class="ml-4 base-shadow"
              :src="tr.avatar_url"
            />
          </vs-td>
          <vs-td class="text-base text-gray-600 font-bold">{{ tr.nickname }}</vs-td>
          <vs-td>{{ tr.real_name }}</vs-td>
          <vs-td>
            <i
              v-if="tr.gender"
              class="el-icon-female text-danger text-xl"
            ></i>
            <i
              v-else
              class="el-icon-male text-primary text-xl"
            ></i>
          </vs-td>
          <vs-td class="text-gray-600 cursor-text">{{ tr.account }}</vs-td>
          <vs-td>
            <p class="text-gray-600">{{ $dayjs(tr.created_at).format('YYYY/MM/DD') }}</p>
          </vs-td>
          <vs-td>
            <vs-dropdown vs-trigger-click>
              <i class="el-icon-more-outline"></i>
              <vs-dropdown-menu class="w-24">
                <vs-dropdown-item class="text-center">
                  <i class="el-icon-chat-round mr-2"></i>
                  <span>联系</span>
                </vs-dropdown-item>
                <vs-dropdown-item
                  class="text-center"
                  @click="$router.push({
                              path: '/admin-detail',
                              query: { adminId: tr._id }
                            })"
                >
                  <i class="el-icon-news mr-2"></i>
                  <span>查看</span>
                </vs-dropdown-item>
                <vs-dropdown-item
                  class="text-center"
                  @click="$router.push({
                              path: '/admin-edit',
                              query: { adminId: tr._id }
                            })"
                >
                  <i class="el-icon-edit mr-2"></i>
                  <span>编辑</span>
                </vs-dropdown-item>
                <vs-dropdown-item
                  class="text-center text-danger"
                  divider
                >
                  <i class="el-icon-delete mr-2"></i>
                  <span>删除</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { getAdminList } from '@/request/api/admin'

export default {
  name: 'AdminList',
  data: () => ({
    selected: [],
    adminList: [],
  }),

  created() {
    this.getAdminList()
  },

  methods: {
    async getAdminList() {
      const { code, data } = await getAdminList()
      if (code === 2000) {
        this.adminList = data.admin_list
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.data-list::v-deep {
  .vs-con-table {
    background: transparent;
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
        box-shadow: 0 0 10px 0 rgba(var(--vs-primary), 0.2) !important;
        overflow: hidden;
      }
      tr {
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
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
</style>