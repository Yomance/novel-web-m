<template>
  <van-popup
      style="padding: 16px 0 54px 0;"
      round
      :show="show"
      @update:show="e=>emits('update:show', e)"
      position="bottom"
      :style="{ height: '90%' }"
      @open="onOpen"
  >
    <div class="content">
      <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="loadData"
      >
        <template v-for="c in list" >
          <yun-comment :data="c" style="padding-bottom: 16px;" @comment="onComment" show-reply-user/>
          <div class="van-hairline--bottom" style="margin-bottom: 16px;"></div>
        </template>
      </van-list>
    </div>
    <yun-textarea
        v-model:focus="focus"
        v-model:text="content"
        @blur="currentComment = null"
        @send="onSend"
    />
  </van-popup>
</template>

<script lang="ts" setup>
import YunComment from './comment.vue';
import YunTextarea from './textarea.vue';
import {nextTick, reactive, ref} from "vue";
import {addComment, page} from "../../api/comment";
import {showToast} from "vant";
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
const current = ref(1);
const onOpen = () => {
  // 清空原先列表 重新加载
  list.splice(0, list.length);
  current.value = 1;
  finished.value = false;
}


const loadData = ()=>{
  page(
      current.value,
      props.parent?.chapterId,
      {segmentId: props.parent?.sid, replyId: props.parent?.id}
  )
      .then((e:any) => {
        current.value = e.current+1;
        if (!e.data) finished.value = true;
        list.push(...e.data);
        finished.value = list.length >= e.total;
      })
      .catch(e => console.error("err: ", e))
      .finally(() => nextTick(()=>loading.value = false));
}
///////////////////////////////////////////////////////////
const content = ref("");
const currentComment = ref();
// 输入框是否获得焦点
const focus = ref(false);
// 点击评论按钮
function onComment(e: any) {
  content.value = "";
  currentComment.value = e;
  focus.value = true;
}
// 点击发送
const onSend = ()=>{
  // todo let parentId = currentComment.value?.id;
  let replyUser = currentComment.value?.userId;
  addComment(
      props.parent?.bookId,
      props.parent?.chapterId,
      content.value,
      props.parent?.segmentId,
      props.parent?.id,
      replyUser
  )
      .then(e => {
        showToast("发布成功");
        current.value = 1;
        finished.value = false;
        content.value = "";
        list.splice(0, list.length);
        loading.value = true;
        loadData();
        currentComment.value = null;
      })
      .catch(({message}) => showToast(message))
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
