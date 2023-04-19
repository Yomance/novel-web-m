<template>
  <yun-turn-page v-if="settingStore.turnPageType === 'emulation'" @click="showSetting = !showSetting" />
  <div
      v-else
      :style="themeStore.styleObject"
      class="read-view"
  >
    <div class="header">{{ chapterStore.chapter.name }}</div>
    <yun-content @click="showSetting = !showSetting"/>
    <div class="footer"></div>
  </div>
  <n-alert v-model:show="showSetting" @show-comment="showSetting = !(showComment = true)"/>
  <buy v-show="!isBuy" />
  <yun-comment
      v-model:show="showComment"
      :bid="bid || ''"
      :cid="chapterStore.chapterId"
      :text="chapterStore.chapter.name || ''"
  />
</template>

<script lang="ts" setup>
import NAlert from './src/alert.vue'
import {computed, ref, watch} from "vue";
import {useReadThemeStore} from "./read-theme-store";
import YunContent from './src/content.vue';
import Buy from "./src/buy.vue";
import {useBookStore} from "/src/store/book";
import {useChapterStore} from "/src/store/chapter";
import {useRoute, useRouter} from "vue-router";
import YunComment from '../../components/comment/index.vue';
import YunTurnPage from './src/emulation.vue';
import {useReadSettingStore} from "/src/views/read/setting";
const settingStore = useReadSettingStore();
const isBuy = computed(()=>{
  return chapterStore.loading || chapterStore.chapter.free || chapterStore.chapter?.isBuy
});

const showComment = ref(false);
const router = useRouter();
const bookStore = useBookStore();
const themeStore = useReadThemeStore();
const showSetting = ref(false);
let route = useRoute();
const chapterStore = useChapterStore();
let bid: string = <string>route.query.bid;
let cid: string = <string>route.query.cid || "";
if (!bid) {
  router.push({name: "404"});
}
chapterStore.bookId = bid;
chapterStore.chapterId = cid || "";
watch(()=>chapterStore.chapter, (n)=>{
  if (!n.free && !n.isBuy) {
    showSetting.value = false;
  }
})
//
// 加载书籍信息
bookStore.bookId = bid;
bookStore.loadBookInfo().then(e => {
  // 加载章节信息
  if (!chapterStore.chapterId) {
    chapterStore.chapterId = bookStore.book.readTo;
  }
  chapterStore.loadChapter();
});
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
