<template>
  <vue-apex-charts
    ref="lineChart"
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
  name: 'LineChart',
  components: { VueApexCharts },

  props: {
    type: {
      type: String,
      default: 'line',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
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

  methods: {
    downloadPNG() {
      this.$refs.lineChart.dataURI().then((uri) => {
        this.$emit('downloadPNG', uri)
      })
    },
  },
}
</script>
