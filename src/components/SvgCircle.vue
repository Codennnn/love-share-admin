<template>
  <svg
    :height="option.size"
    :width="option.size"
    x-mlns="http://www.w3.org/200/svg"
  >
    <circle
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke="option.backColor"
      :stroke-width="option.strokeWidth"
      fill="none"
    />
    <circle
      v-for="(item, index) in arcArr"
      :key="index"
      :r="option.radius"
      :cx="option.cx"
      :cy="option.cy"
      :stroke="item.color"
      :stroke-dasharray="item.arcLength"
      :stroke-width="option.strokeWidth"
      fill="none"
      transform="rotate(-90)"
      transform-origin="center"
      stroke-linecap="round"
    />
  </svg>
</template>
<script>
export default {
  name: 'Progress',
  props: {
    progress: {
      type: Number,
      required: true,
    },
    progressOption: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    arcArr() {
      const circleLength = Math.floor(2 * Math.PI * this.option.radius)
      const progressLength = this.progress * circleLength
      const steps = 100 // 设置到100则已经比较难看出来颜色断层
      const gradientColor = (startRGB, endRGB, step) => {
        const startR = startRGB[0]
        const startG = startRGB[1]
        const startB = startRGB[2]
        const endR = endRGB[0]
        const endG = endRGB[1]
        const endB = endRGB[2]
        const sR = (endR - startR) / step // 总差值
        const sG = (endG - startG) / step
        const sB = (endB - startB) / step
        const colorArr = []
        for (let i = 0; i < step; i += 1) {
          const color = `rgb(${sR * i + startR},${sG * i + startG},${sB * i + startB})`
          colorArr.push(color)
        }
        return colorArr
      }
      const colorArr = gradientColor(this.option.startColor, this.option.endColor, steps)
      // 计算每个步进中的弧长
      const arcLengthArr = colorArr.map((color, index) => ({
        arcLength: `${index * (progressLength / 100)},100000000`,
        color,
      }))
      arcLengthArr.reverse()
      return arcLengthArr
    },
    option() {
      // 所有进度条的可配置项
      const baseOption = {
        radius: 100,
        strokeWidth: 20,
        backColor: '#E6E6E6',
        startColor: [249, 221, 180],
        endColor: [238, 171, 86], // 用于渐变色的开始
      }
      Object.assign(baseOption, this.progressOption)
      // 中心位置自动生成
      baseOption.cy = baseOption.radius + baseOption.strokeWidth
      baseOption.cx = baseOption.cy
      baseOption.size = (baseOption.radius + baseOption.strokeWidth) * 2
      return baseOption
    },
  },
}
</script>
