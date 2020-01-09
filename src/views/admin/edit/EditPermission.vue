<template>
  <div>
    <table
      v-if="per"
      class="permission"
    >
      <tr>
        <th>Module</th>
        <th>Read</th>
        <th>Write</th>
        <th>Create</th>
        <th>Delete</th>
      </tr>

      <tr
        v-for="(it, i) in per"
        :key="i"
      >
        <td>{{ modules[it.module] }}</td>
        <td
          v-for="(td, j) in it.purview"
          :key="j"
        >
          <vs-checkbox
            :class="{'pointer-events-none': !editable}"
            v-model="td[actions[j]]"
          ></vs-checkbox>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import _cloneDeepWith from 'lodash/cloneDeepWith'

export default {
  name: 'EditPermission',
  props: {
    editable: {
      type: Boolean,
      default: false,
    },
    permissions: Array,
  },

  data: () => ({
    per: [],
    modules: {
      user: '用户',
      goods: '商品',
      order: '订单',
      comment: '留言',
    },
    actions: ['read', 'write', 'create', 'delete'],
  }),

  created() {
    this.initValues()
  },

  methods: {
    initValues() {
      if (this.permissions) {
        this.per = _cloneDeepWith(this.permissions).map(permission => ({
          module: permission.module,
          purview: this.actions.map((action) => {
            const obj = {}
            obj[`${action}`] = permission.purview.includes(action)
            return obj
          }),
        }))
        console.log(this.per)
      } else {
        const purview = [{ read: false }, { write: false }, { create: false }, { delete: false }]
        this.per = Object.keys(this.modules).map(key => ({
          module: key,
          purview: _cloneDeepWith(purview),
        }))
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table.permission {
  width: 100%;
  th {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
  }
  tr:first-child {
    color: #626262;
  }
  td {
    padding: 0.6rem 0.5rem 0.6rem 0.5rem;
    font-size: 0.9rem;
  }
  td:nth-child(1) {
    color: #626262;
  }
  td:nth-child(2) {
    color: rgb(150, 150, 150);
  }
  .con-vs-checkbox {
    justify-content: flex-start;
  }
}
</style>
