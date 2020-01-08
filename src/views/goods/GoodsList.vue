<template>
  <div>
    <div class="flex mt-3 mb-6">
      <div
        class="box w-1/4 lg:px-6 px-3"
        @click="getGoodsListOnSell()"
      >
        <div>
          <div class="text-3xl">
            {{ onSellCount.toLocaleString() }}
          </div>
          <div class="text-gray-600">已上架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-primary), 0.2)"
        >
          <i class="el-icon-sell p-2 text-3xl text-primary"></i>
        </div>
      </div>

      <div
        class="box w-1/4 mx-5 lg:px-6 px-3"
        @click="getGoodsListOffSell()"
      >
        <div>
          <div class="text-3xl">
            {{ offSellCount.toLocaleString() }}
          </div>
          <div class="text-gray-600">已下架商品</div>
        </div>
        <div
          class="rounded-full"
          style="background: rgba(var(--vs-danger), 0.2)"
        >
          <i class="el-icon-sold-out p-2 text-3xl text-danger"></i>
        </div>
      </div>

      <div class="w-2/4 py-3 px-6 rounded-lg bg-white">
        <div class="mb-3 text-gray-600">高级操作</div>
        <div class="flex items-center justify-end text-sm">
          <vs-button
            class="mr-5"
            color="primary"
            type="border"
            @click="exportExcel"
          >导出列表数据</vs-button>
          <vs-button @click="$router.push({
                      path: '/goods-vivid-list'
                    })">查看图片列表</vs-button>
        </div>
      </div>
    </div>

    <!-- 筛选搜索 -->
    <div class="mb-6 pt-3 pb-5 px-6 rounded-lg bg-white">
      <div class="mb-3 text-gray-600">筛选搜索</div>
      <div class="flex justify-around items-center flex-wrap">
        <div>
          <el-select
            v-model="category"
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
            v-model="school"
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
            v-model="school"
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
        <div class="mt">
          <vs-input
            class="search-input w-64"
            icon="search"
            placeholder="输入商品 ID 搜索"
            v-model="searchText"
            @keyup.enter="onSearchByID"
          />
        </div>
      </div>
    </div>

    <!-- 列表 -->
    <ListTable
      :goodsList="goodsList"
      :tableTitle="tableTitle"
      :loading="tableLoading"
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
    category: '',
    school: '',
    tableTitle: null, // 表格标题
    onSellCount: '--', // 已上架商品数量
    offSellCount: '--', // 违规下架商品数量
    searchText: '',
    tableLoading: false,
  }),

  computed: {
    ...mapState(['categoryList', 'schoolList']),
  },

  created() {
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
  border-radius: 0.5rem;
  background: white;
  transition: all 0.4s;
  cursor: pointer;

  &:hover {
    box-shadow: $light-shadow;
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
