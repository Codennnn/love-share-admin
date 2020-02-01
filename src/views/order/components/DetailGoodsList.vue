<template>
  <vs-table
    noDataText="暂无数据"
    :data="goodsList"
  >
    <template slot="thead">
      <vs-th>图片</vs-th>
      <vs-th>商品名称</vs-th>
      <vs-th>数量</vs-th>
      <vs-th>价格</vs-th>
      <vs-th>卖家</vs-th>
      <vs-th>物流</vs-th>
      <vs-th></vs-th>
    </template>

    <template slot-scope="{data}">
      <vs-tr
        v-for="(tr, i) in data"
        :key="i"
      >
        <vs-td>
          <el-image
            class="rounded-lg base-shadow cursor-pointer"
            style="width: 80px; height: 80px"
            fit="cover"
            :src="`${tr.goods.img_list[0]}?imageView2/2/w/130`"
          >
          </el-image>
        </vs-td>
        <vs-td>{{ tr.goods.name }}</vs-td>
        <vs-td>{{ tr.amount }}</vs-td>
        <vs-td>￥{{ tr.goods.price }}</vs-td>
        <vs-td>{{ tr.goods.seller.nickname }}</vs-td>
        <vs-td>
          <el-popover trigger="click">
            <div class="pt-3">
              <el-timeline :reverse="true">
                <el-timeline-item
                  v-for="(lo, i) in logistics"
                  :key="i"
                  :timestamp="lo.timestamp"
                >
                  {{ lo.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
            <feather
              slot="reference"
              title="物流信息"
              class="text-primary cursor-pointer"
              size="21"
              stroke-width="1.7"
              type="truck"
            ></feather>
          </el-popover>

        </vs-td>
        <vs-td
          class="primary cursor-pointer"
          @click.native="$router.push({
            path: '/goods-detail',
            query: { goodsId: tr.goods._id }
          })"
        >
          查看详情
        </vs-td>
      </vs-tr>
    </template>
  </vs-table>
</template>

<script>
export default {
  name: 'DetailGoodsList',
  props: {
    goodsList: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    logistics: [
      { timestamp: '2018-04-12 14:46', content: '商品出库' },
      { timestamp: '2018-04-15 20:50', content: '到达东莞虎门转运站' },
      { timestamp: '2018-04-16 08:50', content: '正在被派送' },
    ],
  }),
}
</script>
