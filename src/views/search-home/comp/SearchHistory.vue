<template>
  <div v-if="homeStore.hasHistory" class="history">
    <van-icon class="start" name="underway-o"/>
    <div class="content">
      <div v-for="s in homeStore.history" class="item" @click="onTextClick(s)">{{ s }}</div>
    </div>
    <van-icon class="end" name="delete-o" @click="homeStore.clearHistory()"/>
  </div>
</template>

<script lang="ts" setup>
import {useSearchHomeStore} from "../store";
const homeStore = useSearchHomeStore();
const emits = defineEmits(["click"]);
function onTextClick(text:string){
  homeStore.addHistory(text);
  emits("click", text);
}
</script>

<style lang="less" scoped>
.history {
  width: 100%;
  padding: 16px;
  display: flex;

  .start, .end {
    flex-shrink: 0;
    flex-grow: 0;
  }

  .content {
    margin: 0 12px;
    display: flex;
    width: 0;
    flex-grow: 1;
    overflow: scroll;
    line-height: 16px;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }

    .item {
      padding: 0 10px;
      flex-shrink: 0;
      font-size: 14px;
      color: var(--text-color-secondary);
      border-right: 1px solid var(--text-color-placeholder);

      &:nth-last-child(1) {
        border: 0;
      }
    }
  }
}
</style>
