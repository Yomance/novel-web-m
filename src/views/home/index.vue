<template>
  <van-nav-bar
      class="header"
      fixed
      title="云鹏小说网"
      placeholder
  >
    <template #right>
      <van-icon name="search" size="18" @click="toSearchPage"/>
    </template>
  </van-nav-bar>
  <van-pull-refresh
      v-model="refreshLoading"
      :head-height="66"
      :success-duration="800"
      class="home-view no-scroll-bar"
      success-text="刷新成功"
      @refresh="onRefresh"
  >
    <van-list
        v-model:loading="downLoading"
        :finished="downFinished"
        :immediate-check="false"
        finished-text="没有更多了"
        @load="onDownLoad"
    >
      <van-loading v-if="pageLoading" size="24px" vertical>加载中...</van-loading>
      <van-space v-else direction="vertical" fill size="16px">
        <home-banner :value="banners"/>
        <van-search
            shape="round"
            disabled
            background="transparent"
            placeholder="请输入搜索关键词"
            @click="router.push({name: 'Search'})"
        />
        <home-card :books="hot" desc="根据你的喜好推荐" title="全网爆款"/>
        <home-card :books="newBook" desc="最近新上架的好书" title="新书推荐"/>
        <home-card :books="recommend" desc="根据你的喜好推荐" title="完本推荐"/>
        <home-card :books="random" desc="根据你的喜好推荐" title="猜你喜欢"/>
      </van-space>
    </van-list>
  </van-pull-refresh>
</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {http, Page} from "../../api";
import {Book} from "../../type/book";
import {ref} from "vue";
import HomeBanner from "./comp/HomeBanner.vue";
import {Banner, HomeViewModel} from "./type";
import HomeCard from "./comp/HomeCard.vue";
import {toSearchPage} from "../../router/page";

let router = useRouter();
const banners = ref<Banner[]>([]);
const hot = ref<Book[]>([]);
const newBook = ref<Book[]>([]);
const recommend = ref<Book[]>([]);
const random = ref<Book[]>([]);
const pageLoading = ref(true);
const refreshLoading = ref(false);
const onRefresh = () => {
  loadData().finally(() => refreshLoading.value = false)
}
const downLoading = ref(false);
const downFinished = ref(false);
const randomPage = {
  current: 0,
  size: 8,
}
const onDownLoad = () => {
  http.get<Page<Book>, Page<Book>>("/home-page/r", {
    params: randomPage
  }).then(e => {
    randomPage.current = e.current + 1;
    randomPage.size = e.size;
    if (!random.value) random.value = [];
    random.value.push(...e.data);
    downLoading.value = false;

    if (e.data.length < e.size) {
      downFinished.value = true;
    }
  })
}

function loadData() {
  return http.get<HomeViewModel, HomeViewModel>("/home-page").then(data => {
    banners.value = data.banners;
    hot.value = data.hot;
    newBook.value = data.newBook;
    recommend.value = data.recommend;
    random.value = data.random;
  })
}

loadData().finally(() => pageLoading.value = false)
</script>

<style lang="less" scoped>
.header {
  --van-nav-bar-text-color: var(--van-text-color);
}

.home-view {
  width: 100%;
  height: calc(100% - 46px);
  overflow: auto;
  background: var(--background-color);
  padding: 16px;
  --van-search-padding: 0;
  --van-search-content-background: var(--background-color-w);

  .card {
    width: 100%;
    border-radius: 8px;
    background-color: #ffffff;
    padding: 12px;

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
    }

    .body {
      width: 100%;
      height: auto;
    }
  }
}
</style>
