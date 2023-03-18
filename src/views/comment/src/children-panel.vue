<template>
  <van-popup
      style="padding: 16px 0 54px 0;"
      round
      :show="show"
      @update:show="e=>emits('update:show', e)"
      position="bottom"
      :style="{ height: '90%' }"
  >
    <div class="content">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadData"
      >
        <template v-for="c in list" >
          <yun-comment :data="c" style="padding-bottom: 16px;" @comment="onComment"/>
          <div class="van-hairline--bottom" style="margin-bottom: 16px;"></div>
        </template>
      </van-list>
    </div>
    <yun-textarea  @send="onSend" v-model:focus="focus"/>
  </van-popup>
</template>

<script lang="ts" setup>
import YunComment from './comment.vue';
import YunTextarea from './textarea.vue';
import {nextTick, reactive, ref, watch} from "vue";
const emits = defineEmits(['update:show']);
const props = defineProps({
  show:{
    type: Boolean,
    default: false,
  },
  parent: {
    type: Object,
  }
});
const list = reactive<any[]>([]);
const loading = ref(false);
const finished = ref(false);
watch(()=>props.show, (show)=>{
  if (show){
    list.splice(0, list.length);
    finished.value = false;
  }
})

const data = {
  nickName:"书友001",
  avatar: "/src/assets/image/avatar/boy.png",
  content:"评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
  isLike: true,
  likeNum: 10,
  replaySize: 10,
  isRoot: true
};

const loadData = ()=>{
  setTimeout(()=>{
    list.push(data,data,data);
    nextTick(()=>{
      loading.value = false;
      if (list.length >= 15){
        finished.value = true;
      }
    })
  }, 1000);
}
///////////////////////////////////////////////////////////
// 输入框是否获得焦点
const focus = ref(false);
// 点击发送
const onSend = (s:string)=>{
  console.log(s);
}
// 点击评论按钮
function onComment(){
  focus.value = true;
}
</script>
<style scoped lang="less">
.content{
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 16px;
}
</style>
