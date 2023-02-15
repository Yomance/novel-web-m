<template>
  <div class="hot-book-list">
    <div class="title">本周热搜</div>
    <van-space direction="vertical" fill size="16px">
      <div v-for="(book, i) in books" class="hot-book" @click="emits('click', book)">
        <button class="number">{{ i + 1 }}</button>
        <img :alt="book.name" :src="book.cover" class="cover">
        <div class="info">
          <div class="name">{{ book.name }}</div>
          <div class="list">
            <div class="tag">{{ book.category.name }}&nbsp;&nbsp;·&nbsp;&nbsp;{{ book.writeState.label }}</div>
            <div class="search-nums">{{ toSearchNumText(book.searchNum) }}</div>
          </div>
        </div>
      </div>
    </van-space>
  </div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Book} from "../../../type/book";

const emits = defineEmits(["click"]);

const props = defineProps({
  books: {
    type: Object as PropType<Book[]>,
    required: true
  }
});

function toSearchNumText(size: number): string {
  if (size < 1000) {
    return size + "次搜索";
  } else if (size < 10000) {
    return (size / 1000).toFixed(1) + "千次搜索"
  } else {
    return (size / 10000).toFixed(1) + "万次搜索"
  }
}
</script>

<style lang="less" scoped>
.hot-book-list {
  width: 100%;
  padding-bottom: 40px;

  .title {
    padding: 0 16px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: var(--text-color-primary);
    font-size: 18px;
  }
}

.hot-book {
  width: 100%;
  display: flex;
  height: 60px;
  padding-right: 16px;

  .number, .cover {
    height: 60px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .number {
    width: 56px;
    font-weight: bold;
    font-size: 14px;
  }

  .cover {
    width: 45px;
    margin-right: 8px;
    border-radius: 4px;
  }

  .info {
    padding: 8px 0;
    width: 0;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .name {
      color: var(--text-color-primary);
      font-weight: bold;
    }

    .list {
      display: flex;
      justify-content: space-between;
      font-size: 14px;

      .tag {
        color: var(--text-color-secondary);
      }

      .search-nums {
        color: var(--text-color-regular);
      }
    }
  }
}
</style>
