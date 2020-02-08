<template>
  <div
    ref="comment"
    class="relative p-3 bg-primary rounded-lg overflow-hidden"
    :style="`max-height: ${maxHeight}px;`"
  >
    <div class="mb-1 flex justify-between items-center">
      <span class="mb-2 text-primary">留言板</span>
    </div>

    <VuePerfectScrollbar
      v-if="comments.length > 0"
      style="max-height: 550px;"
      :settings="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <ul class="pt-2 overflow-hidden">
        <li
          class="msg relative mb-2"
          style="transition: all 0.3s;"
          v-for="(cm, i) in comments"
          :key="i"
          :class="{'px-1 py-2 bg-gray-100 rounded-lg': currMsg === cm._id}"
        >
          <div class="flex items-center">
            <vs-avatar
              :src="`${cm.sender.avatar_url}?imageView2/2/w/50`"
              @click="viewUserDetail(cm.sender._id)"
            ></vs-avatar>
            <p class="name ml-1">
              {{ cm.sender.nickname }}
            </p>
            <p
              v-if="cm.sender._id === owner"
              class="owner ml-1"
            >主人</p>
            <p class="ml-2 text-xs text-gray">
              {{ $timeDiff(cm.created_at) }}
            </p>
          </div>
          <p class="ml-8 text-sm text-gray">{{ cm.content }}</p>
          <ul
            v-if="cm.replies.length > 0"
            class="ml-6 p-2 bg-gray rounded-lg"
          >
            <li
              v-for="(it, index) in cm.replies"
              :key="index"
            >
              <p class="text-sm">
                <span>
                  <span
                    class="name cursor-pointer"
                    @click="viewUserDetail(it.sender._id)"
                  >{{ it.sender.nickname }}</span>
                  <span
                    v-if="it.sender._id === owner"
                    class="owner cursor-default"
                  >主人</span>
                </span>
                <span class="mx-1 text-gray">回复</span>
                <span>
                  <span
                    class="name cursor-pointer"
                    @click="viewUserDetail(it.at._id)"
                  >{{ it.at.nickname }}</span>
                  <span
                    v-if="it.at._id === owner"
                    class="owner cursor-default"
                  >主人</span>
                  :
                </span>
                <span class="text-gray">
                  {{ it.content }}
                </span>
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </VuePerfectScrollbar>
    <p
      v-else
      class="p-3 text-center text-sm text-gray bg-gray rounded-lg"
    >
      暂时还没有留言
    </p>
    <div v-if="showComments && !hideComment">
      <vs-pagination
        :total="Math.ceil(total / 5)"
        v-model="currPage"
      ></vs-pagination>
    </div>

    <div
      v-if="hideComment"
      class="hide-comment absolute left-0 bottom-0 w-full text-sm text-center text-gray"
      @click="showMoreComments()"
    >
      查看更多留言
    </div>
  </div>
</template>

<script>
import elementResizeDetectorMaker from 'element-resize-detector'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

export default {
  name: 'DetailComment',
  components: { VuePerfectScrollbar },
  props: {
    goodsId: String,
    comments: Array,
    owner: String,
    total: Number,
  },

  watch: {
    currPage(page) {
      this.$emit('switchPage', page)
    },
  },

  data: () => ({
    counterDanger: true,
    maxHeight: 500,

    placeholder: '',
    textContent: '', // 留言内容
    repContent: '', // 回复内容
    currMsg: null, // 当前留言
    currRep: null, // 当前回复
    currPage: 1,
    hideComment: false, // 显示 “查看更多留言”
    showComments: false,
  }),

  userId() {
    return this.$store.getters['admin/userId']
  },

  mounted() {
    const erd = elementResizeDetectorMaker()
    erd.listenTo(this.$refs.comment, (el) => {
      if (el.offsetHeight >= this.maxHeight) {
        this.hideComment = true
      } else {
        this.hideComment = false
      }
    })
  },

  methods: {
    showMoreComments() {
      this.maxHeight = 10000
      this.showComments = true
    },

    viewUserDetail(userId) {
      if (userId !== this.userId) {
        this.$router.push({
          path: '/user-detail',
          query: { userId },
        })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
body[data-theme="light"] {
  .msg {
    .name {
      color: #8b99a8;
    }
  }
  .hide-comment {
    background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
}
body[data-theme="dark"] {
  .msg {
    .name {
      color: #bfc0c6;
    }
  }
  .hide-comment {
    background-image: linear-gradient(
      rgba(51, 54, 68, 0.1) 0%,
      rgba(51, 54, 68, 1) 100%
    );
  }
}

.msg {
  .name {
    margin-right: 0.2rem;
    font-size: 0.875rem;
    font-weight: bold;
  }
  .owner {
    padding: 0.1rem 0.3rem;
    border-radius: 0.5rem;
    font-size: 0.5rem;
    font-weight: normal;
    color: rgba(var(--vs-primary), 1);
    background: rgba(var(--vs-primary), 0.15);
  }
}

.hide-comment {
  height: 60px;
  line-height: 80px;
  background-size: 200%;
  cursor: pointer;
}
</style>
