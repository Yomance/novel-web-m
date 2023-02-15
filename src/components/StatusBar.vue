<template>
  <div :class="{fixed}" class="status-bar">
    <slot/>
  </div>
</template>

<script lang="ts">
import {system} from "../util/system";
import {PropType, watch} from "vue";

const statusBarHeight = system.getStatusBarHeight();
export default {
  name: "StatusBar",
  props: {
    color: {
      type: String as PropType<"white" | "black">,
      default: 'black'
    },
    fixed: {
      type: Boolean,
      default: false,
    },
    background: {
      type: String as PropType<string>,
      default: 'inherit',
    }
  },
  setup(props: any) {
    system.setStatusBarColor(false);
    watch(() => props.color, (v) => {
      if (v == "white") {
        system.setStatusBarColor(true)
      } else if (v == "black") {
        system.setStatusBarColor(false)
      } else {
        console.error("未知值: " + v);
      }
    })
    return {
      statusBarHeight: statusBarHeight + 'px',
    }
  }
}
</script>

<style lang="less" scoped>
.status-bar {
  width: 100% !important;
  height: v-bind(statusBarHeight) !important;
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  border: none !important;
  background-color: v-bind(background) !important;

  &.fixed::before {
    content: ' ';
    width: 100%;
    height: v-bind(statusBarHeight);
    background-color: v-bind(background);
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
  }
}
</style>
