<template>
  <div>
    <vs-sidebar
      class="sidebarx overflow-hidden"
      hidden-background
      position-right
      v-model="active"
    >
      <div class="mt-6 px-6 flex items-center justify-between text-gray-600">
        <span class="text-lg font-bold">编辑资料</span>
        <feather
          class="cursor-pointer"
          type="x"
          @click="$emit('closeSidebar')"
        ></feather>
      </div>
      <vs-divider class="mb-0"></vs-divider>

      <VuePerfectScrollbar
        class="pt-4 pb-6"
        :settings="{
          maxScrollbarLength: 180,
          wheelSpeed: 0.60,
        }"
      >
        <div class="p-6">
          <vs-input
            class="w-full pb-3"
            val-icon-warning="warning"
            v-for="(it, i) in inputs"
            :key="i"
            :type="it.type"
            :label-placeholder="it.placeholder"
            :warning="it.isWarnng"
            :warning-text="it.warningText"
            v-model.trim="it.value"
            @focus="() => { inputs[i].isWarnng = false }"
            @keyup.enter="onSignUp()"
          />
          <vs-button
            class="w-full mt-3"
            :disabled="!btnDisabled"
            @click="onSignUp()"
          >成为管理员</vs-button>
        </div>
      </VuePerfectScrollbar>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { createAdminByInvitation } from '@/request/api/admin'

const inputs = [
  {
    placeholder: '邀请码',
    value: '',
    type: 'text',
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '登入密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
  {
    placeholder: '再次确认密码',
    value: '',
    type: 'password',
    isWarnng: false,
    warningText: '',
  },
]
export default {
  name: 'SignUp',
  components: { VuePerfectScrollbar },

  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    inputs,
  }),

  computed: {
    active: {
      get() {
        return this.isSidebarActive
      },
      set() {},
    },

    btnDisabled() {
      return this.inputs[0].value.length > 0
      && this.inputs[1].value.length > 0
      && this.inputs[2].value.length > 0
      && this.inputs[0].value === 'czc12580520'
      && this.inputs[1].value === this.inputs[2].value
    },
  },

  methods: {
    getPermissions() {
      const modules = {
        user: '用户',
        goods: '商品',
        order: '订单',
        comment: '留言',
        guide: '指引',
        admin: '管理员',
      }
      const purviewTemplate = [{ read: true }, { write: true }, { create: true }, { delete: true }]
      const permissions = Object.keys(modules).map(key => ({
        module: key,
        purview: this.$cloneDeepWith(purviewTemplate),
      }))
      const actions = ['read', 'write', 'create', 'delete']
      return permissions.map(({ module, purview }) => ({
        module,
        purview: purview.filter((it, i) => it[actions[i]]).map(it => Object.keys(it)[0]),
      }))
    },

    async onSignUp() {
      if (!this.btnDisabled) return

      const payload = {
        account: 'czc12580520',
        password: '123456',
        nickname: '令狐少侠',
        real_name: '陈梓聪',
        avatar_url: 'https://cdn.hrspider.top/default_avatar_male.jpg',
        email: 'czc12580520@gmail.com',
        gender: 0,
        permissions: this.getPermissions(),
      }
      const { code } = await createAdminByInvitation(payload)
      if (code === 2000) {
        this.$vs.notify({
          time: 3500,
          title: '管理员创建成功',
          text: '现在可以登录系统了',
          color: 'success',
        })
        this.$emit('closeSidebar')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.sidebarx::v-deep {
  .vs-sidebar {
    width: 400px;
    max-width: 100vw;
  }
}
</style>
