<template>
  <div class="flex">
    <div class="card card-primary">
      <div class="flex justify-between">
        <div>
          <div class="title text-primary">用户总数</div>
          <div class="num">{{ 5242 }}</div>
        </div>
        <div class="icon">
          <feather type="users"></feather>
        </div>
      </div>
      <div class="flex items-center text-sm">
        <span class="text-gray">最近一月</span>
        <div class="ml-1 flex items-center primary ">
          <feather
            size="18"
            type="arrow-up"
          ></feather>
          <span class="font-bold">4.20%</span>
        </div>
      </div>
    </div>

    <div class="card ml-4 card-success">
      <div class="flex justify-between">
        <div>
          <div class="title text-primary">今日新增</div>
          <div class="num">{{ 298 }}</div>
        </div>
        <div class="icon">
          <feather type="user-plus"></feather>
        </div>
      </div>
      <div class="flex items-center text-sm">
        <span class="text-gray">相对于昨天</span>
        <div class="ml-1 flex items-center success ">
          <feather
            size="18"
            type="arrow-up"
          ></feather>
          <span class="font-bold">2.50%</span>
        </div>
      </div>
    </div>

    <div class="card ml-4 card-danger">
      <div class="flex justify-between">
        <div>
          <div class="title text-primary">黑名单</div>
          <div class="num">{{ 125 }}</div>
        </div>
        <div class="icon">
          <feather type="user-minus"></feather>
        </div>
      </div>
      <div class="text-sm">
      </div>
    </div>

    <div
      class="card ml-4 bg-gray"
      style="padding: 0 1.25rem;"
    >
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
import VueApexCharts from 'vue-apexcharts'

const chartOptions = {
  chart: {
    type: 'donut',
  },
  dataLabels: {
    enabled: false,
  },
  labels: ['汉纸', '妹纸', '未知'],
  plotOptions: {
    pie: {
      expandOnClick: false,
    },
  },
  colors: ['#6165f7', '#EA5455', '#bbb'],
}
export default {
  name: 'UserStatistics',
  components: { VueApexCharts },

  data: () => ({
    chartOptions,
    series: [144, 80, 41],
  }),
}
</script>

<style lang="scss" scoped>
@mixin setColor($color) {
  background: rgba(var(--vs-#{$color}), 0.06);
  .num,
  .icon {
    color: rgba(var(--vs-#{$color}), 1);
  }
  .icon {
    background: rgba(var(--vs-#{$color}), 0.15);
    box-shadow: 0 0 10px rgba(var(--vs-#{$color}), 0.2);
  }
}

.card {
  width: 25%;
  padding: 1.25rem;
  border-radius: $large-radius;
  .title {
    font-size: 1.125rem;
  }
  .num {
    font-size: 1.875rem;
    font-weight: bold;
  }
  .icon {
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $large-radius;
  }
  &.card-primary {
    @include setColor($color: primary);
  }
  &.card-success {
    @include setColor($color: success);
  }
  &.card-danger {
    @include setColor($color: danger);
  }
}
</style>
