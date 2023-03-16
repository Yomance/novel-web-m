<template>
  <router-link :to="'/read?bid='+book.id">
  <div class="book-card">
    <div class="cover">
      <img alt="" :src="book.cover">
    </div>
    <div class="info-list">
      <div class="title">{{ book.name }}</div>
      <div class="desc van-multi-ellipsis--l2">{{book.description}}</div>
      <div class="tags">
        <van-space>
          <!-- <van-tag color="#EBEFFF" text-color="#4C6DE4">{{ book.writeState.label }}</van-tag> -->
          <van-tag color="#F2F9E4" text-color="#66B105">{{ book.category.name }}</van-tag>
          <van-tag color="#FFFADF" text-color="#D5A300">{{ book.tags[0]?.name }}</van-tag>
        </van-space>
      </div>
    </div>
  </div>
  </router-link>
</template>
<script lang="ts" setup>
import {PropType} from "vue";
import {Book} from "../../type/book";
const props = defineProps({
  book:{
    type: Object as PropType<Book>,
    required: true,
  }
});
</script>

<style lang="less" scoped>
.book-card {
  --h: 88px;
  display: flex;
  height: var(--h);

  .cover {
    width: 66px;
    height: 100%;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    flex-grow: 0;
    margin-right: 8px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .info-list {
    width: 0;
    height: var(--h);
    padding: 4px 0;
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    justify-content: space-between;

    .title {
      width: 100%;
      font-size: 16px;
      color: var(--text-color-primary);
    }

    .desc {
      width: 100%;
      height: 32px;
      font-size: var(--text-size-6);
      color: var(--text-color-placeholder);
      line-height: 16px;
      overflow: hidden;
    }

    .tags {
      width: 100%;
      display: flex;
    }
  }
}
</style>
