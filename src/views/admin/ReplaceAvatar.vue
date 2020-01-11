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
            {{ alertText }}
          </vs-alert>
        </div>

        <div class="text-center">
          <vs-button
            class="my-1"
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
          class="w-full vs-con-loading__container"
          :disabled="btnDisable"
          @click="onReplace()"
        >确认更换</vs-button>
      </div>
    </div>
  </vs-popup>
</template>

<script>
import { VueCropper } from 'vue-cropper'

import { uploadAvatar, replaceAvatar } from '@/request/api/admin'

export default {
  name: 'ReplaceAvatar',
  components: { VueCropper },

  props: {
    adminId: String,
    popupActive: {
      type: Boolean,
      required: true,
    },
  },

  data: () => ({
    avatarBase64: '',
    avatarUrl: '',
    btnDisable: false,
    showAlert: false,
    alertText: '',
  }),

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

  watch: {
    popupActive(active) {
      if (active) {
        this.showPopup = true
      }
    },
  },

  methods: {
    onShowAlert(text) {
      this.showAlert = true
      this.alertText = text
    },

    getImage({ target: { files } }) {
      if (files) {
        const isLt2M = ((files[0].size / 1024 / 1024) < 2)
        if (!isLt2M) {
          this.onShowAlert('图片大小不能超过 2MB！')
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = ({ target: { result } }) => {
          this.avatarBase64 = result
        }
      }
    },

    onReplace() {
      this.$refs.cropper.getCropBlob(async (blob) => {
        const filename = `${Date.now()}.${blob.type.split('/')[1]}`
        const formData = new FormData()
        formData.append('avatar', blob, filename)
        formData.append('id', this.adminId)

        this.$vs.loading({
          background: 'primary',
          color: '#fff',
          container: '#replaceBtn',
          scale: 0.45,
        })
        this.btnDisable = true

        try {
          const { code, data: { avatar_url } } = await uploadAvatar(formData)
          if (code === 2000) {
            const res = await replaceAvatar({ admin_id: this.adminId, avatar_url })
            if (res.code === 2000) {
              this.avatarUrl = avatar_url
              if (this.adminId === this.$store.getters['admin/adminId']) {
                this.$emit('updateInfo')
                this.$store.commit('admin/SET_AVATAR', avatar_url)
              }
              this.$vs.notify({
                time: 3000,
                title: '图片上传成功',
                text: '头像已更换',
                color: 'success',
              })
              this.showPopup = false
            }
          } else if (code === 3000 || code === 4003 || code === 5000) {
            this.showAlert = true
          }
        } catch {
          this.onShowAlert('图片上传失败，请重试！')
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
