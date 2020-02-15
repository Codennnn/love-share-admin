<template>
  <div class="flex flex-col justify-between h-full">
    <div class="p-6 pb-0">
      <div
        v-if="!noIcon"
        class="flex-row-center w-12 h-12 rounded-full"
        :style="{ background: `rgba(var(--vs-${color}), .15)` }"
      >
        <slot name="icon"></slot>
      </div>
      <div>
        <div class="mt-3 text-primary text-2xl font-bold">{{ num }}</div>
        <span class="text-semi">{{ label }}</span>
      </div>
    </div>
    <div>
      <vue-apex-charts
        ref="apexChart"
        height=100
        width='100%'
        :type="type"
        :options="options"
        :series="series"
      ></vue-apex-charts>
    </div>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'AreaChart',
  components: { VueApexCharts },

  props: {
    noIcon: {
      type: Boolean,
      default: false,
    },
    statistic: [Number, String],
    label: String,
    color: String,
    options: {
      type: Object,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      default: 'area',
    },
  },

  computed: {
    num() {
      if (typeof this.statistic === 'string') {
        return this.statistic
      }
      return this.statistic.toLocaleString()
    },
  },
}
</script>
