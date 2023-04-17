<template>
  <canvas width="375" height="667"></canvas>
</template>

<script lang="ts" setup>
import {onMounted, ref} from "vue";
import {getChapter} from "/src/api/chapter";
import {useRoute} from "vue-router";
import {Config} from "/src/views/page/Config";
import {TurnPageNovel} from "/src/views/page/TurnPageNovel";
const route = useRoute();
let bid: string = <string>route.query.bid;
let cid: string = <string>route.query.cid || "";
const current = ref();
const load = async (cid:string)=>{
  const res:any = await getChapter(bid, cid);
  current.value = res;
  return{
    id:res.id,
    name:res.name,
    content:res.content,
    isFirst: !res.lastId,
    isFinal: !res.nextId,
  }
}
const next = ()=> load(current.value.nextId);
const last = ()=> load(current.value.lastId);
const  emits = defineEmits(['click']);
let novel:TurnPageNovel;
onMounted(()=>{
  load(cid).then(res=>{
    console.log(res);
    const canvas = document.getElementsByTagName('canvas')[0];
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    const conf = new Config(devicePixelRatio|2, w,h,ctx);
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
#app{
  background-color: #d7d7d7;
  overflow: hidden;
}
canvas{
  width: 100%;
  height: 100%;
}
</style>