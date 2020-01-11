<template>
  <div class="mt-4 flex items-start">
    <div class="w-1/5">
      <!-- 栏目 -->
      <VuePerfectScrollbar
        class="bg-gray"
        style="height: 550px; border-radius: 0.8rem;"
        :settings="{
          maxScrollbarLength: 160,
          wheelSpeed: 0.60,
        }"
      >
        <vs-collapse class="section">
          <vs-collapse-item
            open
            v-for="(guide, i) in guideList"
            :key="i"
          >
            <div slot="header">
              {{ guide.section }}
            </div>
            <ul class="ml-2 text-bg-gray">
              <li
                class="mb-2"
                v-for="(article, j) in guide.articles"
                :key="j"
                @click="getArticle(guide._id, article._id)"
              >
                {{ article.title }}
              </li>
              <li class="add-article opacity-0 text-primary">添加文章</li>
            </ul>
          </vs-collapse-item>
        </vs-collapse>
      </VuePerfectScrollbar>

      <div>
        <vs-input
          v-model="payload.section"
          placeholder="栏目名称"
        />
        <vs-input
          v-model="payload.articles[0].title"
          placeholder="文章标题"
        />
        <vs-button
          type="border"
          @click="createGuide()"
        >
          <i class="el-icon-plus"></i>
          添加栏目
        </vs-button>
      </div>
    </div>

    <div
      id="artical-loading"
      class="vs-con-loading__container w-4/5 pl-6"
    >
      <div class="px-4 bg-white rounded-lg">
        <div class="flex items-center justify-between">
          <div
            v-if="!showEditor"
            class="text-xl font-bold"
            style="color: rgb(28, 57, 86);"
          >{{ article.title }}</div>
          <div v-else>
            <vs-input
              label="标题"
              v-model="title"
            />
          </div>
          <div v-if="!showEditor">
            <vs-button
              class="text-sm"
              @click="showEditor = true,title = article.title,content = article.content"
            >编辑</vs-button>
          </div>
          <div v-else>
            <vs-button
              class="mr-4 text-sm"
              type="border"
              color="danger"
              @click="showEditor = false"
            >取消编辑</vs-button>
            <vs-button
              class="text-sm"
              color="success"
            >完成编辑</vs-button>
          </div>
        </div>
        <vs-divider />

        <VuePerfectScrollbar
          style="height: 500px; border-radius: 0.8rem;"
          :settings="{
            maxScrollbarLength: 160,
            wheelSpeed: 0.60,
          }"
        >
          <template>
          </template>
          <template>
            <div class="h-full flex flex-col justify-center items-center text-gray-400">
              <i class="el-icon-warning-outline text-4xl"></i>
              <p class="text-sm">未添加文章</p>
            </div>
          </template>
          <div
            v-if="!showEditor"
            v-html="article.content"
          ></div>
          <div v-else>
            <vue-editor v-model="content" />
          </div>
        </VuePerfectScrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import {
  getGuideList, createGuide, addArticle, getArticle,
} from '@/request/api/guide'

const menus = [
  {
    title: '购物指南',
    submenus: [
      { title: '用户协议' },
      { title: '交易条款' },
      { title: '购物流程' },
    ],
  },
  {
    title: '支付问题',
    submenus: [
      { title: '支付流程' },
      { title: '在线支付' },
      { title: '货到付款' },
    ],
  },
  {
    title: '售后服务',
    submenus: [
      { title: '售后政策（三方）' },
      { title: '退换货申请' },
      { title: '售后常见问题' },
    ],
  },
  {
    title: '账户及会员',
    submenus: [
      { title: '账户安全与账户信息' },
      { title: '账户资产' },
      { title: '会员介绍' },
    ],
  },
]

export default {
  name: 'HelpCenter',
  components: { VueEditor, VuePerfectScrollbar },

  data: () => ({
    guideList: [],
    article: {}, // 当前显示的文章
    menus,
    payload: { // 新建栏目数据源
      section: '',
      articles: [
        {
          title: '',
          content: '',
        },
      ],
    },

    showEditor: false,
    title: '',
    content: '',
  }),

  created() {
    this.getGuideList()
  },

  methods: {
    async getGuideList() {
      try {
        const { code, data } = await getGuideList()
        if (code === 2000) {
          this.guideList = data.guide_list
        }
      } catch {
        // TODO
      }
    },

    async createGuide() {
      const { section, articles } = this.payload
      if (section.length > 0 && articles[0].title.length > 0) {
        if (this.guideList.some(el => el.section === section)) {
          const { code } = await addArticle({
            section,
            title: articles[0].title,
            content: '',
          })
          if (code === 2000) {
            this.getGuideList()
          }
        } else {
          const { code } = await createGuide(this.payload)
          if (code === 2000) {
            this.getGuideList()
          }
        }
      }
    },

    async getArticle(section_id, article_id) {
      this.$vs.loading({
        container: '#artical-loading',
        scale: 1,
      })
      try {
        const { code, data } = await getArticle({
          section_id, article_id,
        })
        if (code === 2000) {
          this.article = data.article
        }
      } finally {
        this.$vs.loading.close('#artical-loading > .con-vs-loading')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  .vs-collapse-item {
    .vs-collapse-item--header {
      div {
        color: rgb(28, 57, 86);
      }
    }
    &.open-item {
      &:hover {
        .add-article {
          opacity: 0.7;
          transition: all 0.3s;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
