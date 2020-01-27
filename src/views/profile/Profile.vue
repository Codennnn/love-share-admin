<template>
  <div class="py-6">
    <ProfileTodo class="w-1/2" />

    <ProfileLog class="w-1/2" />

  </div>
</template>

<script>
import ProfileTodo from './components/ProfileTodo.vue'
import ProfileLog from './components/ProfileLog.vue'

export default {
  name: 'Profile',
  components: {
    ProfileTodo,
    ProfileLog,
  },

  data: () => ({
  }),

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
