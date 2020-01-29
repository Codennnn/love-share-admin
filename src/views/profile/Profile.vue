<template>
  <div class="py-6">
    <ProfileTodo class="w-1/2 mb-5" />

    <ProfileLog class="w-1/2 mb-5" />

    <div>
      <h2 class="mb-2 text-primary text-lg font-bold">管理权限</h2>
      <EditPermission :permissions="permissions" />
    </div>
  </div>
</template>

<script>
import ProfileTodo from './components/ProfileTodo.vue'
import ProfileLog from './components/ProfileLog.vue'
import EditPermission from '@/views/admin/edit/EditPermission.vue'

export default {
  name: 'Profile',
  components: {
    ProfileTodo,
    ProfileLog,
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
