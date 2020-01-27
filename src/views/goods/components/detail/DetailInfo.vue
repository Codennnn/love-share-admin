<template>
  <div class="relative p-6 bg-primary rounded-lg overflow-hidden">
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
        <div class="my-2 flex items-center justify-between text-gray text-sm">
          <p>发布于 {{ timeDiff(goods.created_at) }}</p>
          <div class="flex items-center">
            <span class="ml-2 text-sm text-gray">{{ goods.collect_num }} 人收藏</span>
          </div>
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
              ￥{{ Number(goods.price).toFixed(2) }}
            </span>
            <span
              v-if="goods.original_price !== 0"
              class="text-gray"
              style="text-decoration: line-through;"
            >
              ￥{{ Number(goods.original_price).toFixed(2) }}
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
            (￥{{ Number(goods.delivery_charge).toFixed(2) }})
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
        <div class="flex items-center mt-6">
          <vs-input-number
            class="mr-4"
            v-model="amount"
            :min="1"
            :max="goods.quantity"
          />
          <div v-if="goods.status === 3">
            <vs-button
              color="danger"
              size="small"
              :disabled="true"
            >该商品已下架</vs-button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4">
      <p class="text-primary">商品详细介绍</p>
      <div
        class="mt-2 text-sm goods-desc"
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
import { timeDiff } from '@/utils/util'

export default {
  name: 'DetailInfo',
  components: { ElImageViewer },
  props: { goods: Object, goodsId: String },

  data: () => ({
    timeDiff,
    showViewer: false,
    addCartDisable: false,

    amount: 1, // 购买的数量
    isCollected: false,
  }),

  watch: {
    amount(v) {
      this.$emit('setAmount', v)
    },
  },

  deactivated() {
    this.showViewer = false
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

.btn-group {
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    height: 38px;
    line-height: 38px;
    margin: 0px !important;
    &.btnx {
      padding: 0 15px;
      margin-left: 10px !important;
      border-radius: 5px 0px 0px 5px;
    }
    &.btn-drop {
      font-size: 16px;
      border-radius: 0px 5px 5px 0px;
      border-left: 1px solid rgba(255, 255, 255, 0.2);
    }
  }
}

.collect-btn {
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    &.is-collected {
      background: rgba(var(--vs-warning), 0.1);
    }
    &.not-collected {
      background: rgba(var(--vs-success), 0.1);
    }
  }
}
</style>
