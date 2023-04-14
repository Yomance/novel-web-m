<template>
  <canvas width="375" height="667"></canvas>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {Main} from "/src/views/page/Main";

onMounted(()=>{
  const app = document.body;
  const w = app.offsetWidth;
  const h = app.offsetHeight;
  const c = document.getElementsByTagName('canvas')[0];
  new Main(c,w,h);
})
</script>
<style>
#app{
  background-color: #d7d7d7;

}
canvas{
  width: 100%;
  height: 100%;
}
</style>