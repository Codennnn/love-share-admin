<template>
  <div class="pt-10 flex">
    <div class="w-1/2">
      <el-carousel
        class="mb-6 radius"
        arrow="always"
        :autoplay="false"
      >
        <el-carousel-item
          v-for="(it, i) in billboardList"
          :key="i"
        >
          <el-image
            class="h-full"
            fit="cover"
            :src="it.url"
          ></el-image>
        </el-carousel-item>
      </el-carousel>

      <ul>
        <li
          class="billboard-item relative mb-4 p-3 flex radius bg-gray overflow-hidden
             vs-con-loading__container"
          v-for="(it, i) in billboardList"
          :key="i"
          :id="`billboard-item-${i}`"
        >
          <el-image
            class="h-full w-48 mr-3 rounded-lg"
            :src="`${it.url}?imageView2/2/w/200`"
            :preview-src-list="[it.url]"
          >
          </el-image>
          <div class="text-sm text-semi">
            <div
              class="w-64 truncate"
              :title="it.url"
            >URL：{{ it.url }}</div>
            <div>Link：{{ it.link || '未指定' }}</div>
            <div>类型：{{ types[it.type - 1].label }}</div>
            <div class="text-semi">上传时间：{{ $dayjs(it.created_at).format('YYYY-MM-DD') }}</div>
          </div>
          <div
            title="删除"
            class="close-icon text-primary"
            @click="currDelete = i"
          >
            <feather
              size="20"
              stroke-width="2.5"
              type="x"
            ></feather>
          </div>
          <div
            title="管理"
            class="edit-icon text-primary"
            @click="showPopup = true, currEdit = $cloneDeepWith(it)"
          >
            <feather
              size="18"
              stroke-width="2"
              type="terminal"
            ></feather>
          </div>

          <div
            v-if="currDelete === i"
            class="delete-bg absolute top-0 left-0 w-full h-full flex-row-center text-primary text-sm"
          >
            <div class="absolute z-40 top-0 left-0 w-full h-full bg-main opacity-75"></div>
            <div class="relative z-50 flex-col-center">
              <p class="mb-2">
                删除后将不可恢复，请谨慎操作！
              </p>
              <div>
                <vs-button
                  color="danger"
                  size="small"
                  @click="deleteBillboard(it, i)"
                >确认删除</vs-button>
                <span
                  class="ml-2 cursor-pointer"
                  @click="currDelete = null"
                >手滑点错了</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="w-1/2 pl-8">
      <vs-upload
        multiple
        ref="fileUpload"
        action="/api/billboard/upload"
        text="图片上传（JPG、PNG）"
        fileName="billboard"
        accept="image/jpeg,image/jpg,image/png"
        :limit="6"
        :headers="headers"
        @on-success="successUpload"
      />
    </div>

    <vs-popup
      class="edit-popup"
      title="管理广告牌"
      :active.sync="showPopup"
    >
      <div class="w-full py-2 px-10 flex-col-center">
        <span class="ml-1 text-sm self-start text-primary">类型</span>
        <el-select
          class="w-full mb-3 no-dark"
          v-model="currEdit.type"
          placeholder="请选择"
        >
          <el-option
            v-for="it in types"
            :key="it.value"
            :label="it.label"
            :value="it.value"
          >
          </el-option>
        </el-select>
        <vs-input
          class="w-full mb-4 no-dark"
          label="Link"
          placeholder="请输入路由或外链链接"
          v-model="currEdit.link"
        />
        <vs-button
          class="w-full"
          @click="updateBillboard()"
        >完成修改</vs-button>
      </div>
    </vs-popup>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'

import { getBillboardList, deleteBillboard, updateBillboard } from '@/request/api/billboard'

const types = [
  { label: '普通类型', value: 1 },
  { label: '站内导航', value: 2 },
  { label: '站外链接', value: 3 },
]
export default {
  name: 'Billboard',
  data: () => ({
    types,
    billboardList: [],
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    showPopup: false,
    currDelete: null,
    currEdit: {},
  }),

  created() {
    this.getBillboardList()
  },

  methods: {
    async getBillboardList() {
      const { code, data: { billboard_list } } = await getBillboardList()
      if (code === 2000) {
        this.billboardList = billboard_list
      }
    },

    async deleteBillboard({ _id, url }, i) {
      this.$vs.loading({
        container: `#billboard-item-${i}`,
        scale: 1,
      })

      try {
        const { code } = await deleteBillboard({ _id, url })
        if (code === 2000) {
          this.getBillboardList()
        }
      } finally {
        this.currDelete = null
        this.$vs.loading.close(`#billboard-item-${i} > .con-vs-loading`)
      }
    },

    async updateBillboard() {
      const { _id, type, link } = this.currEdit
      if (type === 1 || ((type === 2 || type === 3) && link)) {
        try {
          const { code } = await updateBillboard({ _id, type, link })
          if (code === 2000) {
            this.getBillboardList()
          }
        } finally {
          this.showPopup = false
        }
      }
    },

    successUpload() {
      this.getBillboardList()
    },
  },
}
</script>

<style lang="scss" scoped>
.con-upload::v-deep {
  .con-img-upload {
    background: none;
  }
}

.edit-popup::v-deep {
  .vs-popup {
    width: 350px;
  }
}

.billboard-item {
  @mixin style {
    position: absolute;
    right: -50px;
    width: 1.8rem;
    height: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.35rem;
    background: rgba(186, 187, 192, 0.2);
    transition: all 0.2s;
    opacity: 0;
    cursor: pointer;
    &:hover {
      border-radius: 50%;
      color: white;
    }
  }
  .close-icon {
    top: 0.75rem;
    @include style();
    &:hover {
      background: rgba(var(--vs-danger), 0.8);
    }
  }
  .edit-icon {
    bottom: 0.75rem;
    @include style();
    &:hover {
      background: rgba(var(--vs-primary), 0.8);
    }
  }
  &:hover {
    .close-icon,
    .edit-icon {
      right: 0.75rem;
      opacity: 1;
    }
  }

  .delete-bg {
    animation: show 0.3s ease-out;
    @keyframes show {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  }
}
</style>

<style>
.el-select-dropdown {
  z-index: 999999 !important;
}
</style>
