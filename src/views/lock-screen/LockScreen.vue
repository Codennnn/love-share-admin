<template>
  <div>
    {{ $store.state.isLocked }}
    <vs-button @click="unLocked()">解锁</vs-button>
  </div>
</template>

<script>
export default {
  name: 'LockScreen',

  methods: {
    unLocked() {
      this.$store.commit('SET_LOCKED', false)
      this.$router.go(-1)
    },
  },
}
</script>
