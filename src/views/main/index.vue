<template>
  <div class="main-view">
    <div class="con">
      <router-view/>
    </div>
    <van-tabbar route fixed placeholder active-color="#fcb70b">
      <van-tabbar-item v-for="e in list" replace  :to="{name:e.router}">
        <span>{{ e.label }}</span>
        <template #icon="props">
          <img :src="url('/image/tabbar/'+e.image+(props.active ? 'Cur':'')+'.png')" alt=""/>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import StatusBar from "../../components/StatusBar.vue";
import {url} from "/src/util/file";
const list = ref([
  {
    label:'首页',
    image:'home',
    router: 'Home'
  },{
    label:'分类',
    image:'classify',
    router: 'Classify'
  },{
    label:'书架',
    image:'home',
    router: 'Bookshelf'
  },{
    label:'我的',
    image:'mine',
    router: 'Mine'
  }
]);
</script>

<style lang="less" scoped>
.main-view {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--background-color);

  .con {
    width: 100%;
    height: 0;
    flex-grow: 1;
    overflow-y: auto;
  }
}
</style>
