<template>
  <div class="classify-result-view">
    <van-nav-bar
        :border="false"
        :title="title"
        fixed
        left-arrow
        placeholder
        @click-left="router.back()"
        @click-right="router.push({name: 'Search'})"
    >
      <!--      <template #right>-->
      <!--        <van-icon name="search" size="18"/>-->
      <!--      </template>-->
    </van-nav-bar>

<!--    <div class="filter">-->
<!--      <div :class="{active: active === 0}" class="item" @click="active = 0">最热</div>-->
<!--      <div :class="{active: active === 1}" class="item" @click="active = 1">最新</div>-->
<!--      <div :class="{active: active === 2}" class="item" @click="active = 2">字数</div>-->
<!--      <div :class="{active: active === 3}" class="item" @click="active = 3">评分</div>-->
<!--    </div>-->
    <van-list
        v-model:loading="loading"
        :finished="finished"
        class="content"
        finished-text="没有更多了"
        @load="onLoadData"
    >
      <van-space direction="vertical" fill size="16px">
        <book-card v-for="item in list" :book="item"/>
      </van-space>
    </van-list>
  </div>
</template>

<script lang="ts" setup>
import {nextTick, ref, watch} from "vue";
import BookCard from "../../components/book-card/index.vue";
import {useRoute, useRouter} from "vue-router";
import axios from "axios";
import {http, Page, Result} from "../../api";
import {Book} from "../../type/book";

const router = useRouter();
const route = useRoute();
const active = ref(0);
const list = ref<Book[]>([]);
const loading = ref(false);
const finished = ref(false);
const current = ref(1);
// 加载路由中的信息
const type: "category" | "tag" = <"category" | "tag">route.query.type;
const name: string = <string>route.query.name;
const id: string = <string>route.query.id;
//
const title = ref(name);
// 加载数据
const onLoadData = () => {
  loading.value = true;
  http
      .get<Page<Book>, Page<Book>>(`/classify/books/${type}/${id}`, {
        params: {
          current: current.value,
          size: 10,
        }
      })
      .then(({data}) => {
        if (data == null){
          finished.value = true;
          return;
        }
        current.value++;
        list.value.push(...data);

        // 数据全部加载完成
        if (data.length < 10) {
          finished.value = true;
        }
      })
      .finally(() => {
        // 加载状态结束
        loading.value = false;
      })
}
onLoadData();
</script>

<style lang="less" scoped>
.classify-result-view {
  width: 100%;

  .filter {
    width: 100%;
    display: flex;
    padding: 8px 16px;
    height: 46px;
    line-height: 30px;
    font-size: 14px;

    .item {
      margin-right: 10px;
    }

    .item.active {
      color: #409EFF;
    }
  }

  .content {
    padding: 8px 16px 16px 16px;
  }
}
</style>

