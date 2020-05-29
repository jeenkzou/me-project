<template>
  <ul class="me-tabs">
    <li
      class="me-tabs-item"
      :class="{active:current==index}"
      v-for="(tab,index) in data"
      :key="tab.name"
      @click="handleClick(index)"
    >{{tab.name}}</li>
  </ul>
</template>

<script>
export default {
  name: "meTabs",
  props: {
    data: {
      type: Array,
      required: true
    },
    value: {
      default: 0
    }
  },
  watch: {
    value(val) {
      this.current = val;
    }
  },
  data() {
    return {
      current: this.value
    };
  },
  methods: {
    handleClick(val) {
      this.current = val;
      this.$emit("input", val);
    }
  }
};
</script>

<style lang='less' scoped>
/*
    Tabs
*/
.me-tabs {

  &-item {
    display: inline-block;
    cursor: pointer;
    font-size: @font-size-lg;
    padding: 20px;
    position: relative;

    &:hover,
    &.active {
      color: @color-primary;
    //   font-weight: bold;
    }

    &.active::after {
      content: "";
      width: 100%;
      height: 4px;
      position: absolute;
      bottom: 0;
      right: 0;
      background: @color-primary;
    }
  }
}
</style>
