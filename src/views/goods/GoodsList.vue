<template>
  <div>
    <div class="flex mt-3 mb-6">
      <div
        class="box w-1/4 lg:px-6 px-3 radius bg-gray"
        @click="getGoodsListOnSell()"
      >
        <div>
          <div class="text-3xl text-primary">
            {{ onSellCount.toLocaleString() }}
          </div>
          <div class="text-semi">已上架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-primary), 0.2)"
        >
          <i class="el-icon-sell p-2 text-3xl primary"></i>
        </div>
      </div>

      <div
        class="box w-1/4 mx-5 lg:px-6 px-3 radius bg-gray"
        @click="getGoodsListOffSell()"
      >
        <div>
          <div class="text-3xl text-primary">
            {{ offSellCount.toLocaleString() }}
          </div>
          <div class="text-semi">已下架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-danger), 0.2)"
        >
          <i class="el-icon-sold-out p-2 text-3xl danger"></i>
        </div>
      </div>

      <div class="w-2/4 py-6 px-6 radius bg-gray">
        <div class="mb-3 text-semi">高级操作</div>
        <div class="flex items-center justify-between text-sm">
          <div class="w-1/2">
            <vs-input
              class="search-input w-full"
              icon="search"
              placeholder="输入商品的 ID 搜索"
              v-model="searchId"
              @keyup.enter="onSearchByID"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 过滤搜索 -->
    <div class="mb-6 py-4 px-6 radius base-shadow bg-semi">
      <div class="flex items-center justify-between text-semi">
        <div>过滤搜索</div>
        <div>
          <i
            class="el-icon-arrow-down mr-2 cursor-pointer"
            style="transition: transform 0.3s;"
            :style="filtersStyle"
            :title="hideFilters ? '展开' : '收起'"
            @click="hideFilters = !hideFilters"
          ></i>
          <i
            title="重置"
            class="el-icon-refresh-right cursor-pointer"
            @click="onReset()"
          ></i>
        </div>
      </div>

      <div
        class="transition"
        :style="inputStyle"
      >
        <div class="pt-8 pb-2 flex items-center flex-wrap overflow-hidden">
          <div class="mr-4">
            <el-select
              filterable
              placeholder="根据商品分类搜索"
              v-model="selectedCategory"
            >
              <el-option
                v-for="(it, i) in categoryList"
                :key="i"
                :label="it.name"
                :value="it._id"
              >
              </el-option>
            </el-select>
          </div>
          <div class="mr-4">
            <el-select
              v-model="selectedSchool"
              filterable
              placeholder="根据学校搜索"
            >
              <el-option
                v-for="(it, i) in schoolList"
                :key="i"
                :label="it.name"
                :value="it._id"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <vs-button
              class="w-32 text-sm"
              type="relief"
              @click="getGoodsListBySelect()"
            >确认搜索</vs-button>
          </div>
        </div>

        <div class="pb-2 flex items-end">
          <div class="w-1/2 pt-3 flex items-center">
            <vs-input
              class="mr-4 flex-1"
              placeholder="输入商品的名称搜索"
              v-model.trim="searchText"
              @keyup.enter="getGoodsListBySearchAdmin()"
            />
            <vs-button
              class="w-32 text-sm"
              type="relief"
              @click="getGoodsListBySearchAdmin()"
            >搜 索</vs-button>
          </div>
          <div class="ml-auto text-gray">
            已搜索到 {{ goodsListLength }} 件商品
          </div>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <ListTable
      :goodsList="goodsList"
      :tableTitle="tableTitle"
      :loading="tableLoading"
      @getGoodsListOnSell="getGoodsListOnSell"
      @dateChange="getGoodsListByDateRange"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListTable from './components/list/ListTable.vue'

import {
  getGoodsListOnSell,
  getGoodsListOffSell,
  getGoodsListInfo,
  getGoodsListByDateRange,
  getGoodsListBySelect,
  getGoodsListBySearchAdmin,
} from '@/request/api/goods'

export default {
  name: 'GoodsList',
  components: { ListTable },

  data: () => ({
    goodsList: [],
    selectedCategory: '',
    selectedSchool: '',
    tableTitle: null, // 表格标题
    onSellCount: '--', // 已上架商品数量
    offSellCount: '--', // 违规下架商品数量
    searchId: '', // 输入的商品 ID
    searchText: '',
    tableLoading: false,
    hideFilters: false, // 隐藏过滤搜索
  }),

  computed: {
    ...mapState(['categoryList', 'schoolList']),
    filtersStyle() {
      if (this.hideFilters) {
        return {
          transform: 'rotate(-180deg)',
        }
      }
      return {
        transform: 'rotate(0)',
      }
    },
    inputStyle() {
      if (this.hideFilters) {
        return {
          opacity: '0',
          'max-height': '0',
          padding: '0',
        }
      }
      return {
        opacity: '1',
        'max-height': '200px',
      }
    },
    goodsListLength() {
      return this.goodsList.length
    },
  },

  activated() {
    this.getGoodsListOnSell()
    this.getGoodsListInfo()
  },

  methods: {
    // 获取上架商品
    async getGoodsListOnSell() {
      if (!this.tableLoading) {
        this.tableLoading = true
        try {
          const { code, data } = await getGoodsListOnSell({
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.tableTitle = '已上架商品'
            this.goodsList = data.goods_list
          }
        } finally {
          this.tableLoading = false
        }
      }
    },

    // 获取下架商品
    async getGoodsListOffSell() {
      if (!this.tableLoading) {
        this.tableLoading = true
        try {
          const { code, data } = await getGoodsListOffSell({
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.tableTitle = '已下架商品'
            this.goodsList = data.goods_list
          }
        } finally {
          this.tableLoading = false
        }
      }
    },

    // 根据日期范围搜索商品
    async getGoodsListByDateRange(date_range) {
      if (!this.tableLoading) {
        this.tableLoading = true
        try {
          const { code, data } = await getGoodsListByDateRange({
            date_range,
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.tableTitle = '已上架商品'
            this.goodsList = data.goods_list
          }
        } finally {
          this.tableLoading = false
        }
      }
    },

    // 根据下拉选择搜索商品
    async getGoodsListBySelect() {
      if (!this.tableLoading && (this.selectedCategory || this.selectedSchool)) {
        this.tableLoading = true
        try {
          const { code, data } = await getGoodsListBySelect({
            category: this.selectedCategory,
            school_id: this.selectedSchool,
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.tableTitle = '已上架商品'
            this.goodsList = data.goods_list
          }
        } finally {
          this.tableLoading = false
        }
      }
    },

    // 根据名称搜索商品
    async getGoodsListBySearchAdmin() {
      if (!this.tableLoading && this.searchText.length > 0) {
        this.tableLoading = true
        try {
          const { code, data } = await getGoodsListBySearchAdmin({
            search: this.searchText,
            page: 1,
            page_size: 100,
          })
          if (code === 2000) {
            this.tableTitle = '已上架商品'
            this.goodsList = data.goods_list
          }
        } finally {
          this.tableLoading = false
        }
      }
    },

    // 获取商品的统计数据(上架和下架)
    async getGoodsListInfo() {
      const { code, data } = await getGoodsListInfo()
      if (code === 2000) {
        this.onSellCount = data.on_sell_count
        this.offSellCount = data.off_sell_count
      }
    },

    // 根据商品编号搜索
    onSearchByID() {
      if (this.searchId.length > 0) {
        this.$router.push({
          path: '/goods-detail',
          query: { goodsId: this.searchId },
        })
        this.searchId = ''
      }
    },

    // 重置搜索表单
    onReset() {
      this.selectedCategory = ''
      this.selectedSchool = ''
      this.searchText = ''
      this.getGoodsListOnSell()
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    box-shadow: $base-shadow;
  }
}

.search-input::v-deep {
  // 重设输入框样式
  $padding: 0.6rem 0.5rem 0.6rem 2.5rem !important;
  .vs-inputx {
    padding: $padding;
    box-shadow: $light-shadow !important;
    &:focus {
      box-shadow: $base-shadow !important;
    }
  }
  .vs-input--placeholder {
    padding: $padding;
  }
  .vs-icon {
    top: 0.6rem;
    font-size: 20px;
  }
}

.el-select::v-deep {
  .el-input__inner {
    border: 1px solid rgba(0, 0, 0, 0.2);
    &::placeholder {
      color: rgba(0, 0, 0, 0.8);
    }
  }
}

.mt {
  @media (max-width: 1154px) {
    margin-top: 1rem;
  }
}
</style>
