<template>
  <div class="search-view">
    <status-bar color="black" fixed/>
    <van-search
        ref="searchRef"
        v-model="kw"
        :placeholder="defaultValue"
        show-action
        @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <div class="content">
      <van-space class="list" direction="vertical" fill size="16px">
        <book-card v-for="item in books" :book="item"/>
      </van-space>
    </div>
  </div>
</template>

<script lang="ts" setup>
import StatusBar from "../../components/StatusBar.vue";
import {nextTick} from "vue";
import BookCard from '../../components/book-card/index.vue';
import {useRoute} from "vue-router";
import {search} from "../../api/book";
import {showLoadingToast} from "vant";
import {kw, books} from "./store";
const route = useRoute();
const defaultValue = <string>route.query.kw || "";
function onSearch(){
  kw.value = kw.value ? kw.value: defaultValue;
  route.query.kw = kw.value
  const toast = showLoadingToast({message: '加载中...', forbidClick: true, duration:0});
  search(kw.value)
      .then((e:any)=> books.value.clearAndAddList(e))
      .catch(({message})=>{})
      .finally(()=>nextTick(toast.close));
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
    padding: 16px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
