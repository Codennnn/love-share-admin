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
      localStorage.setItem('screen_lock', JSON.stringify({ isLocked: false }))
      this.$router.replace('/')
    },
  },
}
</script>
