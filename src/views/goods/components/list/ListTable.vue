<template>
  <div
    id="table-list"
    class="vs-con-loading__container"
  >
    <vs-table
      search
      pagination
      max-items="10"
      noDataText="暂无数据"
      :data="goodsList"
    >
      <template slot="header">
        <div class="w-full flex items-center p-4">
          <div
            class="text-xl font-semibold"
            :class="tableTitle === '已上架商品' ? 'text-primary' : 'text-danger'"
          >{{ tableTitle }}</div>
          <div class="ml-auto">
            <el-date-picker
              v-model="date"
              type="daterange"
              align="right"
              unlink-panels
              start-placeholder="开始日期"
              end-placeholder="结束日期"
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
        <vs-th>收藏数</vs-th>
        <vs-th>卖家昵称</vs-th>
        <vs-th>#</vs-th>
      </template>

      <template slot-scope="{data}">
        <template v-for="(tr, i) in data">
          <vs-tr
            v-if="tr.seller"
            :key="i"
          >
            <vs-td>{{ tr.name }}</vs-td>
            <vs-td>
              <vs-chip
                v-for="(it, i) in tr.category"
                :key="i"
              >{{ it.name }}</vs-chip>
            </vs-td>
            <vs-td class="text-gray-700 font-bold">￥{{ Number(tr.price).toFixed(2) }}</vs-td>
            <vs-td>{{ tr.collect_num }}</vs-td>
            <vs-td class="text-gray-700 font-bold">{{ tr.seller.nickname }}</vs-td>
            <vs-td class="text-gray-600">{{ i + 1 }}</vs-td>

            <!-- 展开的内容 -->
            <template slot="expand">
              <div class="flex w-full">
                <div class="w-1/6">
                  <div class="flex flex-col h-full justify-center items-center">
                    <vs-avatar
                      size="45px"
                      :src="tr.seller.avatar_url"
                      @click="viewUserDetail()"
                    />
                    <div
                      class="my-2 text-gray-600 hover:text-gray-800 text-base
                      font-semibold cursor-pointer"
                      @click="viewUserDetail()"
                    >{{ tr.seller.nickname }}</div>
                    <vs-chip color="success">
                      乐享信用 良好
                    </vs-chip>
                  </div>
                </div>
                <vs-list class="w-5/12">
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
                    :subtitle="`${tr.price}`"
                  ></vs-list-item>
                </vs-list>
                <vs-list class="w-5/12">
                  <vs-list-header
                    class="text-base"
                    title="商品信息"
                    color="warning"
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
              </div>
            </template>
          </vs-tr>
        </template>
      </template>
    </vs-table>
  </div>
</template>

<script>
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
    date: null,
    pickerOptions: {
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
    },
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
      console.log(this.$dayjs(date[0]).unix(), this.$dayjs(date[1]).unix())
      this.$emit('getGoodsListOnSell', date)
    },

    // 复制商品编号
    onCopy(e) {
      this.$message(`已复制商品编号：${e.text}  🎉`)
    },

    formatTime(time) {
      return this.$dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
  },
}
</script>

<style lang="scss" scoped>
#table-list::v-deep {
  .vs-table--thead {
    color: gray;
  }
  .vs-table--pagination {
    background: white;
  }
}
</style>