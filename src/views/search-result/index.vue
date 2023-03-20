<!--<template>-->
<!--  <van-list-->
<!--      v-model:loading="pageLoading"-->
<!--      :finished="finished"-->
<!--      finished-text="没有更多了"-->
<!--      @load="searchNext"-->
<!--  >-->
<!--    <van-space class="list" direction="vertical" fill size="16px" style="position: relative">-->
<!--      <book-card v-for="item in books" :book="item"/>-->
<!--    </van-space>-->
<!--  </van-list>-->
<!--  <van-back-top/>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--import {ref} from "vue";-->
<!--import {Book} from "../../type/book";-->
<!--import BookCard from '../../components/book-card/index.vue';-->
<!--import {http} from "../../api";-->
<!--import {useSearchStore} from "../search/store";-->

<!--const searchStore = useSearchStore();-->
<!--const books = ref<Book[]>([]);-->
<!--const kw = searchStore.kw;-->
<!--const pageLoading = ref(false);-->
<!--const finished = ref(false);-->
<!--const current = ref(1);-->



<!--const searchNext = () => {-->
<!--  http.get("/search/query", {-->
<!--    params: {-->
<!--      current: current.value,-->
<!--      size: 10,-->
<!--      where: kw,-->
<!--    }-->
<!--  }).then(e => {-->
<!--    current.value++;-->
<!--    books.value.push(...e.data);-->
<!--    if (e.data.length < 10) {-->
<!--      finished.value = true;-->
<!--    }-->
<!--    pageLoading.value = false;-->
<!--  })-->
<!--}-->
<!--</script>-->
<!--<style scoped>-->
<!--.list {-->
<!--  padding: 16px;-->
<!--  overflow: auto;-->
<!--}-->
<!--</style>-->
