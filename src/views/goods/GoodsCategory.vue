<template>
  <div class="pt-3">
    <el-transfer
      v-model="category"
      :data="categoryList"
      :titles="titles"
      :props="{key: 'value', lebel: 'value'}"
      @left-check-change="leftCheck"
      @change="change"
    >
      <div
        slot="left-footer"
        class="h-full flex justify-center items-center"
      >
        <vs-button
          class="mr-2"
          color="danger"
          size="small"
          slot="reference"
          :disabled="disabled"
          @click="deleteCategory()"
        >删除选中分类</vs-button>
        <el-popover
          width="200"
          trigger="manual"
          v-model="showPopover"
        >
          <div>
            <vs-input
              class="w-full"
              label-placeholder="分类名称"
              v-model="categoryName"
              @keyup.enter="addCategory()"
            />
            <div class="mt-2 flex justify-end">
              <vs-button
                type="flat"
                color="#646464"
                @click="showPopover = false"
              >取消</vs-button>
              <vs-button
                type="flat"
                @click="addCategory()"
              >确定</vs-button>
            </div>
          </div>
          <vs-button
            size="small"
            slot="reference"
            @click="showPopover = true"
          >添加分类</vs-button>
        </el-popover>
      </div>
    </el-transfer>
  </div>
</template>

<script>
import { addCategory, deleteCategory } from '@/request/api/category'

export default {
  name: 'GoodsCategory',
  data: () => ({
    showPopover: false,
    categoryName: '',
    titles: ['可选分类', '已选分类'],
    disabled: true,
    selected: [],
    category: [],
  }),

  computed: {
    categoryList() {
      return this.$store.state.categoryList
    },
  },

  methods: {
    addCategory() {
      if (this.categoryName.length > 0) {
        this.categoryList.push({ value: this.categoryName })
        this.showPopover = false
        this.categoryName = ''
        addCategory()
      }
    },

    deleteCategory() {
      this.selected.forEach((it) => {
        this.categoryList.forEach((el, i, _) => {
          if (el.value === it) {
            _.splice(i, 1)
          }
        })
      })
      this.disabled = true
      deleteCategory()
    },

    leftCheck(checked) {
      this.selected = checked
      if (this.selected.length > 0) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },

    change() {
      // console.log(this.category)
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
