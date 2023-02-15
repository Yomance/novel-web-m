<template>
  <div class="hot-text">
    <div class="title">大家都在搜</div>
    <div class="body">
      <div
          v-for="(item, i) in texts"
          :class="{hot: i < 3}"
          class="item"
          @click="emits('click', item)"
      >
        <van-icon v-if="i < 3" name="fire"/>
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";

const emits = defineEmits(["click"]);
defineProps({
  texts: {
    type: Array as PropType<string[]>,
    default: [],
  }
})
</script>

<style lang="less" scoped>
.hot-text {
  width: 100%;
  padding: 0 16px;

  .title {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: var(--text-color-primary);
    font-size: 18px;
  }

  .body {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-height: 80px;
    overflow: hidden;

    .item {
      height: 28px;
      line-height: 28px;
      border-radius: 13px;
      padding: 0 12px;
      background-color: var(--background-color);
      color: var(--text-color-secondary);
      margin: 0 12px 12px 0;
      font-size: 14px;

      &.hot {
        padding-left: 6px;
        background-color: rgba(255, 69, 0, 0.1);
        color: rgba(255, 69, 0, 0.8);
      }
    }
  }
}
</style>
