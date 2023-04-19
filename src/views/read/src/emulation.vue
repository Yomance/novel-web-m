<template>
  <canvas width="375" height="667"></canvas>
</template>

<script lang="ts" setup>
import {onMounted, ref, watch} from "vue";
import {getChapter} from "/src/api/chapter";
import {useRoute} from "vue-router";
import {Config, getConf} from "/src/components/EmulationTurnPage/Config";
import {TurnPageNovel} from "/src/components/EmulationTurnPage/TurnPageNovel";
import {useReadSettingStore} from "/src/views/read/setting";
import {ThemeConstants, useReadThemeStore} from "/src/views/read/read-theme-store";
import {useChapterStore} from "/src/store/chapter";
const settingStore = useReadSettingStore();
const themeStore = useReadThemeStore();
const route = useRoute();
const chapterStore = useChapterStore();
let bid: string = <string>route.query.bid;
let cid: string = chapterStore.chapterId||<string>route.query.cid || "";
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
    const canvas = document.getElementsByTagName('canvas')[0];
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
    const conf = new Config(devicePixelRatio|2, w,h,ctx,getConf({
      color: themeStore.color,
      backgroundColor: themeStore.background.includes("u") ? '#edd19c':themeStore.background,
      fontSize: themeStore.fontSize,
    }));
    settingStore.conf = conf;
    canvas.width = conf.pageWidth;
    canvas.height = conf.pageHeight;
    novel = new TurnPageNovel(conf, res, next, last);
    settingStore.novel = novel;
    novel.onclick = function (){
      emits('click');
    }
    watch(()=>themeStore.isNight, ()=>{
      if (themeStore.isNight){
        conf.color = ThemeConstants.NIGHT_COLOR;
        conf.backgroundColor = ThemeConstants.NIGHT_BACKGROUND;
      }else {
        conf.color = themeStore.color;
        conf.backgroundColor = themeStore.background;
      }
      novel.flush();
    })
  })
})
</script>
<style>
canvas{
  width: 100%;
  height: 100%;
}
</style>