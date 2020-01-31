<template>
  <div>
    <div class="flex flex-wrap w-full">
      <!-- 卡片 1：欢迎卡片 -->
      <div class="lg:w-6/12 lg:pr-3 sm:w-full my-3 min-h-full">
        <div class="h-full text-white bg-primary-gradient radius">
          <div class="h-full relative flex flex-col justify-center items-center py-4">
            <img
              class="decore-left absolute top-0 left-0"
              width="200"
              src="@/assets/images/pages/dashboard/decore_left.png"
            >
            <img
              class="decore-right absolute top-0 right-0"
              style="user-select: none;"
              width="175"
              draggable="false"
              src="@/assets/images/pages/dashboard/decore_right.png"
            >
            <div
              class="flex justify-center items-center rounded-full"
              style="width: 4.5rem; height: 4.5rem; background: rgba(var(--vs-primary), 0.5);"
            >
              <AwardIcon
                stroke-width="1.8px"
                size="1.8x"
              ></AwardIcon>
            </div>
            <p class="my-4 text-2xl font-medium">欢迎你，{{ nickname }}</p>
          </div>
        </div>
      </div>
      <!-- 卡片 2：用户数统计卡片 -->
      <div class="lg:w-3/12 lg:pl-3 lg:pr-3 sm:w-1/2 sm:pr-3 my-3">
        <div class="h-full bg-semi radius light-shadow overflow-hidden">
          <area-chart
            statistic="2.5K"
            label="用户数"
            icon="UserIcon"
            color="primary"
            type="area"
            :chartData="subscribersGained"
          >
            <UsersIcon
              slot="icon"
              class="primary"
            />
          </area-chart>
        </div>
      </div>
      <!-- 卡片 3：交易量统计卡片 -->
      <div class="lg:w-3/12 lg:pl-3 sm:w-1/2 sm:pl-3 my-3">
        <div class="h-full bg-semi radius light-shadow overflow-hidden">
          <area-chart
            statistic="9K"
            label="交易量"
            icon="el-icon-finished"
            color="warning"
            type="area"
            :chartData="ordersRecevied"
          >
            <PocketIcon
              slot="icon"
              class="warning"
            />
          </area-chart>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap w-full">
      <!-- 卡片 4 -->
      <div class="lg:w-1/2 lg:pr-3 sm:w-full my-3">
        <div class="p-6 bg-semi radius base-shadow">
          <div class="flex">
            <div class="w-full lg:w-1/2 xl:w-1/2 flex flex-col justify-between pr-4">
              <div>
                <div class="mb-1 text-primary text-2xl font-bold">2.7K</div>
                <span class="font-medium text-semi">平均交易额</span>
                <p class="mt-2 text-xl text-semi font-medium">
                  最近7天<span class="success"> +5.2%</span>
                </p>
              </div>
              <vs-button
                icon="chevron_right"
                icon-after
                class="w-full lg:mt-0 mt-4"
              >查看详细</vs-button>
            </div>
            <div class="w-full lg:w-1/2 xl:w-1/2 flex flex-col lg:mb-0 mb-base px-2">
              <vue-apex-charts
                type="bar"
                height="200"
                :options="salesBar.chartOptions"
                :series="salesBar.series"
              />
            </div>
          </div>
          <vs-divider class="my-6"></vs-divider>
          <div>
            <div class="flex">
              <div class="w-1/2 mb-3 pr-4">
                <p class="text-gray">收入: ￥100000</p>
                <vs-progress
                  class="block mt-1"
                  :percent="50"
                  color="primary"
                ></vs-progress>
              </div>
              <div class="w-1/2 mb-3 pl-4">
                <p class="text-gray">用户: 100K</p>
                <vs-progress
                  class="block mt-1"
                  :percent="60"
                  color="warning"
                ></vs-progress>
              </div>
            </div>
            <div class="flex">
              <div class="w-1/2 mb-3 pr-4">
                <p class="text-gray">Retention: 90%</p>
                <vs-progress
                  class="block mt-1"
                  :percent="70"
                  color="danger"
                ></vs-progress>
              </div>
              <div class="w-1/2 mb-3 pl-4">
                <p class="text-gray">Duration: 1yr</p>
                <vs-progress
                  class="block mt-1"
                  color="success"
                  :percent="90"
                ></vs-progress>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 卡片 5 -->
      <div class="lg:w-1/2 lg:pl-3 sm:w-full my-3">
        <div class="h-full py-3 px-4 base-shadow bg-semi radius overflow-hidden">
          <p class="mb-2 text-primary text-xl font-bold">任务追踪</p>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { AwardIcon, UsersIcon, PocketIcon } from 'vue-feather-icons'
import VueApexCharts from 'vue-apexcharts'
import AreaChart from '@/components/AreaChart.vue'
import { subscribersGained, ordersRecevied, salesBar } from './chart-data'

export default {
  name: 'Analytics',
  components: {
    VueApexCharts,
    AreaChart,
    AwardIcon,
    UsersIcon,
    PocketIcon,
  },

  data: () => ({
    subscribersGained,
    ordersRecevied,
    salesBar,
  }),

  computed: {
    ...mapState({
      nickname: state => state.admin.info.nickname,
    }),
  },

  methods: {
  },
}
</script>

<style lang="scss" scoped>
@media (max-width: 576px) {
  .decore-left,
  .decore-right {
    width: 140px;
  }
}
</style>
