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

      <van-empty description="暂无阅读数据" v-if="isEmpty" />
      <van-space v-else direction="vertical" fill size="16px">
        <div
            class="item"
            v-for="book in historyList"
            @click="onItemClick(book)"
        >
          <img :src="book.cover" :alt="book.name">
          <div class="center">
            <div class="name van-ellipsis">{{ book.name }}</div>
            <div class="read-to van-ellipsis">{{ book?.readToChapter?.name || "-" }}</div>
          </div>
          <button class="btn" @click.stop="onItemBtnClick(book)">
            <button v-if="showEdit" class="select" :class="{active: book.isSelect}">
              <van-icon name="success" size="18"/>
            </button>
            <span v-else-if="!showEdit && book.inShelf" class="open" @click="onOpen(book)">打开</span>
            <span v-else-if="!showEdit && !book.inShelf" class="add-shelf" @click="onAddShelf(book)">加入书架</span>
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
import {addShelf, delHistory, history} from "../../api/bookshelf";
import {showToast} from "vant";
import {toRead} from "../../router/page";
const isEmpty = ref(false)
const router = useRouter();
const historyList = ref<any>([]);
const pageLoading = ref(true);
history()
    .then(e => {
      if (e.length === 0){
        isEmpty.value = true;
        return;
      }
      historyList.value = e;
    })
    .catch(e => showToast(e.message));
const onAddShelf = (book) => {
  addShelf(book.id)
      .then(e => {
        showToast({message:"添加成功"})
        book.inShelf = true;
      })
}
const onOpen = (e) => {
  toRead(e.id, e.readToChapter.id);
}


const showEdit = ref(false);
const onClickRight = () => showEdit.value = true;
const onSelectAll = () => historyList.value.forEach((e: any) => e.isSelect = true);
const onItemBtnClick = (e: any) => {
  if (showEdit.value) {
    e.isSelect = !e.isSelect;
  } else {

  }
}
const onItemClick = (e: any) => {
  if (showEdit.value) {
    e.isSelect = !e.isSelect;
  } else {

  }
}
/**
 * @param deleted 是否删除所选的
 */
const onCloseEdit = (deleted = false) => {
  showEdit.value = false;
  if (deleted) {
    let del:any = [];
    // 本地删除
    let newList = historyList.value.filter((e: any) => {
      if (e.isSelect){
        del.push(e.id);
        return false;
      }
      return true;
    });
    delHistory(del)
        .then(e=>{
          historyList.value = newList;
          showToast("删除成功");
        })
        .catch(({message})=>showToast(message))
  } else {
    // 取消编辑
    historyList.value.forEach((e: any) => e.isSelect = false);
  }
}
router.onBack = () => {
  if (showEdit.value) {
    onCloseEdit();
    return false;
  } else {
    return true;
  }
}
</script>

<style scoped lang="less">
.history-view {
  width: 100%;

  .body {
    padding: 16px 16px 58px;
    position: relative;

    .item {
      height: 72px;
      display: flex;

      img {
        width: 52px;
        height: 72px;
        border-radius: 4px;
        margin-right: 12px;
        flex-shrink: 0;
      }

      .center {
        width: 0;
        height: 72px;
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding: 4px 0;

        .name {
          color: var(--text-color-primary);
        }

        .read-to {
          color: var(--text-color-placeholder);
          font-size: 12px;
        }
      }

      .btn {
        height: 72px;
        flex-shrink: 0;
        flex-grow: 0;

        span {
          display: inline-block;
          width: 78px;
          line-height: 26px;
          border-radius: 13px;
          height: 26px;
          padding: 0 14px;
          border: 1px solid var(--border-color-light);
          font-size: 12px;

          &.add-shelf {
            color: orangered;
            border-color: orangered;
          }
        }

        .select {
          width: 24px;
          height: 24px;
          border-radius: 100%;
          padding: 0;
          border: 1px solid orangered;
          color: #FFFFFF;
          margin-right: 8px;

          &.active {
            background-color: orangered;
          }
        }
      }
    }
  }
}
</style>
