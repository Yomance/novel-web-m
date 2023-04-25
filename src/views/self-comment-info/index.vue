<template>
  <van-nav-bar title="评论详情" placeholder left-arrow @click-left="router.back()"/>
  <div class="self-comment-info">
    <van-empty description="暂无阅读数据" v-if="!data"/>
    <van-space v-show="data.id" direction="vertical" fill :size="16">
      <div class="book">
        <img :src="data.bookCover" alt="">
        <div class="text">
          <p>{{data.bookName}}</p>
          <p style="color: #777777; font-size: 14px" @click="router.push('/read?bid='+data.bookId+'&cid='+data.chapterId)">{{data.chapterName}} > </p>
        </div>
      </div>
      <div class="van-hairline--top" style="margin: 16px 0"></div>
      <p class="content">{{data.content}}</p>
      <p class="foot"><span>评论时间:{{data.createTime}}</span><span>点赞:{{data.likeNum}}</span></p>
      <van-button block type="danger" @click="deleteComment">删除</van-button>
    </van-space>
  </div>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {nextTick, ref} from "vue";
import {del, info} from "/src/api/comment";
import {showConfirmDialog, showFailToast, showLoadingToast, showSuccessToast} from "vant";
const router = useRouter();
const route = useRoute();
const commentId:string = <string>route.params.id;
const data = ref<any>({});
const toast = showLoadingToast({message:"加载中", duration: 0, mask:true});
info(commentId).then(e=>{
  data.value = e;
  nextTick(()=>toast.close());
}).catch(e=>{
  showFailToast(e.message);
  toast.close();
});
const deleteComment = ()=>{
  showConfirmDialog({title: '警告', message:"删除后不可恢复",}).then(() => {
    del(commentId).then(e=>{
      showSuccessToast({message:"删除成功！", onClose:()=> router.back()}, );
    }).catch(({message})=>showFailToast(message));
  })
}
</script>

<style scoped lang="less">
.self-comment-info{
  padding: 16px;
  .book{
    width: 100%;
    display: flex;
    img {
      width: 75px;
      height: 100px;
      border-radius: 5px;
      margin-right: 10px;
      flex: 0;
    }
    .text{
      padding: 10px 0;
      p{
        line-height: 40px;
      }
    }
  }
  .content{
    color: #444;
    font-size: 16px;
    line-height: 26px;
  }

  .foot{
    font-size: 13px;
    line-height: 26px;
    color: #777777;
    display: flex;
    justify-content: space-between;
  }
}
</style>