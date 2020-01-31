<template>
  <div class="flex">
    <div
      class="card w-64 flex justify-between"
      style="background: rgba(var(--vs-primary), 0.06);"
    >
      <div>
        <div class="text-primary">今日新增</div>
        <div class="text-3xl primary font-bold">{{ 298 }}</div>
      </div>
      <div
        class="w-12 h-12 flex-row-center radius"
        style="background: rgba(var(--vs-primary), 0.15);
           box-shadow: 0 0 10px rgba(var(--vs-primary), 0.2);"
      >
        <UserPlusIcon class="primary" />
      </div>
    </div>

    <div class="card ml-4 bg-gray">
      <vue-apex-charts
        ref="apexChart"
        height="100%"
        width='100%'
        type="donut"
        :options="chartOptions"
        :series="series"
      ></vue-apex-charts>
    </div>
  </div>
</template>

<script>
import { UserPlusIcon } from 'vue-feather-icons'
import VueApexCharts from 'vue-apexcharts'

const chartOptions = {
  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
      },
      legend: {
        position: 'bottom',
      },
    },
  }],
  colors: ['#6165f7'],
}
export default {
  name: 'UserStatistics',
  components: {
    UserPlusIcon, VueApexCharts,
  },

  data: () => ({
    chartOptions,
    series: [44, 55, 41],
  }),
}
</script>

<style lang="scss" scoped>
.card {
  width: 16rem;
  padding: 1.25rem;
  border-radius: $large-radius;
}
</style>
