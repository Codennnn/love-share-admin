<template>
  <div class="flex flex-wrap">
    <!-- 左侧 -->
    <div
      class="pr-3"
      style="width: 68%;"
    >
      <!-- 商品信息 -->
      <DetailInfo
        :goods="goods"
        :goodsId="goodsId"
      />
    </div>

    <!-- 右侧 -->
    <div
      class="pl-3"
      style="width: 32%;"
    >
      <!-- 卖家信息 -->
      <DetailUser :seller="seller" />

      <!-- 商品评论 -->
      <DetailComment
        class="mt-6"
        :comments="comments"
        :goodsId="goodsId"
        :owner="seller._id"
        :total="pagination.total"
        @refreshComments="getGoodsComments()"
        @switchPage="(page) => { getGoodsComments(page) }"
      />
    </div>
  </div>
</template>

<script>
import DetailInfo from './components/detail/DetailInfo.vue'
import DetailUser from './components/detail/DetailUser.vue'
import DetailComment from './components/detail/DetailComment.vue'

import {
  getGoodsDetail,
  getGoodsSeller,
  getGoodsComments,
} from '@/request/api/goods'

export default {
  name: 'GoodsDetail',
  components: {
    DetailInfo, DetailUser, DetailComment,
  },

  data: () => ({
    goodsId: '',
    goods: {},
    comments: [],
    pagination: {},
    seller: { // 卖家信息
      avatar_url: '',
      nickname: '----',
      school: { name: '-----' },
      gender: '',
      credit_value: 0,
      fans: [],
      published_goods: [],
    },
  }),

  mounted() {
    this.goodsId = this.$route.query.goodsId
    this.getGoodsDetail()
    this.getGoodsSeller()
    this.getGoodsComments()
  },

  methods: {
    // 获取商品信息
    async getGoodsDetail() {
      const { code, data } = await getGoodsDetail({ goods_id: this.goodsId })
      if (code === 2000) {
        this.goods = data.goods_detail
      }
    },

    // 获取卖家信息
    async getGoodsSeller() {
      const { code, data } = await getGoodsSeller({ goods_id: this.goodsId })
      if (code === 2000) {
        this.seller = data.seller
      }
    },

    // 获取留言
    async getGoodsComments(page = 1) {
      const { code, data } = await getGoodsComments({
        goods_id: this.goodsId,
        page,
        page_size: 5,
      })
      if (code === 2000) {
        this.comments = data.comments
        this.pagination = data.pagination
      }
    },
  },
}
</script>
