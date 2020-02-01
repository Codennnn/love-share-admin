<template>
  <div
    id="list-complete-demo"
    class="demo"
  >
    <button v-on:click="add">Add</button>
    <button v-on:click="remove">Remove</button>
    <transition-group
      name="list-complete"
      tag="p"
    >
      <span
        v-for="item in items"
        v-bind:key="item"
        class="list-complete-item"
      >
        {{ item }}
      </span>
    </transition-group>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      nextNum: 10,
    }
  },

  methods: {
    randomIndex() {
      return Math.floor(Math.random() * this.items.length)
    },
    add() {
      this.items.splice(this.randomIndex(), 0, this.nextNum += 1)
    },
    remove() {
      this.items.splice(this.randomIndex(), 1)
    },
  },
}
</script>

<style lang="scss" scoped>
.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>
