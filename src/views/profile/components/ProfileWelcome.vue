<template>
  <div
    class="relative p-5 radius base-shadow overflow-hidden"
    style="height: 150px;"
  >
    <div class="relative z-50 flex flex-col">
      <div class="mb-1 text-primary text-2xl font-bold">欢迎回来</div>
      <div class="text-xl text-gray">您今天有 {{ todayTask.length }} 个任务</div>
      <div>
        <feather
          class="mt-5 text-gray cursor-pointer"
          size="20"
          type="list"
          @click="$router.push('/todo-list')"
        ></feather>
      </div>
    </div>
    <div
      class="img absolute top-0 transition"
      style="right: -1px;"
    >
      <el-image
        class="w-64"
        fit="contain"
        src="https://gitee.com/chinesee/images/raw/master/img/img_020.png"
      ></el-image>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileWelcome',
  computed: {
    todayTask() {
      return this.$store.getters['todo/todayTask']
    },
  },
}
</script>

<style lang="scss" scoped>
.img {
  @media (max-width: 1100px) {
    opacity: 0;
  }
}
</style>
