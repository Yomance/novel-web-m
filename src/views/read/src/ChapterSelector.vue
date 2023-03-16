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
    <span @click="click(false)">上一章</span>
    <button class="slider-container">
      <van-slider
          v-model="value"
          :max="bookStore.book.chapterCount"
          :min="1"
          @change="quick"
      />
    </button>
    <span @click="click">下一章</span>
  </div>
</template>
<script lang="ts" setup>
import {useChapterStore} from "../../../store/chapter";
import {ref, watch} from "vue";
import {useBookStore} from "../../../store/book";
import {showToast} from "vant";
import {getIdList} from "../../../api/chapter";

const chapterStore = useChapterStore();
const bookStore = useBookStore();
const value = ref(1);
const ids:string[] = [];
const max = ref(0);
watch(()=>chapterStore.chapter, ()=>{
  console.log(ids.binaryIndexOf);
  value.value = ids.indexOf(chapterStore.chapter.id)+1;
})
getIdList(bookStore.bookId).then((e)=>{
  ids.clearAndAddList(e);
  max.value = ids.length;
});
function quick(index:number){
  chapterStore.chapterId = ids[index-1];
  chapterStore.loadChapter();
}
function click(isNext=true){
  if (chapterStore.loading) return;
  if (isNext){
    if (!chapterStore.hasNext){
      showToast("已经是最新章节了")
      return;
    }
    chapterStore.next()
  }else {
    if (!chapterStore.hasLast){
      showToast("已经是第一章了")
      return;
    }
    chapterStore.last();
  }
}
</script>
