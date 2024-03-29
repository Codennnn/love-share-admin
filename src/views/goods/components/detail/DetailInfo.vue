<template>
  <div class="relative p-6 bg-main rounded-lg overflow-hidden">
    <div class="flex">
      <div style="width: 60%;">
        <el-carousel :autoplay="false">
          <el-carousel-item
            style="display: flex; justify-content: center;"
            v-for="(image, i) in goods.img_list"
            :key="i"
          >
            <img
              class="h-full"
              style="max-width: inherit;"
              :src="image"
            >
          </el-carousel-item>
        </el-carousel>
        <vs-images hover="zoom">
          <vs-image
            v-for="(image, i) in goods.img_list"
            :key="i"
            :src="`${image}?imageView2/2/w/100`"
            @click.native="showViewer = true"
          />
        </vs-images>
      </div>
      <div
        class="pl-5"
        style="width: 40%;"
      >
        <p class="text-primary text-lg font-bold">{{ goods.name }}</p>
        <div class="my-2 text-gray text-sm">
          <p>
            <span>发布于 {{ $timeDiff(goods.created_at) }}，已被浏览</span>
            <span class="mx-1">{{ goods.views }}</span>
            <span>次，共有 {{ goods.collect_num }} 人收藏</span>
          </p>
        </div>
        <vs-divider border-style="dashed" />
        <div class="info-item">
          <vs-chip>类 别</vs-chip>
          <span
            class="text-gray"
            style="margin: 0 5px 4px 0; font-size: 15px;"
            v-for="(item, i) in goods.category"
            :key="i"
          >
            {{ item.name }}
          </span>
        </div>
        <div class="info-item">
          <vs-chip>价 格</vs-chip>
          <div>
            <span class="text-2xl text-primary font-semibold">
              ￥{{ $numFixed(goods.price) }}
            </span>
            <span
              v-if="goods.original_price !== 0"
              class="text-gray"
              style="text-decoration: line-through;"
            >
              ￥{{ $numFixed(goods.original_price) }}
            </span>
          </div>
        </div>
        <div class="info-item">
          <vs-chip>新 旧</vs-chip>
          <span
            class="font-bold"
            style="margin-bottom: 2px;"
            :class="{
              'success': goods.degree > 70,
              'warning': goods.degree >= 30 && goods.degree < 70,
              'danger': goods.degree < 30,
            } "
          >
            {{ goods.degree }}%
          </span>
        </div>
        <div class="info-item">
          <vs-chip>数 量</vs-chip>
          <span
            class="text-gray"
            style="margin-bottom: 2px;"
          >{{ goods.quantity }}</span>
        </div>
        <div class="info-item">
          <vs-chip>配 送</vs-chip>
          <span
            class="text-gray"
            style="margin-bottom: 4px; font-size: 15px;"
          >
            {{ goods.delivery === '1' ? '包邮' : goods.delivery === '2' ? '自费' : '自提' }}
          </span>
          <span
            v-if="goods.delivery === '2'"
            class="text-gray"
            style="margin-bottom: 4px; font-size: 15px;"
          >
            (￥{{ $numFixed(goods.delivery_charge) }})
          </span>
        </div>
        <div
          class="info-item"
          v-if="goods.returnable"
        >
          <vs-chip>保 障</vs-chip>
          <span style="margin-bottom: 4px; font-size: 15px;">
            7天无理由退换货
          </span>
        </div>
        <vs-divider border-style="dashed" />
        <div class="flex items-center justify-between">
          <vs-button
            v-if="goods.status === 1"
            color="success"
          >此商品正在出售中</vs-button>
          <vs-button
            v-if="goods.status === 2"
            color="warning"
          >此商品已售出</vs-button>
          <vs-button
            v-if="goods.status === 3"
            color="danger"
            :disabled="true"
          >该商品已下架</vs-button>
          <div
            class="w-10 h-10 flex-row-center radius cursor-pointer"
            :title="goods.status === 1 ? '下架' : '上架'"
            :class="{'danger-semi bg-danger-10': goods.status === 1, 'primary-semi bg-primary-10': goods.status === 3}"
            @click="goods.status === 1 ? updateGoodsStatus(3) : updateGoodsStatus(1)"
          >
            <feather
              size="20"
              :type="goods.status === 1 ? 'trending-down' : 'trending-up'"
            ></feather>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-primary">商品详细介绍</p>
      <div
        class="mt-2 text-sm text-semi goods-desc"
        v-html="goods.description"
      ></div>
    </div>

    <!-- 图片预览 -->
    <el-image-viewer
      v-show="showViewer"
      :on-close="() => { showViewer = false }"
      :url-list="goods.img_list"
    />
  </div>
</template>

<script>
import ElImageViewer from 'element-ui/packages/image/src/image-viewer.vue'
import { updateManyGoods } from '@/request/api/goods'

export default {
  name: 'DetailInfo',
  components: { ElImageViewer },

  props: { goods: Object, goodsId: String },

  data: () => ({
    showViewer: false,
  }),

  methods: {
    // 更新商品的状态
    async updateGoodsStatus(status) {
      const { code } = await updateManyGoods({
        goods_id_list: [this.goodsId],
        status,
      })
      if (code === 2000) {
        if (status === 1) {
          this.$message.info('此商品已重新上架')
        } else {
          this.$message.error('此商品已被下架')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.info-item {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  cursor: default;
  .con-vs-chip {
    margin-right: 0.5rem;
  }
}

.goods-desc::v-deep {
  h1 {
    font-size: 2em !important;
    margin: 0.67em 0 !important;
  }

  h2 {
    font-size: 1.5em;
    margin: 0.75em 0 !important;
  }

  h3 {
    font-size: 1.17em;
    margin: 0.83em 0 !important;
  }

  h5 {
    font-size: 0.83em;
    margin: 1.5em 0 !important;
  }

  h6 {
    font-size: 0.75em;
    margin: 1.67em 0 !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  b,
  strong {
    font-weight: bolder !important;
  }
}
</style>
