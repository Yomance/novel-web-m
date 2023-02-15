<template>
  <div class="history-view">
    <van-nav-bar
        fixed
        left-arrow
        placeholder
        title="阅读历史"
        right-text="编辑"
        @click-left="router.back()"
        @click-right="onClickRight"
    />
    <div class="body">
      <van-space  direction="vertical" fill size="16px">
        <div
            class="item"
            v-longpress="()=>onItemLongPress(e)"
            v-for="e in historyList"
            @click="onItemClick(e)"
        >
          <img :src="e.cover" :alt="e.name">
          <div class="center">
            <div class="name van-ellipsis">{{ e.name }}</div>
            <div class="read-to van-ellipsis">{{ e.readTo }}</div>
          </div>
          <button class="btn" @click.stop="onItemBtnClick(e)">
            <button v-if="showEdit" class="select" :class="{active: e.isSelect}">
              <van-icon name="success" size="18" />
            </button>
            <span v-else-if="!showEdit && e.inShelf" class="open">打开</span>
            <span v-else-if="!showEdit && !e.inShelf" class="add-shelf">加入书架</span>
          </button>
        </div>
      </van-space>
      <loading-animation :loading="pageLoading"/>
    </div>
  </div>
  <van-popup :overlay="false" v-model:show="showEdit" position="top">
    <van-nav-bar
        title="请选择图书"
        right-text="全选"
        @click-right="onSelectAll"
    />
  </van-popup>
  <van-popup :overlay="false" v-model:show="showEdit" position="bottom">
    <div style="display: flex">
      <van-button icon="delete" type="danger" block @click="onCloseEdit(true)">删除</van-button>
      <van-button icon="revoke" type="default" block @click="onCloseEdit(false)">取消</van-button>
    </div>
  </van-popup>

</template>

<script lang="ts" setup>
import {useRouter} from "vue-router";
import {onUnmounted, ref, watch} from "vue";
import LoadingAnimation from "../../components/LoadingAnimation.vue";
const router = useRouter();
const historyList = ref<any>([]);
const pageLoading = ref(true);
setTimeout(()=>{
  for (let i = 1; i < 17; i++) {
    historyList.value.push({
      id: i+"",
      cover: `/src/assets/cover${i & 1 ? "":"1"}.jpg`,
      name:"大唐开局震惊李世民",
      readTo:`第${i}章 不吹牛逼会死吗？`,
      inShelf: Math.random() > 0.5,
      isSelect: false
    })
  }
  pageLoading.value = false;
}, 1500);

const showEdit = ref(false);
const onClickRight = ()=> showEdit.value = true;
const onSelectAll = ()=> historyList.value.forEach((e:any)=>e.isSelect = true);
const onItemBtnClick = (e:any)=>{
  if (showEdit.value){
    e.isSelect = !e.isSelect;
  }else {

  }
}
const onItemClick = (e:any)=>{
  if (showEdit.value){
    e.isSelect = !e.isSelect;
  }else {

  }
}
const onItemLongPress = (e:any)=>{
  e.isSelect = true;
  showEdit.value = true;
}
/**
 * @param deleted 是否删除所选的
 */
const onCloseEdit = (deleted = false)=>{
  showEdit.value = false;
  if (deleted){
    // 本地删除
    historyList.value = historyList.value.filter((e:any)=> !e.isSelect);
    // todo 网络删除
  }else {
    // 取消编辑
    historyList.value.forEach((e:any)=>e.isSelect = false);
  }
}
router.onBack = ()=>{
  if (showEdit.value){
    onCloseEdit();
    return false;
  }else {
    return true;
  }
}
</script>

<style scoped lang="less">
.history-view{
  width: 100%;
  .body{
    padding: 16px 16px 58px;
    position: relative;
    .item{
      height: 72px;
      display: flex;
      img{
        width: 52px;
        height: 72px;
        border-radius: 4px;
        margin-right: 12px;
        flex-shrink: 0;
      }
      .center{
        width: 0;
        height: 72px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 4px 0;
        .name{
          color: var(--text-color-primary);
        }
        .read-to{
          color: var(--text-color-placeholder);
          font-size: 12px;
        }
      }
      .btn{
        height: 72px;
        flex-shrink: 0;
        flex-grow: 0;
        span{
          display: inline-block;
          width: 78px;
          line-height: 26px;
          border-radius: 13px;
          height: 26px;
          padding: 0 14px;
          border: 1px solid var(--border-color-light);
          font-size: 12px;
          &.add-shelf{
            color: orangered;
            border-color: orangered;
          }
        }
        .select{
          width: 24px;
          height: 24px;
          border-radius: 100%;
          padding: 0;
          border: 1px solid orangered;
          color: #FFFFFF;
          margin-right: 8px;
          &.active{
            background-color: orangered;
          }
        }
      }
    }
  }
}
</style>
