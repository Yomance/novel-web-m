<template>
  <div class="book-list">
    <div
      v-for="item in list"
      class="item"
      @click="emit('click', item)"
    >
      <img :alt="item.name" :src="item.cover" />
      <div class="name van-multi-ellipsis--l2">{{ item.name }}</div>
      <button v-if="isEdit" :class="{ active: item.isSelect }" class="select">
        <van-icon name="success" size="18" />
      </button>
    </div>
    <button v-if="!isEdit" class="more" @click="router.push({ name: 'Home' })">
      <van-icon name="plus" size="35" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { defineProps, PropType, defineEmits } from "vue";
import { Book } from "../../../type/book";
const router = useRouter();
defineProps({
  isEdit: {
    type: Boolean,
    default: false,
  },
  list: {
    type: Array as PropType<Book[]>,
    default: [],
  },
});
const emit = defineEmits(["update:isEdit", "click"]);
</script>
<style scoped lang="less">
.book-list {
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 90px);
  grid-row-gap: 16px;
  justify-content: space-between;

  .item {
    width: 90px;
    display: flex;
    flex-direction: column;
    position: relative;

    .select {
      position: absolute;
      top: 5px;
      right: 5px;
      background: #ffffff;
      width: 24px;
      height: 24px;
      border-radius: 100%;
      padding: 0;
      border: 1px solid var(--border-color-light);
      color: #ffffff;

      &.active {
        background-color: orangered;
        border-color: orangered;
      }
    }

    img {
      width: 90px;
      height: 120px;
      border-radius: 4px;
      margin-bottom: 6px;
    }

    .name {
      color: var(--text-color-primary);
      font-size: 14px;
      line-height: 20px;
      font-weight: bold;
    }
  }

  .more {
    width: 90px;
    border-radius: 4px;
    height: 120px;
    border: 1px solid var(--border-color-light);
    color: var(--border-color-light);
  }
}
</style>
