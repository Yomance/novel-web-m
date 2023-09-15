<template>
  <canvas width="375" height="667"></canvas>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {Config, getConf} from "/src/components/EmulationTurnPage/Config";
import {TurnPageNovel} from "/src/components/EmulationTurnPage/TurnPageNovel";
import {getChapter} from "./moke";
const current = ref();
const load = async ()=>{
  const res:any = await getChapter();
  current.value = res;
  return{
    id:res.id,
    name:res.name,
    content:res.content,
    isFirst: !res.lastId,
    isFinal: !res.nextId,
  }
}
const next = ()=> load();
const last = ()=> load();
const  emits = defineEmits(['click']);
let novel:TurnPageNovel;
onMounted(()=>{
  load().then(res=>{
    const canvas = document.getElementsByTagName('canvas')[0];
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    const conf = new Config(devicePixelRatio|2, w,h,ctx,getConf({}));
    canvas.width = conf.pageWidth;
    canvas.height = conf.pageHeight;
    novel = new TurnPageNovel(conf, res, next, last);
    novel.onclick = function (){
      emits('click');
    }
  })
})
</script>
<style>
canvas{
  width: 100%;
  height: 100%;
}
</style>