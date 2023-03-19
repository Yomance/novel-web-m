<template>
  <van-popup
      :show="show"
      :style="{ height: '95%' }"
      position="bottom"
      round
      style="padding: 16px 0 54px 0;"
      @open="onOpen"
      @update:show="e=>emits('update:show', e)"
  >
    <div class="content">
      <div class="empty" v-if="isEmpty" >
        <img style="max-width: 100%;" src="/static/image/no-comment-1.png" alt="暂无评论">
        <div>暂无评论</div>
        <p>快来评论一下吧！</p>
      </div>
      <van-list
          v-else
          :finished="finished"
          :loading="loading"
          finished-text="没有更多了"
          @load="loadData"
          @update:loading="e=>loading = e"
      >
        <template v-for="c in list">
          <yun-comment
              :data="c"
              is-root
              style="padding-bottom: 16px;"
              @comment="onComment"
              @list="openChildren(c)"
          />
          <div class="van-hairline--bottom" style="margin-bottom: 16px;"></div>
        </template>
      </van-list>
    </div>
    <yun-child-list v-model:show="showChildren" :parent="currentComment"/>
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
import YunChildList from './children-panel.vue';
import {nextTick, reactive, ref} from "vue";
import {addComment, page} from "../../api/comment";
import {showToast} from "vant";
import {useRouter} from "vue-router";

const emits = defineEmits(['update:show']);
const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  bid: {
    type: String,
    required: true,
  },
  cid: { // 章节id
    type: String,
    required: true,
  },
  sid: { // 段落id
    type: String,
    required: false,
  },
  text: { // 被评论的内容
    type: String,
    required: false,
  }
});
const list = reactive<any[]>([]);
const loading = ref(false);
const finished = ref(false);
const current = ref(1);
const onOpen = () => {
  isEmpty.value = false;
  // 清空原先列表 重新加载
  list.splice(0, list.length);
  current.value = 1;
  finished.value = false;
  loading.value = true;
  loadData();
}
const isEmpty = ref(false);
const loadData = () => {
  page(current.value, props.cid, {segmentId: props.sid})
      .then((e: any) => {
        current.value = e.current + 1;
        if (!e.data){
          isEmpty.value = true;
          finished.value = true;
          return;
        }
        list.push(...e.data);
        finished.value = list.length >= e.total;
        isEmpty.value = false;
      })
      .catch(e => console.error("err: ", e))
      .finally(() => nextTick(() => loading.value = false));
}
///////////////////////////////////////////////////////////
const showChildren = ref(false);
const openChildren = (e: any) => {
  currentComment.value = e;
  showChildren.value = true;
}
const currentComment = ref();
////////////////////////////////////
const content = ref("");
// 输入框是否获得焦点
const focus = ref(false);

// 点击评论按钮
function onComment(e: any) {
  focus.value = false;
  content.value = "";
  currentComment.value = e;
  setTimeout(()=> focus.value = true);
}

// 点击发送
const onSend = () => {
  let parentId = currentComment.value?.id;
  let replyUser = currentComment.value?.userId;
  addComment(props.bid, props.cid, content.value, props.sid, parentId, replyUser)
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

const router = useRouter();
router.onBack = ()=>{
  if (showChildren.value){
    showChildren.value = false;
    return false;
  }
  if (props.show){
    emits('update:show', false);
    return false;
  }
  router.onBack = ()=>true;
  return true;
}
</script>
<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0 16px;
  .empty{
    width: 100%;
    height: 100%;
    div{
      font-size: 18px;
      text-align: center;
      line-height: 30px;
      color: #666666;
    }
    p{
      text-align: center;
      line-height: 28px;
      font-size: 15px;
      color: #999999;
    }
  }
}
</style>
