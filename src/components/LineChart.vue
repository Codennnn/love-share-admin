<template>
  <vue-apex-charts
    ref="lineChart"
    :type="type"
    :options="chartData.chartOptions"
    :series="chartData.series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'LineChart',
  components: { VueApexCharts },

  props: {
    chartData: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: 'line',
    },
  },

}
</script>
