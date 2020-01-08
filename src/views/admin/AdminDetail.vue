<template>
  <div>
    <div class="info mb-6 p-5 light-shadow bg-white rounded-lg">
      <p class="mb-4 text-lg text-gray-600">账号</p>
      <div class="mb-4 flex">
        <img
          width="100px"
          class="mr-8 light-shadow rounded-lg"
          src="https://avatars2.githubusercontent.com/u/31676496?s=460&v=4"
          alt="avatar"
        >
        <div class="w-full flex">
          <div class="flex-1">
            <table>
              <tr>
                <td>管理员账号</td>
                <td>{{ 'super_admin' }}</td>
              </tr>
              <tr>
                <td>昵 称</td>
                <td>{{ '令狐少侠' }}</td>
              </tr>
              <tr>
                <td>真实姓名</td>
                <td>{{ '令狐少侠' }}</td>
              </tr>
            </table>
          </div>
          <div class="flex-1">
            <table>
              <tr>
                <td>电子邮箱</td>
                <td>{{ 'super_admin' }}</td>
              </tr>
              <tr>
                <td>状 态</td>
                <td>{{ '令狐少侠' }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div></div>
      </div>
      <div class="flex justify-end">
        <vs-button
          class="w-24"
          icon="el-icon-edit"
          icon-pack="el-icon"
          @click="$router.push('/admin-edit')"
        >编 辑</vs-button>
      </div>
    </div>

    <div class="permission p-5 light-shadow bg-white rounded-lg">
      <p class="text-lg text-gray-600">权限</p>
      <vs-divider />
      <table>
        <tr>
          <th>Module</th>
          <th>Read</th>
          <th>Write</th>
          <th>Create</th>
          <th>Delete</th>
        </tr>
        <tr>
          <td>用户</td>
          <td>
            <vs-checkbox
              class="pointer-events-none"
              :disabled="true"
            ></vs-checkbox>
          </td>
        </tr>
        <tr>
          <td>订单</td>
          <td>
            <vs-checkbox :disabled="true"></vs-checkbox>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { getAdminDetail } from '@/request/api/admin'

export default {
  name: 'AdminDetail',
  data: () => ({
    info: {},
  }),

  mounted() {
    this.getAdminDetail(this.$route.query.adminId)
  },

  methods: {
    async getAdminDetail(admin_id) {
      const { code, data } = await getAdminDetail({ admin_id })
      if (code === 2000) {
        console.log(data)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.info table {
  td {
    min-width: 140px;
    padding-bottom: 0.8rem;
    font-size: 0.9rem;
  }
  td:nth-child(1) {
    font-weight: 600;
    color: #626262;
  }
  td:nth-child(2) {
    color: rgb(150, 150, 150);
  }
}

.permission table {
  width: 100%;
  th {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
  }
  tr:first-child {
    color: #626262;
  }
  td {
    padding: 0.6rem 0.5rem 0.6rem 0.5rem;
    font-size: 0.9rem;
  }
  td:nth-child(1) {
    color: #626262;
  }
  td:nth-child(2) {
    color: rgb(150, 150, 150);
  }
  .con-vs-checkbox {
    justify-content: flex-start;
  }
}
</style>
