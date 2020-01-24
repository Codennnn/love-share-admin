<template>
  <div>
    <div class="info mb-6 p-5 light-shadow bg-semi rounded-lg">
      <p class="mb-4 text-lg text-semi">账 号</p>
      <div class="mb-4 flex">
        <img
          width="100px"
          class="mr-8 base-shadow rounded-lg"
          alt="avatar"
          :src="detail.avatar_url"
        >
        <div class="w-full flex">
          <div class="flex-1">
            <table>
              <tr>
                <td class="text-semi">管理员账号</td>
                <td class="text-gray">{{ detail.account }}</td>
              </tr>
              <tr>
                <td class="text-semi">昵 称</td>
                <td class="text-gray">{{ detail.nickname }}</td>
              </tr>
              <tr>
                <td class="text-semi">真实姓名</td>
                <td class="text-gray">{{ detail.real_name || '未填写' }}</td>
              </tr>
            </table>
          </div>
          <div class="flex-1">
            <table>
              <tr>
                <td class="text-semi">电子邮箱</td>
                <td class="text-gray">{{ detail.email || '未填写' }}</td>
              </tr>
              <tr>
                <td class="text-semi">性 别</td>
                <td class="text-gray">{{ detail.gender ? '女' : '男' }}</td>
              </tr>
              <tr>
                <td class="text-semi">状 态</td>
                <td class="text-gray">{{ '令狐少侠' }}</td>
              </tr>
            </table>
          </div>
        </div>
        <div></div>
      </div>
      <div class="flex justify-end">
        <vs-button
          icon="el-icon-edit"
          icon-pack="el-icon"
          @click="editAdmin()"
        >编 辑</vs-button>
      </div>
    </div>

    <div class="permission p-5 light-shadow bg-semi rounded-lg">
      <p class="text-lg text-semi">权 限</p>
      <vs-divider />
      <EditPermission :permissions="detail.permissions" />
    </div>
  </div>
</template>

<script>
import EditPermission from './edit/EditPermission.vue'

import { getAdminDetail } from '@/request/api/admin'

export default {
  name: 'AdminDetail',
  components: { EditPermission },

  data: () => ({
    detail: {},
  }),

  mounted() {
    this.getAdminDetail(this.$route.query.adminId || this.$store.getters['admin/adminId'])
  },

  methods: {
    async getAdminDetail(admin_id) {
      const { code, data } = await getAdminDetail({ admin_id })
      if (code === 2000) {
        this.detail = data.admin_detail
      }
    },

    editAdmin() {
      this.$router.push({
        path: '/admin-edit',
        query: { adminId: this.detail._id },
      })
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
  }
}
</style>
