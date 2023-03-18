<template>
  <yun-comment is-root :data="data" @comment="onComment" @list="children.show = true"/>
<!--  <yun-textarea @send="onSend" v-model:focus="focus"/>-->
  <yun-children-panel v-model:show="children.show" />
</template>

<script lang="ts" setup>
import YunTextarea from './src/textarea.vue';
import YunComment from './src/comment.vue';
import YunChildrenPanel from './src/children-panel.vue';
import {nextTick, reactive, ref} from "vue";
const data = ref({
  nickName:"书友001",
  avatar: "/src/assets/image/avatar/boy.png",
  content:"评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",
  isLike: true,
  likeNum: 10,
  replaySize: 10,
  isRoot: true
});
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
const children = reactive({
  show: false,
  loading: false,
  finished: false
});
const list = ref<any>([]);
const onLoad = ()=>{
  setTimeout(()=>{
    let a = data.value;
    list.value.push(a,a,a);
    nextTick(()=>{
      children.loading = false;
      if (list.value.length >= 15){
        children.finished = true;
      }
    })
  }, 1000);
}
</script>
