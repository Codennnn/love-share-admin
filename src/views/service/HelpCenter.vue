<template>
  <div class="mt-4 flex items-start">
    <!-- 栏目 -->
    <div class="w-1/5">
      <VuePerfectScrollbar
        class="scroll-area"
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
            <ul class="ml-2 text-semi">
              <li
                class="mb-2"
                v-for="(article, j) in guide.articles"
                :key="j"
                @click="getArticle(guide._id, article._id)"
              >
                {{ article.title }}
              </li>
              <li class="add-article opacity-0 primary">添加文章</li>
            </ul>
          </vs-collapse-item>
        </vs-collapse>
      </VuePerfectScrollbar>

      <div>
        <el-popover
          placement="top"
          trigger="click"
        >
          <vs-input
            v-model="payload.section"
            placeholder="栏目名称"
          />
          <vs-input
            v-model="payload.articles[0].title"
            placeholder="文章标题"
          />
          <vs-button
            slot="reference"
            class="mt-4"
            type="border"
            @click="createGuide()"
          >
            <i class="el-icon-plus"></i>
            添加栏目
          </vs-button>
        </el-popover>
      </div>
    </div>

    <!-- 内容 -->
    <div
      class="w-4/5 pl-6"
      style="height: 550px;"
    >
      <div class="article-container h-full p-4 bg-gray rounded-lg vs-con-loading__container">
        <div class="flex items-center justify-between">
          <div v-if="!showEditor">
            <div class="text-semi text-xl font-bold">{{ article.title }}</div>
            <p class="text-gray text-sm">
              最后更新于{{ $dayjs(article.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
            </p>
          </div>

          <div v-else>
            <vs-input
              label="标题"
              v-model="editData.title"
            />
          </div>

          <div v-if="!showEditor">
            <vs-button
              class="text-sm"
              @click="onEditArticle()"
            >编辑</vs-button>
            <el-popover
              placement="bottom"
              trigger="click"
            >
              <p class="text-center">删除后将无法恢复</p>
              <div class="text-center">
                <vs-button
                  size="small"
                  type="flat"
                  color="danger"
                  @click="onDeleteArticle()"
                >确认删除</vs-button>
              </div>
              <i
                slot="reference"
                title="删除"
                class="el-icon-delete ml-4 text-gray cursor-pointer"
              ></i>
            </el-popover>
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
              @click="onUpdateArticle()"
            >完成编辑</vs-button>
          </div>
        </div>
        <vs-divider />

        <VuePerfectScrollbar
          style="height: 420px;"
          :settings="{
            maxScrollbarLength: 160,
            wheelSpeed: 0.60,
          }"
        >
          <div
            v-if="!article.content || article.content.length <= 0 && !showEditor"
            class="h-full flex flex-col justify-center items-center text-gray-400"
          >
            <i class="el-icon-warning-outline text-4xl"></i>
            <p class="mt-2 text-sm">未添加内容</p>
          </div>

          <div
            v-if="!showEditor"
            v-html="article.content"
            class="text-semi"
          ></div>
          <div v-else>
            <vue-editor v-model="editData.content" />
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
  getGuideList, createGuide, getArticle, addArticle, updateArticle, deleteArticle,
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
    editData: {
      title: '',
      content: '',
    },
    title: '',
    content: '',
  }),

  created() {
    this.getGuideList()
  },

  methods: {
    async getGuideList() {
      const { code, data } = await getGuideList()
      if (code === 2000) {
        this.guideList = data.guide_list
        const section = this.guideList[0]
        this.getArticle(section._id, section.articles[0]._id)
      }
    },

    async createGuide() {
      const { section, articles } = this.payload
      if (section.length > 0 && articles[0].title.length > 0) {
        const flag = this.guideList.some(async (el) => {
          if (el.section === section) {
            await addArticle({
              section_id: el._id,
              title: articles[0].title,
            })
            return true
          }
          return false
        })
        if (!flag) {
          await createGuide(this.payload)
        }
        this.getGuideList()
      }
    },

    async getArticle(section_id, article_id) {
      this.$vs.loading({
        container: '.article-container',
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
        this.$vs.loading.close('.article-container > .con-vs-loading')
      }
    },

    onEditArticle() {
      this.showEditor = true
      this.editData = JSON.parse(JSON.stringify(this.article))
    },

    async onUpdateArticle() {
      const { code } = await updateArticle(this.editData)
      if (code === 2000) {
        this.showEditor = false
        this.getGuideList()
      }
    },

    async onDeleteArticle() {
      const { code } = await deleteArticle({ article_id: this.article._id })
      if (code === 2000) {
        this.getGuideList()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/theme/_themeify.scss";

@include themeify {
  .scroll-area {
    background: themed("bg-color-gray");
    .vs-collapse-item {
      .vs-collapse-item--header {
        div {
          color: themed("text-color-primary");
        }
      }
    }
  }
}

.section {
  .vs-collapse-item {
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
