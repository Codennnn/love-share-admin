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

      <div>
        <ul>
          <li
            class="billboard-item relative mb-4 p-3 flex radius bg-gray overflow-hidden
             vs-con-loading__container"
            v-for="(it, i) in billboardList"
            :key="i"
            :id="`billboard-item-${i}`"
          >
            <el-image
              class="mr-3 rounded-lg"
              style="width: 100px; height: 100px"
              :src="it.url"
              :preview-src-list="[it.url]"
            >
            </el-image>
            <div class="text-sm">
              <div class="text-semi">URL：{{ it.url }}</div>
              <div class="text-semi">上传时间：{{ $dayjs(it.created_at).format('YYYY-MM-DD') }}</div>
            </div>
            <div
              class="close-icon absolute flex-row-center text-primary cursor-pointer"
              @click="deleteBillboard(it.url, i)"
            >
              <XIcon
                size="1.2x"
                stroke-width="2.5px"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="w-1/2 pl-8">
      <vs-upload
        multiple
        ref="fileUpload"
        action="/api/billboard/upload"
        text="图片上传（JPG、PNG）"
        fileName="img"
        accept="image/jpeg,image/jpg,image/png"
        :limit="6"
        :headers="headers"
        @on-success="successUpload"
      />
    </div>
  </div>
</template>

<script>
import { XIcon } from 'vue-feather-icons'
import { getToken } from '@/permission/token'

import { getBillboardList, deleteBillboard } from '@/request/api/billboard'

export default {
  name: 'Billboard',
  components: { XIcon },

  data: () => ({
    billboardList: [],
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
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

    async deleteBillboard(url, i) {
      this.$vs.loading({
        container: `#billboard-item-${i}`,
        scale: 1,
      })

      try {
        const { code } = await deleteBillboard({ url })
        if (code === 2000) {
          this.getBillboardList()
        }
      } finally {
        this.$vs.loading.close(`#billboard-item-${i} > .con-vs-loading`)
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

.billboard-item {
  .close-icon {
    top: 0.75rem;
    right: -50px;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 0.35rem;
    background: rgba(186, 187, 192, 0.2);
    transition: all 0.2s;
    opacity: 0;
    &:hover {
      border-radius: 50%;
      color: white;
      background: rgba(var(--vs-danger), 0.8);
    }
  }
  &:hover {
    .close-icon {
      right: 0.75rem;
      opacity: 1;
    }
  }
}
</style>
