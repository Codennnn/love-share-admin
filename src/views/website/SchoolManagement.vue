<template>
  <div class="pt-6">
    <vs-table
      search
      pagination
      class="p-3"
      noDataText="暂无数据"
      :max-items="10"
      :data="schoolList"
    >
      <template slot="header">
        <el-upload
          ref="upload"
          action="/"
          :show-file-list="false"
          :auto-upload="false"
          :on-change="importExcel"
        >
          <vs-button slot="trigger">导入数据</vs-button>
        </el-upload>
      </template>
      <template slot="thead">
        <vs-th sort-key="name">学校名称</vs-th>
        <vs-th sort-key="code">学校标识码</vs-th>
        <vs-th sort-key="location">所在地</vs-th>
        <vs-th sort-key="level">办学层次</vs-th>
        <vs-th sort-key="created_at">注册时间</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr
          class="bg-gray"
          v-for="(tr, i) in data"
          :key="i"
          :data="tr"
        >
          <vs-td class="text-base text-gray font-bold">{{ tr.name }} </vs-td>
          <vs-td>{{ tr.code }}</vs-td>
          <vs-td>{{ tr.location }}</vs-td>
          <vs-td>{{ tr.level }}</vs-td>
          <vs-td>
            {{ $dayjs(tr.created_at).format('YYYY年M月DD日') }}
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import file2Xce from '@/vendor/Excel2Json'

import { addSchool } from '@/request/api/school'

export default {
  name: 'SchoolManagement',
  data: () => ({
  }),

  computed: {
    ...mapState(['schoolList']),
  },

  methods: {
    async importExcel(file) {
      const type = file.name.split('.')[1].toLowerCase()
      const validFileType = ['xlsx', 'xlc', 'xlm', 'xls', 'xlt', 'xlw', 'csv'].includes(type)
      if (!validFileType) {
        this.$vs.notify({
          title: '格式错误，请重新选择！',
          text: '只支持 xlsx、xlm、xls、xlt、xlw、csv 等文件格式',
          color: 'danger',
          position: 'top-right',
          time: 3500,
        })
        return
      }
      const [sheetData] = await file2Xce(file)
      if (sheetData.sheet) {
        const { code } = await addSchool({ school_list: sheetData.sheet })
        if (code === 2000) {
          this.$store.dispatch('getSchoolList')
        }
      }
    },
  },
}
</script>
