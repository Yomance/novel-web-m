<template>
  <van-swipe :autoplay="2000" class="home-banner" indicator-color="white">
    <van-swipe-item v-for="item in value" class="banner-item" @click="onBannerClick(item)">
      <img :src="item.img" alt="" class="banner-image">
    </van-swipe-item>
  </van-swipe>
</template>

<script lang="ts" setup>
import {PropType} from "vue";
import {Banner} from "../type";

const props = defineProps({
  value: {
    type: Array as PropType<Banner[]>,
    default: []
  }
});

const onBannerClick = (banner: Banner) => {
  const {src} = banner;
  if (!src){
    return;
  }
  if (src.startsWith("http") || src.startsWith("//")) {
    window.open(src);
    return;
  }
  window.location.href = src;
}
</script>

<style lang="less" scoped>
.home-banner {
  width: 100%;
  height: 100px;
  border-radius: 8px;
  overflow: hidden;
  .banner-image {
    width: 100%;
    height: auto;
  }
}
</style>
