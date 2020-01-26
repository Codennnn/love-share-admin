<template>
  <div>
    <Table :table-data="tableData"></Table>
  </div>
</template>

<script>
import Table from './Table.vue'

export default {
  components: { Table },
  data() {
    return {
      tableData: {},
    }
  },
}
</script>
