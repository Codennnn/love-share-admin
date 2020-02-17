<template>
  <div class="pt-6">
    <div class="flex">
      <div class="mr-6 p-4 radius bg-semi light-shadow">
        <h3 class="text-primary text-xl font-bold">线上热门搜索</h3>
        <div class="flex">
          <area-chart
            class="mr-4"
            no-icon
            statistic="2,453"
            label="搜索用户数"
            :options="subscribersGained.chartOptions"
            :series="subscribersGained.series"
          >
          </area-chart>
          <area-chart
            no-icon
            statistic="2.5K"
            label="人均搜索次数"
            :options="ordersRecevied.chartOptions"
            :series="ordersRecevied.series"
          >
          </area-chart>
        </div>
        <div>
          <vs-table
            pagination
            noDataText="暂无数据"
            :max-items="5"
            :data="keywordList"
          >i
            <template slot="thead">
              <vs-th>排名</vs-th>
              <vs-th sort-key="word">关键词</vs-th>
              <vs-th sort-key="count">次数</vs-th>
              <vs-th sort-key="user_num">用户数</vs-th>
              <vs-th sort-key="increase">周涨幅</vs-th>
            </template>

            <template slot-scope="{data}">
              <vs-tr
                v-for="tr in data"
                :key="tr.rank"
                :data="tr"
              >
                <vs-td>{{ tr.rank }}</vs-td>
                <vs-td>{{ tr.word }}</vs-td>
                <vs-td>{{ tr.count }}</vs-td>
                <vs-td>{{ tr.user_num }}</vs-td>
                <vs-td>{{ tr.increase }}%</vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>

      <div class="p-4 flex-1 radius bg-semi light-shadow">
        <h3 class="mb-5 text-primary text-xl font-bold">销售额类别占比</h3>
        <div
          class="flex justify-center"
          style="height: 18rem;"
        >
          <vue-apex-charts
            height="100%"
            width='100%'
            type="donut"
            :options="chartOptions"
            :series="series"
          ></vue-apex-charts>
        </div>
        <div class="flex-col-center">
          <ul>
            <li
              class="mb-2 flex items-center"
              v-for="(it, i) in items"
              :key="i"
            >
              <span
                class="w-3 h-3 mr-4 rounded-full"
                :style="{background: it.color}"
              ></span>
              <span class="text-primary">{{ it.text }}</span>
              <span class="mx-6 text-gray">{{ it.rate }}%</span>
              <span class="text-primary font-bold">￥{{ it.amount }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="py-4 flex">
      <vue-apex-charts
        class="flex-1"
        type="bar"
        height="320"
        :options="salesMonthBar.chartOptions"
        :series="salesMonthBar.series"
      />
      <div class="w-1/3 p-6">
        <h4 class="mb-4 text-lg text-primary">各高校销售排行</h4>
        <ul>
          <li
            class="mb-2 flex items-center text-gray text-sm"
            v-for="(s, i) in schools"
            :key="i"
          >
            <span>{{ i + 1 }}</span>
            <div class="w-40 mx-4 truncate text-semi">{{ s.name }}</div>
            <span>￥{{ s.amount }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import AreaChart from '@/components/AreaChart.vue'
import {
  subscribersGained, ordersRecevied, salesMonthBar, keywordList,
} from '@/utils/mock-data'

const items = [
  {
    color: '#6165f7', text: '电子数码', rate: 28.79, amount: 4544,
  },
  {
    color: '#28C76F', text: '宿舍电器', rate: 21.04, amount: 3321,
  },
  {
    color: '#EA5455', text: '日常用品', rate: 19.73, amount: 3113,
  },
  {
    color: '#FF9F43', text: '图书书籍', rate: 14.83, amount: 2341,
  },
  {
    color: '#718096', text: '服饰鞋包', rate: 7.80, amount: 1231,
  },
  {
    color: '#525465', text: '其它类别', rate: 7.80, amount: 1231,
  },
]
const schools = [
  { name: '中山大学', amount: 4521 },
  { name: '暨南大学', amount: 4521 },
  { name: '汕头大学', amount: 4521 },
  { name: '华南理工大学', amount: 4521 },
  { name: '岭南师范学院', amount: 4521 },
  { name: '广东白云学院', amount: 4521 },
  { name: '广州大学华软软件学院', amount: 4521 },
  { name: '广东警官学院', amount: 4521 },
]
const chartOptions = {
  chart: {
    type: 'donut',
  },
  legend: { show: false },
  dataLabels: { enabled: false },
  labels: ['电子数码', '宿舍电器', '日常用品', '图书书籍', '服饰鞋包', '其它'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            fontSize: '13px',
          },
          value: {
            fontSize: '25px',
            formatter: v => `￥${v}`,
          },
          total: {
            show: true,
            showAlways: true,
            label: '销售额',
            formatter: w => `￥${w.globals.seriesTotals.reduce((a, b) => a + b, 0)}`,
          },
        },
      },
    },
  },
  colors: ['#6165f7', '#28C76F', '#EA5455', '#FF9F43', '#718096', '#525465'],
}
export default {
  name: 'Monitor',
  components: { VueApexCharts, AreaChart },

  data: () => ({
    items,
    schools,
    chartOptions,
    series: [4544, 3321, 3113, 2341, 1231, 1231],
    subscribersGained,
    ordersRecevied,
    keywordList,
    salesMonthBar,
  }),
}
</script>
