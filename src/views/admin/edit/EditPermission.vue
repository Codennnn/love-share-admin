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
            :disabled="!editable"
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
    allSelected: Boolean,
    permissions: Array,
  },

  data: () => ({
    per: [],
    modules: {
      user: '用户',
      goods: '商品',
      order: '订单',
      comment: '留言',
      guide: '指引',
      admin: '管理员',
    },
    actions: ['read', 'write', 'create', 'delete'],
  }),

  watch: {
    permissions: {
      handler(v) {
        if (v) {
          this.setPermissions()
        } else {
          this.initValues()
        }
      },
      immediate: true,
    },
    allSelected(status) {
      if (status) {
        this.setAllCheckboxStatus(status)
      } else {
        this.setAllCheckboxStatus(status)
      }
    },
  },

  methods: {
    initValues() {
      const purview = [{ read: false }, { write: false }, { create: false }, { delete: false }]
      this.per = Object.keys(this.modules).map(key => ({
        module: key,
        purview: _cloneDeepWith(purview),
      }))
    },

    setPermissions() {
      const permissions = _cloneDeepWith(this.permissions)
      this.per = Object.keys(this.modules).map((key) => {
        // eslint-disable-next-line no-restricted-syntax
        for (const el of permissions) {
          if (el.module === key) {
            return {
              module: key,
              purview: this.actions.map((action) => {
                const obj = {}
                obj[`${action}`] = el.purview.includes(action)
                return obj
              }),
            }
          }
        }
        return {
          module: key,
          purview: [{ read: false }, { write: false }, { create: false }, { delete: false }],
        }
      })
    },

    setAllCheckboxStatus(status) {
      this.per.forEach((el) => {
        el.purview.forEach((it, i) => {
          it[this.actions[i]] = status
        })
      })
    },

    getPermissions() {
      return this.per.map(el => ({
        module: el.module,
        purview: el.purview.filter((it, i) => it[this.actions[i]]).map(it => Object.keys(it)[0]),
      }))
    },
  },
}
</script>

<style lang="scss" scoped>
@include themeify {
  table.permission {
    tr:first-child {
      color: themed("text-color-primary");
    }
    td:nth-child(1) {
      color: themed("text-color-gray");
    }
  }
}

table.permission {
  width: 100%;
  th {
    padding: 1rem 0.5rem 0.8rem 0.5rem;
  }
  td {
    padding: 0.6rem 0.5rem 0.6rem 0.5rem;
    font-size: 0.9rem;
    .con-vs-checkbox::v-deep {
      .vs-checkbox--input {
        width: 20px;
        &:disabled + .vs-checkbox {
          opacity: 0.6;
        }
      }
    }
  }
  .con-vs-checkbox {
    justify-content: flex-start;
  }
}
</style>
