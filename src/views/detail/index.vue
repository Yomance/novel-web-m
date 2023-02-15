<template>
  <div class="detail">
    <van-nav-bar
        :border="false"
        :class="{show:showNavTitle}"
        left-arrow
        @click-left=""
        @click-right="showShare = true"
    >
      <template #title>
        <img alt="" src="/src/assets/image/cover/cover0.jpg" style="height: 100%">
        <div class="text">
          <div class="title">测试测试加测试</div>
          <div class="type">玄幻·东方玄幻</div>
        </div>
      </template>
      <template #right>
        <van-icon name="ellipsis" size="20"/>
      </template>
    </van-nav-bar>
    <main @scroll="pageScroll" class="no-scroll-bar">
      <article class="title-container">
        <img alt="" class="book-cover-blur" src="/src/assets/image/cover/cover0.jpg">
        <div class="title-body">
          <img alt="" src="/src/assets/image/cover/cover0.jpg">
          <div class="text">
            <div class="title van-ellipsis">测试测试加测试测试测试加测试测试测试加测试测试测试加测试</div>
            <div class="author van-ellipsis">天蚕土豆 ></div>
            <div class="type van-ellipsis">玄幻·东方玄幻</div>
          </div>
        </div>
      </article>
      <article class="body-container gap-y-8">
        <div class="tags gap-8">
          <div class="tag">篮球</div>
          <div class="tag">nba</div>
          <div class="tag">篮球</div>
        </div>
        <text-collapsed text="测试测试测试测试测试测试测试测测试测试测试测试测试测测试测试加测试测试测试加测试测试测试加测试测试测试加测试试测测试测试测试测试测试1测试测试测试测试"/>
        <div class="dir gap-8" @click="showDir = true">
          <div class="title">目录</div>
          <div class="text van-ellipsis">最新章节 第一百一十五章 名人的特权以及航空材料院的邀请</div>
          <div class="times">23分钟前</div>
          <van-icon name="arrow"/>
        </div>
      </article>
      <div v-for="i in 100" style="height: 10px"></div>
      <van-action-bar>
        <van-action-bar-icon icon="orders-o" text="加入书架"/>
        <van-action-bar-icon icon="orders-o" text="收藏"/>
        <van-action-bar-button text="立即阅读" type="danger"/>
      </van-action-bar>
    </main>
  </div>
  <van-share-sheet
      v-model:show="showShare"
      :options="options"
      title="立即分享给好友"
      @select="shareClick"
  />
</template>

<script lang="ts" setup>
import {ref} from "vue";
import TextCollapsed from "../../components/TextCollapsed.vue";
const showShare = ref(false);
const cover = "/src/assets/image/book.jpg";

const options = [
  {name: '微信', icon: 'wechat'},
  {name: '朋友圈', icon: 'wechat-moments'},
  {name: '微博', icon: 'weibo'},
  {name: 'QQ', icon: 'qq'},
]
const shareClick = (op: any, index: number) => {
}
// 是否显示nav的title
const showNavTitle = ref(false);
const navBackground = ref('rgba(51,51,51,0)');
const pageScroll = (e: Event) => {
  const top = (<HTMLElement>e.target).scrollTop;
  let v = (top / 120);
  if (v > 1) return;
  navBackground.value = `rgba(51,51,51,${v})`;
  showNavTitle.value = top > 50;
}
// 是否显示目录
const showDir = ref(false);
</script>

<style lang="less" scoped>
@import "index";
///deep/ .van-nav-bar {
//  background-color: v-bind(navBackground);
//}
</style>
