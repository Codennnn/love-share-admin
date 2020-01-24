<template>
  <div>
  </div>
</template>

<script>
export default {
  data: () => ({
  }),

  computed: {
  },

  created() {
    this.$store.commit('SET_NAV_TYPE', 'hidden')
    this.$store.commit('SWITCH_SIDEBAR_COLLAPSE', false)
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
</style>
