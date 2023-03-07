<template>
  <van-empty
    v-if="show === 'nologin'"
    description="登陆后查看书架"
    image="error"
  >
    <van-button
      round
      style="width: 200px"
      type="primary"
      @click="router.push({ name: 'Login' })"
      >去登陆</van-button
    >
  </van-empty>
  <button v-else-if="show === 'loading'" style="width: 100%; height: 100%">
    <van-loading size="24px">加载中...</van-loading>
  </button>
  <van-empty v-else-if="show === 'empty'" description="空荡荡的书架等你来填满">
    <van-button
      round
      size="small"
      style="width: 100px"
      type="danger"
      @click="router.push({ name: 'Home' })"
      >去书城
    </van-button>
  </van-empty>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { defineProps, PropType } from "vue";
let router = useRouter();
defineProps({
  show: {
    type: String as PropType<"nologin" | "loading" | "empty">,
  },
});
</script>
