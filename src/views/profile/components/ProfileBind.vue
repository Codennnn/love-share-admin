<template>
  <div class="bg-gray px-5 pt-5 flex justify-between radius overflow-hidden">
    <div class="mr-4 pb-4 flex-col-center">
      <div class="text-primary text-lg">您好，绑定用户</div>
      <div class="w-24 mt-3 py-2 text-center text-white text-sm
     bg-primary-gradient rounded-lg cursor-pointer">
        绑定用户
      </div>
    </div>
    <img
      class="w-48"
      src="@/assets/images/bind_user.svg"
      alt=""
    >
  </div>
</template>
// style="background: rgba(var(--vs-primary), 0.9)"
<script>

export default {
  name: 'ProfileLog',

  data: () => ({
    log: {},
  }),

  methods: {
  },
}
</script>
