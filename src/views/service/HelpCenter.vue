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
              <vs-dropdown>
                <i class="el-icon-more ml-1 text-xs text-light"></i>
                <vs-dropdown-menu>
                  <vs-dropdown-item @click="visible1 = true, payload.section = guide.section,
                   createGuide()">
                    添加文章
                  </vs-dropdown-item>
                  <vs-dropdown-item>
                    编辑栏目
                  </vs-dropdown-item>
                  <vs-dropdown-item
                    divider
                    v-if="guide.articles.length <= 0"
                    class="danger"
                    @click="deleteGuide(guide._id)"
                  >
                    删除栏目
                  </vs-dropdown-item>
                </vs-dropdown-menu>
              </vs-dropdown>
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
            </ul>
          </vs-collapse-item>
        </vs-collapse>
      </VuePerfectScrollbar>

      <div>
        <el-popover
          placement="top"
          trigger="manual"
          v-model="visible1"
        >
          <div>
            <div class="mb-2 flex justify-end">
              <i
                class="el-icon-close text-lg cursor-pointer"
                @click="visible1 = false"
              ></i>
            </div>
            <vs-input
              class="mb-4"
              v-model="payload.section"
              placeholder="栏目名称"
            />
            <vs-input
              v-model="payload.articles[0].title"
              placeholder="文章标题"
            />
            <vs-button
              class="mt-4 mb-3 w-full radius"
              @click="createGuide()"
            >添加</vs-button>
          </div>

          <div
            slot="reference"
            class="mt-5 w-full flex justify-center"
          >
            <div
              class="py-1 px-2 flex-row-center bg-primary radius text-white cursor-pointer"
              style="width: 11rem; font-size: 0.9rem;"
              @click="visible1 = true"
            >
              <div class="flex-1 text-center">
                添加栏目
              </div>
              <div
                class="ml-auto w-8 h-8 flex-row-center rounded-lg"
                style="background: rgba(121, 131, 255);"
              >
                <feather
                  size="20"
                  type="plus"
                ></feather>
              </div>
            </div>
          </div>
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
            <p class="text-gray text-xs">
              最后更新于 {{ $dayjs(article.updated_at).format('YYYY年M月DD日 HH:mm:ss') }}
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
              v-model="visible2"
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
              <span
                slot="reference"
                class="ml-2 danger text-sm cursor-pointer"
              >删除</span>
            </el-popover>
          </div>
          <div v-else>
            <vs-button @click="onUpdateArticle()">完成编辑</vs-button>
            <span
              class="ml-2 danger text-sm cursor-pointer"
              @click="showEditor = false"
            >
              取消
            </span>
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
            v-if="(!article.content && !showEditor) || (article.content.length <= 0 && !showEditor)"
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
  getGuideList, createGuide, getArticle, addArticle, deleteGuide, updateArticle, deleteArticle,
} from '@/request/api/guide'

// [
//   {
//     title: '购物指南',
//     submenus: [
//       { title: '用户协议' },
//       { title: '交易条款' },
//       { title: '购物流程' },
//     ],
//   },
//   {
//     title: '支付问题',
//     submenus: [
//       { title: '支付流程' },
//       { title: '在线支付' },
//       { title: '货到付款' },
//     ],
//   },
//   {
//     title: '售后服务',
//     submenus: [
//       { title: '售后政策（三方）' },
//       { title: '退换货申请' },
//       { title: '售后常见问题' },
//     ],
//   },
//   {
//     title: '账户及会员',
//     submenus: [
//       { title: '账户安全与账户信息' },
//       { title: '账户资产' },
//       { title: '会员介绍' },
//     ],
//   },
// ]
export default {
  name: 'HelpCenter',
  components: { VueEditor, VuePerfectScrollbar },

  data: () => ({
    guideList: [],
    article: {}, // 当前显示的文章
    payload: { // 新建栏目数据源
      section: '',
      articles: [{ title: '', content: '' }],
    },
    visible1: false,
    visible2: false,

    showEditor: false,
    editData: {
      title: '',
      content: '',
    },
    title: '',
    content: '',
  }),

  watch: {
    visible1(v) {
      // 隐藏 “新建栏目” 时重置数据源
      if (!v) {
        this.payload = { section: '', articles: [{ title: '', content: '' }] }
      }
    },
  },

  created() {
    this.getGuideList()
  },

  methods: {
    // 获取指引列表
    async getGuideList() {
      const { code, data } = await getGuideList()
      if (code === 2000) {
        this.guideList = data.guide_list
        const { _id, articles } = this.guideList.find(el => el.articles?.length > 0)
        this.getArticle(_id, articles[0]._id)
      }
    },

    // 创建指引栏目
    async createGuide() {
      const { section, articles } = this.payload
      if (section.length > 0 && articles[0].title.length > 0) {
        const filter = this.guideList.filter(el => el.section === section)
        if (filter.length > 0) {
          await addArticle({
            section_id: filter[0]._id,
            title: articles[0].title,
          })
        } else {
          await createGuide(this.payload)
        }

        this.getGuideList()
        this.visible1 = false
      }
    },

    // 删除指引栏目
    async deleteGuide(section_id) {
      const { code } = await deleteGuide({ section_id })
      if (code === 2000) {
        this.getGuideList()
      }
    },

    // 获取文章
    async getArticle(section_id, article_id) {
      this.showEditor = false
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

    // 点击编辑文章
    onEditArticle() {
      this.showEditor = true
      this.editData = JSON.parse(JSON.stringify(this.article))
    },

    // 更新文章
    async onUpdateArticle() {
      if (this.editData.content.length > 0) {
        const { code } = await updateArticle(this.editData)
        if (code === 2000) {
          await this.getGuideList()
          this.showEditor = false
        }
      }
    },

    // 删除文章
    async onDeleteArticle() {
      const { code } = await deleteArticle({ article_id: this.article._id })
      if (code === 2000) {
        this.getGuideList()
        this.visible2 = false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
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
