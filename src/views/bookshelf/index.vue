<template>
  <div class="bookshelf-view" @scroll="e">
    <yun-header @edit="onShowEdit"/>
    <div class="body">
      <yun-empty />
      <yun-book-list @click="onItemClick" :list="bookshelfStore.books" v-model:is-edit="showEdit" />
    </div>
  </div>
  <van-popup v-model:show="showEdit" :overlay="false" position="top">
    <status-bar/>
    <van-nav-bar
        :right-text="bookshelfStore.iSselectAll ? '取消全选':'全选'"
        :title="bookshelfStore.selectCount === 0 ? '请选择图书' : '已经选择'+bookshelfStore.selectCount+'本书'"
        @click-right="onSelectAll"
    />
  </van-popup>
  <van-popup v-model:show="showEdit" :overlay="false" position="bottom">
    <div style="display: flex">
      <van-button :loading="bookshelfStore.loading" block icon="delete" type="danger" @click="onCloseEdit(true)">删除
      </van-button>
      <van-button :loading="bookshelfStore.loading" block icon="revoke" type="default" @click="onCloseEdit(false)">取消
      </van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useBookshelfStore} from "./store";
import {useUserStore} from "../mine/store";
import {showToast} from "vant";
import StatusBar from "../../components/StatusBar.vue";

import YunHeader from './src/hrader.vue';
import YunEmpty from './src/empty.vue';
import YunBookList from './src/book-list.vue';
import { Book } from "../../type/book";

const router = useRouter();
const userStore = useUserStore();
const bookshelfStore = useBookshelfStore();

bookshelfStore.loadData();
const headerBackground = ref("");

function e(e: Event) {
  // @ts-ignore
  headerBackground.value = e.target.scrollTop <= 10 ? '' : '#ffffff';
}

const onShowEdit = () => {
  if (!userStore.isLogin) {
    showToast({
      message: "请先登录",
      position: "bottom"
    })
    return;
  }
  if (bookshelfStore.empty) {
    showToast({
      message: "书架空空如也",
      position: "bottom"
    })
    return;
  }
  showEdit.value = true;
}
const showEdit = ref(false);
const onItemClick = (e: Book) => {
  if (bookshelfStore.loading) return;
  if (showEdit.value) {
    let size = (e.isSelect = !e.isSelect) ? 1 : -1;
    bookshelfStore.selectCount += size;
  } else {
    router.push({name: 'Read', query: {b: 1, c: 1}})
  }
}
const onSelectAll = () => {
  if (bookshelfStore.loading) return;
  if (bookshelfStore.iSselectAll) {
    bookshelfStore.books.forEach(e => {
      e.isSelect = false;
    })
    bookshelfStore.selectCount = 0;
  } else {
    bookshelfStore.books.forEach(e => {
      e.isSelect = true;
    })
    bookshelfStore.selectCount = bookshelfStore.books.length;
  }
}
const onCloseEdit = (deleted: boolean = false) => {
  if (deleted) {
    bookshelfStore.removeBook().then(e => {
      showEdit.value = false;
    });
  } else {
    bookshelfStore.cancelSelect()
    showEdit.value = false;
  }
}
router.onBack = () => {
  if (showEdit.value) {
    onCloseEdit();
    return false;
  }
  return true;
}
</script>

<style lang="less" scoped>
.bookshelf-view {
  width: 100%;
  background: var(--background-color);
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .body {
    border-radius: 16px 16px 0 0;
    padding: 16px;
    background-color: var(--background-color-w);
    display: grid;
    min-height: calc(100% - 140px);
  }
}
</style>
