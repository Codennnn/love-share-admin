<template>
  <div class="py-6">
    <div class="flex">
      <div class="w-1/2 pr-3">
        <ProfileWelcome class="mb-5" />
        <ProfileTodo />
      </div>

      <div class="w-1/2 pl-3">
        <ProfileBind class="mb-5" />
        <ProfileLog />
      </div>
    </div>

    <div>
      <h2 class="mt-4 mb-2 text-primary text-lg font-bold">管理权限</h2>
      <EditPermission :permissions="permissions" />
    </div>
  </div>
</template>

<script>
import ProfileWelcome from './components/ProfileWelcome.vue'
import ProfileTodo from './components/ProfileTodo.vue'
import ProfileLog from './components/ProfileLog.vue'
import ProfileBind from './components/ProfileBind.vue'
import EditPermission from '@/views/admin/edit/EditPermission.vue'

export default {
  name: 'Profile',
  components: {
    ProfileWelcome,
    ProfileTodo,
    ProfileLog,
    ProfileBind,
    EditPermission,
  },

  data: () => ({
  }),

  computed: {
    permissions() {
      return this.$store.state.admin.info.permissions
    },
  },

  created() {
    this.$store.commit('SET_NAV_TYPE', 'hidden')
    this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', true)
  },

  destroyed() {
    this.$store.commit('SET_NAV_TYPE', 'fixed')
    this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false)
  },
}
</script>
