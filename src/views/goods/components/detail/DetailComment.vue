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
            <vs-avatar :src="`${cm.sender.avatar_url}?imageView2/2/w/50`"></vs-avatar>
            <p class="name ml-1">
              {{ cm.sender.nickname }}
            </p>
            <p
              v-if="cm.sender._id === owner"
              class="owner ml-1"
            >主人</p>
            <p class="ml-2 text-xs text-gray">
              {{ timeDiff(cm.created_at) }}
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
                <span class="name cursor-pointer">
                  {{ it.sender.nickname }}
                  <span
                    v-if="it.sender._id === owner"
                    class="owner"
                  >主人</span>
                </span>
                <span class="mx-1 text-gray">回复</span>
                <span class="name cursor-pointer">
                  {{ it.at.nickname }}
                  <span
                    v-if="it.at._id === owner"
                    class="owner"
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
      class="mt-6 p-2 text-center text-sm text-gray-500 bg-gray-100 rounded-lg"
    >
      还没有留言，快来抢沙发吧！
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
import { timeDiff } from '@/utils/util'

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
    timeDiff,
    counterDanger: true,
    maxHeight: 550,

    placeholder: '',
    textContent: '', // 留言内容
    repContent: '', // 回复内容
    currMsg: null, // 当前留言
    currRep: null, // 当前回复
    currPage: 1,
    hideComment: false, // 显示 “查看更多留言”
    showComments: false,
  }),

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

  deactivated() {
    this.maxHeight = 595
    this.showComments = false
  },

  methods: {
    showMoreComments() {
      this.maxHeight = 10000
      this.showComments = true
    },
  },
}
</script>

<style lang="scss" scoped>
.msg {
  .name {
    // color: #718096;
    font-size: 0.875rem;
    font-weight: bold;
  }
  .owner {
    padding: 0.1rem 0.3rem;
    border-radius: 0.5rem;
    font-size: 0.6rem;
    font-weight: normal;
    color: rgba(var(--vs-primary), 1);
    background: rgba(var(--vs-primary), 0.15);
  }
  .reply {
    top: 6px;
    right: -30px;
    font-size: 0.9rem;
    // color: #999;
    transition: all 0.3s;
    opacity: 0;
  }
  &:hover {
    .reply {
      right: 8px;
      opacity: 1;
      &:hover {
        color: rgba(var(--vs-primary), 0.9);
      }
    }
  }
}

.hide-comment {
  height: 60px;
  line-height: 80px;
  background-size: 200%;
  transition: background-position 0.5s linear;
  cursor: pointer;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  &:hover {
    background-position: 100% 0;
    background-image: linear-gradient(
      rgba(231, 238, 255, 0) 0%,
      rgba(231, 238, 255, 1) 100%
    );
  }
}
</style>
