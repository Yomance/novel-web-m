<style lang="less" scoped>
.chapter-selector {
  width: 100%;
  height: 72px;
  display: flex;
  padding: 16px;

  .slider-container {
    width: 0;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 0 0 10px;
    margin: 0 8px;
    --van-slider-bar-height: 4px;
    --van-slider-button-width: 20px;
    --van-slider-button-height: 20px;
    --van-slider-active-background: orangered;
    --van-slider-inactive-background: #777;
    --van-slider-button-background: #777;
  }

  span {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: var(--a-text-color);

    &:active {
      opacity: var(--a-active-opacity);
    }
  }
}
</style>
<template>
  <div class="chapter-selector">
    <span @click="readBookStore.loadLastChapter">上一章</span>
    <button class="slider-container">
      <van-slider
          v-model="readBookStore.currentChapterNums"
          :max="readBookStore.currentBook.chapterCount"
          :min="1"
          @change="readBookStore.loadChapter"
      />
    </button>
    <span @click="readBookStore.loadNextChapter">下一章</span>
  </div>
</template>
<script lang="ts" setup>

import {useReadBookStore} from "../book-store";

const readBookStore = useReadBookStore();
</script>
