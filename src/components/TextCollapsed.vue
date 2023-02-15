<template>
  <div class="text-collapsed" :class="{show, open}" @click="open = !open">
    <p class="text" ref="content">{{text}}</p>
    <span class="btn">展开</span>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref} from "vue";
const props = defineProps({
  lines:{
    type: Number,
    default: 3,
  },
  text:{
    type:String,
    required: true,
  }
});

const open = ref(false);
const show = ref(true);
const content = ref();
nextTick(()=>{
  if (content.value.scrollHeight <= 20*props.lines){
    open.value = true;
    show.value = false;
  }
})
</script>

<style scoped lang="less">
.text-collapsed {
  max-height: v-bind("lines*20+'px'");
  width: 100%;
  position: relative;
  overflow: hidden;
  &.open{
    max-height: none !important;
    span{
      display: none !important;
    }
  }
  &.show{
    span{
      display: inline-block;
    }
  }
  p {
    margin: 0;
    font-size: 14px;
    width: 100%;
    height: 100%;
    line-height: 20px;
    color: var(--van-gray-8);
  }
  span {
    display: none;
    position: absolute;
    padding: 0 5px 0 15px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    background-image: linear-gradient(to right, rgba(255, 255, 255, 0.2), #fff, #fff, #fff);
    color: var(--van-blue);
    bottom: 0;
    right: 0;
  }
}
</style>