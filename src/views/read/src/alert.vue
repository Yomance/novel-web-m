<template>
  <div class="alert" @click.stop>
    <div :class="{hidden: !show}" class="header">
      <status-bar :color="show ? 'white' : 'black' "/>
      <van-nav-bar :border="false" left-arrow @click-left="router.back()">
        <template #right>
            <span
                :style="{opacity: tmp ? 0.7: 1}"
                @click="onAddShelf"
                v-text="tmp?'已加书架':'加书架'"
            />
          <span @click="emits('showComment')">书评</span>
        </template>
      </van-nav-bar>
    </div>
    <div :class="{hidden: !show}" class="footer">
      <setting-list v-show="showSetting" />
      <chapter-selector v-show="!showSetting"/>
      <van-tabbar :border="false" :fixed="false">
        <van-tabbar-item
            icon="bars"
            @click="(showDir = true) && onSetShowValue(false)"
        >目录
        </van-tabbar-item>
        <van-tabbar-item
            :icon="!theme.isNight?'yejianmoshi':'rijianmoshixhdpi'"
            icon-prefix="iconfont icon"
            @click="theme.isNight = ! theme.isNight"
        >{{ !theme.isNight ? '夜' : '日' }}间
        </van-tabbar-item>
        <van-tabbar-item :icon="showSetting? 'setting':'setting-o'" @click="showSetting = !showSetting">设置
        </van-tabbar-item>
        <!--        <van-tabbar-item icon="ellipsis">更多</van-tabbar-item>-->
      </van-tabbar>
    </div>
    <chapter-dir v-model:show="showDir" :current="chapterStore.chapter.id"/>
  </div>
</template>
<script lang="ts" setup>
import {ref, watch} from "vue";
import {system} from "../../../util/system";
import {useRoute, useRouter} from "vue-router";
import {useReadThemeStore} from "../read-theme-store";
import StatusBar from "../../../components/StatusBar.vue";
import ChapterDir from './ChapterDir.vue';
import ChapterSelector from "./ChapterSelector.vue";
import SettingList from "./SettingList.vue";
import {useChapterStore} from "../../../store/chapter";

const chapterStore = useChapterStore();

const tmp = ref(false);

const theme = useReadThemeStore();
const props = defineProps({
  show: { // 是否显示菜单
    type: Boolean,
    required: true,
  }
});
const emits = defineEmits(["update:show", "chapter:update", 'showComment']);
////////////////////////////////////////////////////////
const router = useRouter();
const route = useRoute();
// 书籍id
const bid: string = <string>route.query.b;
// 章节id
const cid: string = <string>route.query.c;
// 章节序号
const cnum: string = <string>route.query.c;
console.log(bid, cid, cnum);
////////////////////////////////////////////////////////

const onSetShowValue = (b: boolean) => {
  emits("update:show", b);
}
watch(() => props.show, (b) => {
  // 当底部菜单隐藏时 关闭setting菜单
  !b && showSetting.value && (showSetting.value = false);
})

// 章节总数
const chapterCount = ref(100);
// 当前章节
const chapterCurrent = ref(20);
// 章节切换时触发
const onChapterChange = (size: 0 | -1 | 1) => {
  const newVar = chapterCurrent.value + size;
  // 已经是第一章或者最后一章了
  if (newVar == 0 || newVar > chapterCount.value) return;
  chapterCurrent.value = newVar;
  emits("chapter:update", size);
}

// 将本书加入书架
const onAddShelf = () => {

}
// 当前是否为夜间模式
const isNight = ref(false);
// 切换日间夜间模式
const onModeChange = () => {
  isNight.value = !isNight.value;
}
// 是否显示目录
const showDir = ref(false);
// 是否显示setting list
const showSetting = ref(false);
// 当前亮度值
const brightnessCurrent = ref(100);
// 亮度跟随系统
const brightnessAutoSystem = ref(false);
// 监听并设置亮度跟随系统
watch(brightnessAutoSystem, (v, a, b) => {
  alert("暂不支持此功能")
});
/**
 * 亮度拖动时跟随触发
 * @param v 当前亮度
 */
const onBrightnessChange = (v: number) => {
  system.brightness(v);
}
</script>

<style lang="less" scoped>
.alert {
  --a-back-color: #000000;
  --a-text-color: #e7e7e7;
  --a-active-opacity: 0.7;
  --a-simple-back-color: #777;

  .header {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    transition: top .5s;
    background-color: var(--a-back-color);
    --van-nav-bar-background: transparent;
    --van-nav-bar-title-text-color: var(--a-text-color);
    --van-nav-bar-icon-color: var(--a-text-color);
    --van-nav-bar-arrow-size: 20px;
    --van-active-opacity: 1;

    &.hidden {
      top: -20%;
    }

    span {
      color: var(--a-text-color);

      &:active {
        opacity: var(--a-active-opacity);
      }

      &:nth-child(1) {
        margin-right: 12px;
      }
    }
  }

  .footer {
    z-index: 99;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    transition: bottom .5s;
    display: flex;
    flex-direction: column;
    color: #FFFFFF;
    background: var(--a-back-color);
    padding-bottom: 16px;
    --van-tabbar-item-active-background: transparent;
    --van-tabbar-background: transparent;
    --van-tabbar-item-active-color: var(--a-text-color);
    --van-tabbar-item-text-color: var(--a-text-color);
    &.hidden {
      bottom: -20%;
    }
  }
}
</style>
