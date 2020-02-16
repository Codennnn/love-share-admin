<template>
  <div>
    <vs-collapse type="margin">
      <vs-collapse-item>
        <div
          slot="header"
          class="text-xl text-primary"
        >
          Collapse item
        </div>
        <p class=" text-gray">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque rhoncus eros tortor, non fringilla lectus cursus et. Fusce vel nisi ante. Aliquam sit amet lectus pharetra, luctus mi sed, aliquet felis. Mauris a tortor viverra, ornare tellus in, consectetur leo.
        </p>
      </vs-collapse-item>
    </vs-collapse>
  </div>
</template>

<script>

export default {
  name: 'FrequentQuestions',
  data: () => ({
  }),

  created() {
  },

  methods: {
    async getUserDetail() {
      // try {
      // } catch {
      //   // TODO
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  .vs-collapse::v-deep {
    .vs-icon {
      color: themed("text-color-primary");
    }
  }
}
</style>
