<template>
  <div
    id="div-with-loading"
    class="main vs-con-loading__container"
  >
    <div>
      <div class="card">
        <div class="card-header">
          <p class="mr-3">
            <span>订单号：</span>
            <span class="text-sm text-gray">{{ detail._id }}</span>
          </p>
          <el-tooltip
            content="复制订单号"
            effect="light"
          >
            <i
              class="el-icon-copy-document text-gray cursor-pointer"
              v-clipboard:copy="detail._id"
              v-clipboard:success="onCopy"
            ></i>
          </el-tooltip>
        </div>
        <vs-divider />
        <div class="order-info">
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">订单状态</div>
              <div class="value">
                <vs-chip
                  v-if="detail.status"
                  :color="status[detail.status].color"
                >
                  <i :class="[status[detail.status].icon, 'mr-2 text-lg']"></i>
                  {{ status[detail.status].text }}
                </vs-chip>
              </div>
            </div>
            <template v-if="detail.address">
              <div class="order-info__item">
                <div class="label">收货人</div>
                <div class="value">{{ detail.address.receiver }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">联系电话</div>
                <div class="value">{{ detail.address.phone }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">收货地址</div>
                <div class="value">{{ detail.address.address }}</div>
              </div>
            </template>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">创建时间</div>
              <div class="value">
                {{ $dayjs(detail.created_at).format('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </div>
            <div class="order-info__item">
              <div class="label">支付方式</div>
              <div class="value">{{ payment[detail.payment] }}</div>
            </div>
            <template v-if="detail.buyer">
              <div class="order-info__item">
                <div class="label">买家昵称</div>
                <div class="value">{{ detail.buyer.nickname }}</div>
              </div>
              <div class="order-info__item">
                <div class="label">买家姓名</div>
                <div class="value">{{ detail.buyer.real_name }}</div>
              </div>
            </template>
          </div>
          <div class="order-info__col">
            <div class="order-info__item">
              <div class="label">买家留言</div>
              <div class="value">{{ detail.note || '无备注' }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <p>购物清单</p>
        </div>
        <vs-divider />
        <div>
          <DetailGoodsList :goods-list="detail.goods_list" />
          <div class="flex flex-col items-end">
            <div class="mr-1 text-semi">已付款</div>
            <div class="success text-2xl font-bold">
              ￥{{ Number(detail.total_price).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DetailGoodsList from './components/DetailGoodsList.vue'

import { getOrderDetail } from '@/request/api/order'

export default {
  name: 'OrderDetail',
  components: { DetailGoodsList },

  data: () => ({
    detail: {},
    status: {
      1: {
        text: '进行中',
        color: 'primary',
        icon: 'el-icon-loading',
      },
      2: {
        text: '已完成',
        color: 'success',
        icon: 'el-icon-check',
      },
      3: {
        text: '已取消',
        color: 'danger',
        icon: 'el-icon-close',
      },
    },
    payment: {
      huabei: '余额支付',
      weixin: '微信支付',
      zhifubao: '支付宝支付',
      yinlian: '银行卡支付',
    },
  }),

  mounted() {
    this.getOrderDetail(this.$route.query.orderId)
  },

  methods: {
    async getOrderDetail(order_id) {
      this.$vs.loading({
        container: '#div-with-loading',
        scale: 1,
      })

      try {
        const { code, data: { order_detail } } = await getOrderDetail({ order_id })
        if (code === 2000) {
          if (order_detail) {
            this.detail = order_detail
          }
        }
      } finally {
        this.$vs.loading.close('#div-with-loading > .con-vs-loading')
      }
    },

    onCopy(e) {
      this.$message(`已复制订单编号：${e.text}  🎉`)
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  .card {
    .card-header p {
      color: themed("text-color-primary");
    }
  }

  .order-info,
  .user-info {
    .label {
      color: themed("text-color-semi");
    }
    .value {
      color: themed("text-color-gray");
    }
  }
}

.card {
  width: 100%;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 10px;
  .card-header {
    display: flex;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
  }
}

.order-info {
  display: flex;
  .order-info__col {
    width: 33.33%;
  }
  .order-info__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 10px;
  }
  .label {
    width: 28%;
    font-size: 15px;
  }
  .value {
    width: 66%;
    font-size: 15px;
  }
}
</style>
