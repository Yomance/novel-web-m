<template>
  <canvas width="375" height="667"></canvas>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import {Main} from "/src/views/page/Main";

onMounted(()=>{
  const c = document.getElementsByTagName('canvas')[0];
  new Main(c);
})
</script>
<style>
#app{
  background-color: #d7d7d7;
  overflow: hidden;
}
canvas{
  width: 100%;
  height: 100%;
}
</style>