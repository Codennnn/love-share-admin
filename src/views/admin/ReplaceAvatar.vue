<template>
  <vs-popup
    class="avatar-popup"
    title="更换头像"
    :active.sync="showPopup"
  >
    <div>
      <div class="flex flex-col justify-center items-center">
        <vueCropper
          ref="cropper"
          style="width: 300px; height: 300px;"
          outputType="jpeg"
          :info="false"
          :outputSize="0.8"
          :canMove="false"
          :canMoveBox="true"
          :canScale="true"
          :autoCrop="true"
          :centerBox="true"
          :fixed="true"
          :infoTrue="true"
          :img="avatarBase64"
        ></vueCropper>

        <!-- 警告框 -->
        <div class="w-full">
          <vs-alert
            closable
            close-icon="close"
            color="danger"
            :active.sync="showAlert"
          >
            图片上传失败，请重试！
          </vs-alert>
        </div>

        <div class="text-center">
          <vs-button
            class="mb-4"
            type="flat"
            @click="$refs.fileInput.click()"
          >选择图片</vs-button>
          <input
            ref="fileInput"
            style="display: none;"
            type='file'
            accept="image/jpeg,image/jpg,image/png"
            @change="getImage"
          />
        </div>

        <vs-button
          id="replaceBtn"
          class="w-full mt-4 vs-con-loading__container"
          :disabled="btnDisable"
          @click="onReplace()"
        >确认更换</vs-button>
      </div>
    </div>
  </vs-popup>
</template>

<script>
import { VueCropper } from 'vue-cropper'

import { replaceAvatar } from '@/request/api/admin'

export default {
  name: 'ReplaceAvatar',
  components: { VueCropper },

  props: {
    popupActive: {
      type: Boolean,
      required: true,
    },
  },

  watch: {
    popupActive(active) {
      if (active) {
        this.showPopup = true
      }
    },
  },

  computed: {
    showPopup: {
      get() {
        return this.popupActive
      },
      set(active) {
        if (!active) {
          this.$emit('closePopup')
        }
      },
    },
  },


  data: () => ({
    avatarBase64: '',
    avatarUrl: '',
    btnDisable: false,
    showAlert: false,
  }),

  methods: {
    getImage({ target: { files } }) {
      const isLt4M = ((files[0].size / 1024 / 1024) < 2)
      if (!isLt4M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return
      }
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = ({ target: { result } }) => {
        this.avatarBase64 = result
      }
    },

    onReplace() {
      this.$refs.cropper.getCropBlob(async (blob) => {
        const filename = `${Date.now()}.${blob.type.split('/')[1]}`
        const formData = new FormData()
        formData.append('avatar', blob, filename)

        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#replaceBtn',
          scale: 0.45,
        })
        this.btnDisable = true

        try {
          const { code, data } = await replaceAvatar(formData)
          if (code === 2000) {
            this.avatarUrl = data.avatar_url
            this.$store.commit('admin/SET_AVATAR', data.avatar_url)
            this.$vs.notify({
              time: 3000,
              title: '图片上传成功',
              text: '头像已更换',
              color: 'success',
            })
            this.showPopup = false
          } else if (code === 3000 || code === 4003 || code === 5000) {
            this.showAlert = true
          }
        } catch {
          this.showAlert = true
        } finally {
          this.$vs.loading.close('#replaceBtn > .con-vs-loading')
          this.btnDisable = false
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar-popup::v-deep {
  .vs-popup {
    width: initial;
    .vs-popup--content {
      margin: 0;
      padding: 20px 13px 20px 16px;
    }
  }
}
</style>
