<template>
  <div class="bookshelf-view" @scroll="scrollChange">
    <yun-header @edit="onShowEdit" :bgc="bgc" />
    <div class="body">
      <yun-book-list
        v-if="showPage === 'normal'"
        @click="onItemClick"
        :list="shelfList"
        v-model:is-edit="showEdit"
        :select-ids="selectIds"
      />
      <yun-empty v-else :show="showPage" />
    </div>
  </div>
  <van-popup v-model:show="showEdit" :overlay="false" position="top">
    <status-bar />
    <van-nav-bar
      class="proup-header"
      :title="
        selectIds.size === 0 ? '请选择图书' : `已经选择${selectIds.size}本书`
      "
    />
    <!-- 取消全选功能 -->
    <!-- @click-right="onSelectAll" -->
    <!-- :right-text="iSselectAll ? '取消全选':'全选'" -->
  </van-popup>
  <van-popup v-model:show="showEdit" :overlay="false" position="bottom">
    <div style="display: flex">
      <van-button
        :loading="loading"
        block
        icon="delete"
        type="danger"
        @click="removeList"
        >删除
      </van-button>
      <van-button
        :loading="loading"
        block
        icon="revoke"
        type="default"
        @click="showEdit = false"
        >取消
      </van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { showToast } from "vant";
import StatusBar from "../../components/StatusBar.vue";

import YunHeader from "./src/hrader.vue";
import YunEmpty from "./src/empty.vue";
import YunBookList from "./src/book-list.vue";
import { Book } from "../../type/book";
import { getShelfList, removeShelfByIds } from "../../api/bookshelf";
import {useUserStore} from "../mine/store";
import {toRead} from "../../router/page";
let userStore = useUserStore();
// 控制显示那个页面
const showPage = computed(() => {
  if (!userStore.isLogin) return "nologin";
  if (loading.value) return "loading";
  if (shelfList.value.length == 0) return "empty";
  return "normal";
});
const router = useRouter();
// 编辑时被选中的书籍id列表
const selectIds = ref(new Set<string>());
// 书架列表
const shelfList = ref<Book[]>([]);
// 是否显示编辑界面
const showEdit = ref(false);
// 界面加载
const loading = ref(true);
// header的背景颜色
const bgc = ref("");
// toast
const msg = (message: string) => {
  showToast({ message, position: "bottom" });
};

// 加载书籍
const loadData = () => {
  if (!userStore.isLogin) return;
  loading.value = true;
  getShelfList()
    .then((e) => (shelfList.value = <Book[]>(<unknown>e)))
    .catch(({ message }) => msg(message))
    .finally(() => (loading.value = false));
};
loadData();
const scrollChange = (e: Event | any) =>
  (bgc.value = e.target.scrollTop <= 10 ? "" : "#ffffff");

// 进行编辑
const onShowEdit = () => {
  if (!userStore.isLogin) return msg("请先登录");
  if (shelfList.value.length == 0) return msg("书架空空如也");
  // 清空选择列表
  selectIds.value.clear();
  showEdit.value = true;
};

// 书籍点击事件
const onItemClick = (e: Book) => {
  if (loading.value) return;
  if (!showEdit.value) {
    return toRead(e.id, e.readTo);
  }
  // 存在则删除，不存在则添加
  selectIds.value.has(e.id)
      ? selectIds.value.delete(e.id)
      : selectIds.value.add(e.id);
};

// 删除书籍
const removeList = () => {
  loading.value = true;
  removeShelfByIds([...selectIds.value.values()])
    .then((e) => (msg("删除成功！"), (showEdit.value = false), loadData()))
    .catch(({ message }) => msg(message))
    .finally(() => (loading.value = false));
};

router.onBack = () => {
  if (showEdit.value) {
    showEdit.value = false;
    return false;
  }
  return true;
};
</script>
<style lang="less">
:root {
  --van-nav-bar-height: 52px !important;
}
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
