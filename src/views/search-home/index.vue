<template>
  <status-bar color="black" fixed/>
  <search-history @click="onTextClick"/>
  <van-loading v-if="loading" size="24px" vertical>加载中...</van-loading>
  <div v-else>
    <search-hot-text :texts="homeStore.hotText" @click="onTextClick"/>
    <search-hot-book :books="homeStore.hotBook" @click="onBookItemClick"/>
  </div>
</template>

<script lang="ts" setup>
import StatusBar from "../../components/StatusBar.vue";
import {Book} from "../../type/book";
import {useSearchHomeStore} from "./store";
import SearchHotBook from "./comp/SearchHotBook.vue";
import SearchHistory from "./comp/SearchHistory.vue";
import SearchHotText from "./comp/SearchHotText.vue";
import {ref} from "vue";
import {useSearchStore} from "../search/store";
import {useRouter} from "vue-router";

const router = useRouter();

const searchStore = useSearchStore();
const homeStore = useSearchHomeStore();
const loading = ref(true);
homeStore.loadData().finally(() => loading.value = false);
// 点击文字或标签执行，进行搜索
const onTextClick = (kw: string) => {
  homeStore.addHistory(kw);
  searchStore.value = kw;
  searchStore.search(router);
}

const onBookItemClick = (e: Book) => {
}
</script>
