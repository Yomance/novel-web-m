<template>
  <div class="content">
    <div
        class="con"
        @click="emits('click')"
    >
      <template v-if="!chapterStore.loading">
        <p v-for="item in list" :data-id="item.id">{{ item.value }}</p>
      </template>
      <van-loading v-else class="load" type="spinner" color="#1989fa"/>
    </div>
    <div class="btn-list">
      <van-button :disabled="!chapterStore.hasLast || chapterStore.loading" size="small" @click="chapterStore.last()">上一章</van-button>
      <van-button :disabled="!chapterStore.hasNext || chapterStore.loading" size="small" @click="chapterStore.next()">下一章</van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, defineEmits} from 'vue'
import {useChapterStore} from "../../../store/chapter";
const chapterStore = useChapterStore();
const list = computed(() => {
  // @ts-ignore
  let con = chapterStore.chapter.content || "";
  return con.split("\n").map((e:string) => {
    return {
      id: e.substring(0, 4),
      value: e.substring(5)
    }
  })
});
const emits = defineEmits(["click"]);
</script>

<style scoped lang="less">
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
    position: relative;
    .load{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-70%,-50%);
    }
  }

  /deep/ p {
    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>