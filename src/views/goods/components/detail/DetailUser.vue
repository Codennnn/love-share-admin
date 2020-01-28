<template>
  <div>
    <div class="mb-5 p-3 text-center bg-semi base-shadow radius">
      <vs-avatar
        size="90px"
        :src="`${seller.avatar_url}?imageView2/2/w/100`"
        @click="viewUserDetail(seller._id)"
      />
      <div
        class="flex justify-center items-center text-lg cursor-pointer"
        @click="viewUserDetail(seller._id)"
      >
        <span class="text-primary">{{ seller.nickname }}</span>
        <i
          class="ml-1"
          :class="seller.gender === '1' ? 'el-icon-male primary' : 'el-icon-female danger'"
        ></i>
      </div>
      <div class="my-1 text-sm text-gray">
        {{ seller.school.name }}
      </div>
      <div class="flex justify-around mt-3">
        <div>
          <div class="text-semi font-bold">{{ seller.published_goods.length }}</div>
          <div class="text-gray text-sm">已发布</div>
        </div>
        <div>
          <div class="text-semi font-bold">{{ seller.fans.length }}</div>
          <div class="text-gray text-sm">关注者</div>
        </div>
        <div>
          <div class="text-semi font-bold">{{ seller.credit_value }}</div>
          <div class="text-gray text-sm">信用值</div>
        </div>
      </div>
    </div>
    <div class="hover-light cursor-pointer">
      <div
        class="p-2 flex justify-center items-center text-center text-white
          bg-primary-gradient rounded-lg"
        @click="contactSeller()"
      >
        联系卖家
      </div>
      <div class="light"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailUser',
  props: { seller: Object },

  methods: {
    // 查看用户详情
    viewUserDetail(userId) {
      this.$router.push({
        path: '/user-detail',
        query: { userId },
      })
    },

    // 联系卖家
    async contactSeller() {
      const { _id, nickname, avatar_url } = this.seller
      if (!this.$store.getters['chat/isInChat'](_id)) {
        this.$store.dispatch('chat/addContact', { _id, nickname, avatar_url })
      }
      this.$store.commit('chat/SET_ACTIVE_CHAT_USER', { _id, nickname, avatar_url })
      this.$store.commit('chat/SET_CHAT_OPEN')
    },
  },
}
</script>

<style lang="scss" scoped>
// 按钮闪光闪烁
.hover-light {
  position: relative;
  overflow: hidden;
  .light {
    position: absolute;
    display: none;
    top: 0;
    left: -150px;
    width: 150px;
    height: 100%;
    background-image: -moz-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    background-image: -webkit-linear-gradient(
      0deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0)
    );
    transform: skewX(-25deg);
  }
  &:hover {
    .light {
      display: block;
      animation: flash 0.3s;
    }
    @keyframes flash {
      from {
        left: -150px;
      }
      to {
        left: 100%;
      }
    }
  }
}
</style>
