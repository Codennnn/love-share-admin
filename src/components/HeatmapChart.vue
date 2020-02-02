<template>
  <vue-apex-charts
    ref="heatmapChart"
    :type="type"
    :width="width"
    :height="height"
    :options="options"
    :series="series"
  ></vue-apex-charts>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'HeatmapChart',
  components: { VueApexCharts },

  props: {
    type: {
      type: String,
      default: 'heatmap',
    },
    width: {
      type: String,
    },
    height: {
      type: String,
    },
    options: {
      type: Object,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
  },
}
</script>
