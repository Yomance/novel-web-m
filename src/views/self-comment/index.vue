<template>
  <div class="self-comment" >

  <van-nav-bar title="评论记录" placeholder left-arrow @click-left="router.back()"/>
  <van-empty description="暂无阅读数据" v-if="isEmpty" />
  <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      v-else>
    <van-swipe-cell v-for="item in list" >
      <template #left>
        <van-button style="height: 100%" square type="danger" text="删除" />
      </template>
      <van-cell>
        <template #title>
          <p class="van-ellipsis">{{item.content}}</p>
        </template>
        <template #label>
          <span>发布时间：{{item.createTime}}</span>
          <span style="float: right">点赞：{{item.likeNum}}</span>
        </template>
      </van-cell>
      <template #right>
        <van-button style="height: 100%" square type="primary" text="详情" />
      </template>
    </van-swipe-cell>
  </van-list>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
import {selfPage} from "/src/api/comment";
const router = useRouter();
const list = reactive([]);
const loading = ref(false);
const finished = ref(false);
const isEmpty = ref(false);
let currentPage = 1;
const onLoad = ()=>{
  selfPage(currentPage).then(e=>{
    finished.value = e.totalPage === currentPage
    currentPage = e.current+1;
    list.push(...e.data);
  }).finally(()=>loading.value = false);
}


</script>

<style scoped lang="less">
.self-comment{
  width: 100%;
  height: 100%;
  /deep/.van-cell__title{
    width: 100%;
  }
}
</style>