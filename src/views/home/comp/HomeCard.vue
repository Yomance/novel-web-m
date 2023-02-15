<template>
  <div class="home-card">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
      <div class="right-btn">
        <slot name="right"/>
      </div>
    </div>
    <van-space class="body" direction="vertical" fill size="16px">
      <book-card
          v-for="item in books"
          :book="item"
          @click="router.push({name:'Read', query:{b:item.id,c:item.readTo}})"
      />
    </van-space>
  </div>
</template>

<script lang="ts" setup>
import BookCard from '../../../components/book-card/index.vue';
import {PropType} from "vue";
import {Book} from "../../../type/book";
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
  books: {
    type: Object as PropType<Book[]>,
    default: []
  },
  title: {
    type: String,
    required: true
  },
  desc: String,
});
</script>
<style lang="less" scoped>
.home-card {
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 4px 12px 12px 12px;

  .header {
    width: 100%;
    height: 40px;
    display: flex;
    line-height: 40px;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: var(--text-color-primary);
      margin-right: 12px;
    }

    .desc {
      color: var(--text-color-placeholder);
      font-size: var(--text-size-4);
    }

    margin-bottom: 4px;
  }

  .body {
    width: 100%;
    height: auto;
  }
}
</style>
