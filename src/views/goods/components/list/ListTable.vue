<template>
  <div
    id="table-list"
    class="radius vs-con-loading__container"
  >
    <vs-table
      pagination
      max-items="10"
      noDataText="暂无数据"
      :data="goodsList"
    >
      <template slot="header">
        <div class="w-full flex items-center p-4">
          <div
            class="text-xl font-semibold"
            :class="tableTitle === '已上架商品' ? 'primary' : 'danger'"
          >{{ tableTitle }}</div>
          <div class="ml-auto flex items-center">
            <el-tooltip content="导出列表数据">
              <div
                @click="exportExcel()"
                class="w-10 h-10 mr-5 flex-row-center primary-semi
                 rounded-lg bg-primary-10 cursor-pointer"
              >
                <feather
                  size="21"
                  stroke-width="1.8"
                  type="download"
                ></feather>
              </div>
            </el-tooltip>
            <el-date-picker
              unlink-panels
              type="daterange"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              v-model="date"
              :picker-options="pickerOptions"
              @change="onDateChange"
            ></el-date-picker>
          </div>
        </div>
      </template>

      <template slot="thead">
        <vs-th>商品名称</vs-th>
        <vs-th>分类</vs-th>
        <vs-th>单价</vs-th>
        <vs-th>卖家昵称</vs-th>
        <vs-th>收藏数</vs-th>
        <vs-th>浏览量</vs-th>
        <vs-th></vs-th>
      </template>

      <template slot-scope="{data}">
        <template v-for="(tr, i) in data">
          <vs-tr
            v-if="tr.seller"
            :key="i"
          >
            <vs-td class="text-primary">{{ tr.name }}</vs-td>
            <vs-td>
              <vs-chip
                v-for="(it, i) in tr.category"
                :key="i"
              >{{ it.name }}</vs-chip>
            </vs-td>
            <vs-td class="text-gray font-bold">￥{{ $numFixed(tr.price) }}</vs-td>
            <vs-td class="text-gray font-bold">{{ tr.seller.nickname }}</vs-td>
            <vs-td class="text-semi">{{ tr.collect_num }}</vs-td>
            <vs-td class="text-semi">{{ tr.views }}</vs-td>
            <vs-td
              title="查看详情"
              class="text-semi cursor-pointer"
              @click.native.stop="viewGoodsDetail(tr._id)"
            >
              <feather
                size="18"
                type="log-in"
              ></feather>
            </vs-td>

            <!-- 展开的内容 -->
            <template slot="expand">
              <div class="flex w-full">
                <el-image
                  class="w-2/12 m-4 p-4 radius base-shadow"
                  fit="contain"
                  :src="`${tr.img_list[0]}?imageView2/2/w/200`"
                ></el-image>
                <vs-list class="w-4/12 ml-4">
                  <vs-list-header
                    class="text-base"
                    title="商品信息"
                  ></vs-list-header>
                  <vs-list-item
                    icon-pack="el-icon"
                    icon="el-icon-collection-tag"
                    title="商品 ID"
                    :subtitle="tr._id"
                  >
                    <vs-button
                      type="flat"
                      size="small"
                      v-clipboard:copy="tr._id"
                      v-clipboard:success="onCopy"
                    >复制</vs-button>
                  </vs-list-item>
                  <vs-list-item
                    icon-pack="el-icon"
                    icon="el-icon-time"
                    title="发布时间"
                    :subtitle="formatTime(tr.created_at)"
                  >
                    <vs-button
                      type="flat"
                      size="small"
                      @click="viewGoodsDetail(tr._id)"
                    >查看商品详情</vs-button>
                  </vs-list-item>
                </vs-list>
                <vs-list class="w-4/12">
                  <vs-list-header
                    class="text-base"
                    title="卖家信息"
                    color="success"
                  ></vs-list-header>
                  <vs-list-item
                    icon-pack="el-icon"
                    icon="el-icon-user"
                    title="真实姓名"
                    :subtitle="tr.seller.real_name"
                  ></vs-list-item>
                  <vs-list-item
                    icon-pack="el-icon"
                    icon="el-icon-star-off"
                    title="乐享值"
                    :subtitle="`${tr.seller.share_value}`"
                  ></vs-list-item>
                </vs-list>
                <div class="flex-1">
                  <div class="flex flex-col h-full justify-center items-center">
                    <vs-avatar
                      size="45px"
                      :src="tr.seller.avatar_url"
                      @click="viewUserDetail(tr.seller._id)"
                    />
                    <div
                      class="my-2 text-gray text-base
                      font-semibold cursor-pointer"
                      @click="viewUserDetail(tr.seller._id)"
                    >{{ tr.seller.nickname }}</div>
                    <vs-chip :color="tr.seller.credit_value | creditColor">
                      乐享信用 {{ tr.seller.credit_value | creditText }}
                    </vs-chip>
                  </div>
                </div>
              </div>
            </template>
          </vs-tr>
        </template>
      </template>
    </vs-table>
  </div>
</template>

<script>
const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    },
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    },
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    },
  }],
}
export default {
  name: 'ListTable',
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
    tableTitle: {
      type: String,
      default: '已上架商品',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    pickerOptions,
    date: null,
  }),

  watch: {
    loading(v) {
      if (v) {
        this.$vs.loading({
          type: 'point',
          container: '#table-list',
          scale: 1,
        })
      } else {
        this.$vs.loading.close('#table-list > .con-vs-loading')
      }
    },
  },

  filters: {
    creditText(val) {
      if (val >= 500 && val <= 690) {
        return '良好'
      }
      if (val > 690) {
        return '极好'
      }
      if (val < 490 && val >= 390) {
        return '一般'
      }
      return '差劲'
    },
    creditColor(val) {
      if (val >= 500 && val <= 690) {
        return 'success'
      }
      if (val > 690) {
        return 'primary'
      }
      if (val < 490 && val >= 390) {
        return 'warning'
      }
      return 'danger'
    },
  },

  methods: {
    // 查看商品详情
    viewGoodsDetail(goodsId) {
      this.$router.push({ path: '/goods-detail', query: { goodsId } })
    },

    // 查看用户详情
    viewUserDetail(userId) {
      this.$router.push({ path: '/user-detail', query: { userId } })
    },

    // 按日期获取商品
    onDateChange(date) {
      if (date) {
        const dateRange = date.map(el => this.$dayjs(el).format('YYYY-MM-DD'))
        this.$emit('dateChange', dateRange)
      } else {
        this.$emit('getGoodsListOnSell')
      }
    },

    // 复制商品编号
    onCopy(e) {
      this.$message(`已复制商品编号：${e.text}  🎉`)
    },

    formatTime(time) {
      return this.$dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },

    // 导出为 Excel 表格

    exportExcel() {
      import('@/vendor/Export2Excel').then((excel) => {
        const header = ['商品 ID', '商品名称', '价格', '卖家昵称', '卖家姓名', '收藏数', '浏览量', '发布时间']
        const filterVal = ['_id', 'name', 'price', 'seller.nickname', 'seller.real_name', 'collect_num', 'views', 'created_at']
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
    formatJson(filterVal, goodsList) {
      return goodsList.map(obj => filterVal.map((keyStr) => {
        const key = keyStr.split('.')
        if (key.length === 1) {
          return obj[key[0]]
        }
        return obj[key[0]][key[1]]
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  #table-list .vs-con-table::v-deep {
    background: themed("bg-color-semi");
    .vs-table--thead {
      color: themed("text-color-semi");
    }
    .vs-table--tbody-table tr {
      background: themed("bg-color-semi");
      .vs-icon {
        color: themed("text-color-semi");
      }
    }
    .tr-expand {
      .vs-list--item {
        color: themed("text-color-semi");
      }
      .content-tr-expand {
        padding-right: 10px;
      }
    }
  }
}
</style>
