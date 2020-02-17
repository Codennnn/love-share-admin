<template>
  <div class="pt-8">
    <el-transfer
      v-model="onActive"
      :data="categoryList"
      :titles="['可用分类', '已上架分类']"
      :props="{key: '_id', label: 'name'}"
      @left-check-change="leftCheckChange"
      @change="activeChange"
    >
      <div
        slot="left-footer"
        class="h-full flex-row-center"
      >
        <vs-button
          slot="reference"
          class="mr-2"
          color="danger"
          size="small"
          :disabled="disabled"
          @click="deleteCategory()"
        >删除选中分类</vs-button>
        <el-popover
          width="250"
          trigger="manual"
          v-model="showPopover"
        >
          <div>
            <vs-input
              class="w-full mb-2"
              label-placeholder="分类名称"
              v-model="categoryName"
              @keyup.enter="addCategory()"
            />
            <vs-alert
              color="danger"
              :active="showAlert"
            >已存在分类，请勿重复添加</vs-alert>
            <div class="flex justify-end">
              <vs-button
                class="danger text-lg"
                type="flat"
                color="danger"
                icon="close"
                @click="showPopover = false"
              ></vs-button>
              <vs-button
                class="text-lg"
                type="flat"
                icon="done"
                @click="addCategory()"
              ></vs-button>
            </div>
          </div>
          <vs-button
            size="small"
            slot="reference"
            @click="showPopover = !showPopover"
          >添加分类</vs-button>
        </el-popover>
      </div>
    </el-transfer>
  </div>
</template>

<script>
import { addCategory, deleteCategory, updateCategoryActivation } from '@/request/api/category'

export default {
  name: 'GoodsCategory',
  data: () => ({
    showPopover: false,
    categoryName: '',
    onActive: [], // 已上架的分类
    leftCheck: [],
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
    showAlert() {
      return this.categoryList.some(el => el.name === this.categoryName)
    },
    disabled() {
      return this.leftCheck.length <= 0
    },
  },

  watch: {
    categoryList: {
      handler(v) {
        this.onActive = v.filter(el => el.activation).map(el => el._id)
      },
      immediate: true,
    },
  },

  methods: {
    // 添加分类
    async addCategory() {
      if (this.categoryName.length > 0) {
        const { code } = await addCategory({ category_name: this.categoryName })
        if (code === 2000) {
          this.categoryName = ''
          this.showPopover = false
          this.$store.dispatch('getCategoryList')
        }
      }
    },

    // 删除分类
    async deleteCategory() {
      try {
        await deleteCategory({ category_id_list: this.leftCheck })
        this.$store.dispatch('getCategoryList')
      } finally {
        this.leftCheck = []
      }
    },

    leftCheckChange(checked) {
      this.leftCheck = checked
      console.log(checked)
    },

    // 已上架的分类发生改变时
    async activeChange(origin, direction, value) {
      try {
        if (direction === 'right') {
          await updateCategoryActivation({ category_id_list: value, activation: true })
        } else if (direction === 'left') {
          await updateCategoryActivation({ category_id_list: value, activation: false })
        }
      } finally {
        this.$store.dispatch('getCategoryList')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
