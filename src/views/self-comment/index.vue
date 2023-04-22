<template>
  <div class="self-comment" >

  <van-nav-bar title="评论记录" placeholder left-arrow @click-left="router.back()"/>
  <van-empty description="暂无阅读数据" v-if="list.length === 0" />
  <van-list v-else>

  </van-list>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {reactive, ref} from "vue";
const router = useRouter();
const list = reactive([]);
const loading = ref(false);
const finished = ref(false);


</script>

<style scoped>
.self-comment{
  width: 100%;
  height: 100%;
}
</style>