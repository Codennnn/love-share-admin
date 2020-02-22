<template>
  <div>
    <vs-table
      search
      pagination
      class="p-3"
      noDataText="暂无数据"
      :max-items="10"
      :data="templateList"
    >
      <template slot="thead">
        <vs-th>名称</vs-th>
        <vs-th>状态</vs-th>
        <vs-th>操作</vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr
          v-for="(tr, i) in data"
          :key="i"
          :data="tr"
        >
          <vs-td class="text-base text-gray font-bold">{{ tr.name }} </vs-td>
          <vs-td :class="status[tr.status].color">{{ status[tr.status].text }}</vs-td>
          <vs-td>
            <span @click.stop="showPopup = true">编辑模板</span>
          </vs-td>
        </vs-tr>
      </template>
    </vs-table>

    <vs-popup
      class="avatar-popup"
      title="编辑模板"
      :active.sync="showPopup"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="form"
      >
        <el-form-item
          class="flex"
          label="昵称"
        >
          <div class="w-64">
            <el-input
              placeholder="只能是中文、字母、数字"
              v-model="form.name"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item
          class="flex"
          label="系统模板"
        >
          <div class="flex flex-col">
            <div class="mb-2">
              <vs-chip>{用户昵称}</vs-chip>
              <vs-chip>{用户账号}</vs-chip>
              <vs-chip>{充值金额}</vs-chip>
            </div>
            <div>
              <vs-textarea
                class="w-10/12"
                label="任务描述"
                v-model="form.content"
                :height="String(180)"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </vs-popup>
  </div>
</template>

<script>
// 模拟
const templates = [
  { name: '确认订单', status: 1 },
  { name: '付款成功', status: 1 },
  { name: '订单发货', status: 2 },
  { name: '充值成功', status: 1 },
]
const status = {
  1: { color: 'success', text: '已启用' },
  2: { color: 'danger', text: '已禁用' },
}
export default {
  name: 'MessageTemplate',
  data: () => ({
    status,
    templateList: [],
    form: {
      name: '',
      content: '尊敬的{用户昵称}，您已成功充值{充值金额}！如您还有疑问，请与客服人员联系。',
    },
    showPopup: false,
  }),

  created() {
    this.templateList = templates
  },
}
</script>

<style lang="scss" scoped>
.el-form-item::v-deep {
  display: flex;
  .el-form-item__content {
    flex: 1;
    margin-left: 0.5rem !important;
    line-height: inherit;
  }
}
</style>
