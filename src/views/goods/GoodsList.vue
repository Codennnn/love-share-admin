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

      <div class="w-2/4 py-3 px-6 radius bg-gray">
        <div class="mb-3 text-semi">高级操作</div>
        <div class="flex items-center justify-between text-sm">
          <div class="sm:w-1/2">
            <vs-input
              class="search-input w-full"
              icon="search"
              placeholder="输入商品 ID 搜索"
              v-model="searchText"
              @keyup.enter="onSearchByID"
            />
          </div>
          <div class="sm:w-1/2 text-right">
            <vs-button
              color="primary"
              type="border"
              @click="exportExcel"
            >导出列表数据</vs-button>
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
            @click="selectedCategory = '', selectedSchool = ''"
          ></i>
        </div>
      </div>
      <div
        class="pt-8 pb-4 flex justify-around items-center flex-wrap overflow-hidden"
        style="transition: all 0.4s ease;"
        :style="inputStyle"
      >
        <div>
          <el-select
            v-model="selectedCategory"
            filterable
            placeholder="根据商品分类搜索"
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
        <div>
          <el-select
            v-model="selectedSchool"
            filterable
            placeholder="根据商品分类搜索"
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
          >确认搜索</vs-button>
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <ListTable
      :goodsList="goodsList"
      :tableTitle="tableTitle"
      :loading="tableLoading"
      @getGoodsListOnSell="getGoodsListOnSell"
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
        'max-height': '100px',
      }
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
            page_size: 10,
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
            page_size: 10,
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

    // 获取商品的统计数据
    async getGoodsListInfo() {
      const { code, data } = await getGoodsListInfo()
      if (code === 2000) {
        this.onSellCount = data.on_sell_count
        this.offSellCount = data.off_sell_count
      }
    },

    // 根据商品编号搜索
    onSearchByID() {
      if (this.searchText.length > 0) {
        this.getGoodsListOffSell()
      }
    },

    // 导出为 Excel 表格
    exportExcel() {
      import('@/vendor/Export2Excel').then((excel) => {
        const header = ['商品 ID', '商品名称', '价格', '卖家姓名', '发布时间']
        const filterVal = ['_id', 'name', 'price', 'real_name', 'time']
        const data = this.formatJson(filterVal, this.goodsList)
        excel.export_json_to_excel({
          header,
          data,
          filename: '乐享校园_商品列表',
          autoWidth: true,
          bookType: 'xlsx',
        })
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map((j) => {
        if (j === 'timestamp') {
          return this.$dayjs.unix(v[j]).format('YYYY-MM-DD HH:mm:ss')
        }
        return v[j]
      }))
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
  .vs-inputx {
    padding-left: 35px;
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
