<template>
  <vue-apex-charts
    ref="lineChart"
    :type="settings.type"
    :width="settings.width"
    :height="settings.height"
    :options="settings.chartOptions"
    :series="settings.series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'LineChart',
  components: { VueApexCharts },

  props: {
    settings: {
      type: Object,
      required: true,
    },
  },

}
</script>
