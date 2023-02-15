<template>
  <div class="search-view">
    <status-bar color="black" fixed/>
    <van-search
        ref="searchRef"
        v-model="searchStore.value"
        :placeholder="searchStore.defaultValue"
        show-action
        @search="searchStore.search(router)"
    >
      <template #action>
        <div @click="searchStore.search(router)">搜索</div>
      </template>
    </van-search>
    <div class="content">
      <router-view/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StatusBar from "../../components/StatusBar.vue";
import {useSearchStore} from "./store";
import {useRouter} from "vue-router";

const router = useRouter();
const searchStore = useSearchStore();
if (router.currentRoute.value.name == "SearchResult") {
  if (router.currentRoute.value.query.kw) {
    searchStore.value = <string>router.currentRoute.value.query.kw;
  } else {
    router.replace({name: "SearchHome"})
  }
}
</script>

<style lang="less" scoped>
.search-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .content {
    width: 100%;
    height: 0;
    overflow: auto;
    flex-grow: 1;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
