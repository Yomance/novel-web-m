<template>
  <div
      :style="themeStore.styleObject"
      class="read-view"
  >
    <div class="header">{{ readBookStore.currentChapter.name }}</div>
    <div class="content">
      <button
          v-if="readBookStore.status.error"
          class="con"
          @click="readBookStore.loadChapter"
          v-text="'网络错误，请点击重试！'"
      />
      <button v-if="!readBookStore.status.error && readBookStore.status.loading" class="con">
        <van-loading vertical>加载中...</van-loading>
      </button>
      <div
          v-if="!readBookStore.status.error && !readBookStore.status.loading"
          class="con"
          @click="showSetting = !showSetting"
      >
        <p v-for="item in readBookStore.currentChapter.content.split('\n')">{{ item }}</p>
      </div>
      <div class="btn-list">
        <van-button
            :disabled="readBookStore.status.loading"
            size="small" @click="readBookStore.loadLastChapter">上一章
        </van-button>
        <van-button :disabled="readBookStore.status.loading" size="small" @click="readBookStore.loadNextChapter">下一章
        </van-button>
      </div>
    </div>
    <div class="footer"></div>
  </div>
  <n-alert v-model:show="showSetting"/>
  <buy v-show="!readBookStore.currentChapter.isBuy" />
</template>

<script lang="ts" setup>
import NAlert from './alert/alert.vue'
import {ref} from "vue";
import {useReadThemeStore} from "./read-theme-store";
import {useReadBookStore} from "./book-store";
import Buy from "./buy.vue";

const themeStore = useReadThemeStore();
const readBookStore = useReadBookStore();
const showSetting = ref(false);
readBookStore.loadChapter(1);
</script>

<style lang="less" scoped>
.read-view {
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/image/wallpapers/default.jpg");
  background-size: 100% 100% !important;
  background-repeat: no-repeat !important;
  display: flex;
  flex-direction: column;
  text-indent: 2em;

  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    flex-shrink: 0;
    font-size: 16px;
  }

  .content {
    flex-grow: 1;
    width: 100%;
    height: 0;
    padding: 0 16px;
    overflow: auto;

    .btn-list {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: space-around;
    }

    .con {
      float: right;
      width: 100%;
      flex-grow: 1;
      min-height: calc(100% - 60px);
      margin-bottom: 20px;
    }

    /deep/ p {
      margin-bottom: v-bind('themeStore.segmentSpacing+"em"');

      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .footer {
    width: 100%;
    height: 50px;
    flex-shrink: 0;
  }
}
</style>
