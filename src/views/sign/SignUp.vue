<template>
  <div>
    <vs-sidebar
      class="sidebarx overflow-hidden"
      spacer
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
        class="h-24 pt-4 pb-6"
        :settings="{
          maxScrollbarLength: 180,
          wheelSpeed: 0.60,
        }"
      >
      </VuePerfectScrollbar>
    </vs-sidebar>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'SignUp',
  components: { VuePerfectScrollbar },

  props: {
    isSidebarActive: {
      type: Boolean,
      required: true,
    },
  },

  computed: {
    active: {
      get() {
        return this.isSidebarActive
      },
      set() {},
    },
  },
}
</script>
