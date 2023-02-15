<template>
  <div class="bookshelf-view" @scroll="e">
    <div class="header">
      <div class="header-fixed">
        <status-bar/>
        <van-grid :border="false" column-num="3" icon-size="20">
          <van-grid-item :to="{name: 'Search'}" icon="search" text="搜索"/>
          <van-grid-item icon="underway-o" text="历史" @click="mastLogin({name:'History'})"/>
          <van-grid-item icon="edit" text="编辑" @click="onShowEdit"/>
        </van-grid>
      </div>
    </div>

    <status-bar/>
    <div class="times">
      <div class="left">
        <div class="time">{{ userStore.readTimeString }}</div>
        <div class="desc">{{ userStore.readTimeDesc }}</div>
      </div>
      <button class="right">
        <span
            v-if="!checkInStore.isCheckIn"
            class="btn"
            @click="checkInStore.checkIn()"
        >签到</span>
      </button>
    </div>
    <div class="body">
      <van-empty v-if="!userStore.isLogin" description="登陆后查看书架" image="error">
        <van-button
            round
            style="width: 200px"
            type="primary"
            @click="router.push({name:'Login'})"
        >去登陆
        </van-button>
      </van-empty>
      <button v-else-if="bookshelfStore.empty && bookshelfStore.loading" style="width: 100%; height: 100%">
        <van-loading size="24px">加载中...</van-loading>
      </button>
      <van-empty v-else-if="bookshelfStore.empty" description="空荡荡的书架等你来填满">
        <van-button
            round size="small"
            style="width: 100px"
            type="danger"
            @click="router.push({name:'Home'})"
        >去书城
        </van-button>
      </van-empty>
      <div v-else class="book-list">
        <div
            v-for="item in bookshelfStore.books"
            v-longpress="()=>{showEdit = true;onItemClick(item)}"
            class="item"
            @click="onItemClick(item)"
        >
          <img :alt="item.name" :src="item.cover">
          <div class="name van-multi-ellipsis--l2">{{ item.name }}</div>
          <button v-if="showEdit" :class="{active: item.isSelect}" class="select">
            <van-icon name="success" size="18"/>
          </button>
        </div>
        <button v-if="!showEdit" class="more" @click="router.push({name:'Home'})">
          <van-icon name="plus" size="35"/>
        </button>
      </div>
    </div>
  </div>
  <van-popup v-model:show="showEdit" :overlay="false" position="top">
    <status-bar/>
    <van-nav-bar
        :right-text="bookshelfStore.iSselectAll ? '取消全选':'全选'"
        :title="bookshelfStore.selectCount === 0 ? '请选择图书' : '已经选择'+bookshelfStore.selectCount+'本书'"
        @click-right="onSelectAll"
    />
  </van-popup>
  <van-popup v-model:show="showEdit" :overlay="false" position="bottom">
    <div style="display: flex">
      <van-button :loading="bookshelfStore.loading" block icon="delete" type="danger" @click="onCloseEdit(true)">删除
      </van-button>
      <van-button :loading="bookshelfStore.loading" block icon="revoke" type="default" @click="onCloseEdit(false)">取消
      </van-button>
    </div>
  </van-popup>
</template>

<script lang="ts" setup>
import {onUnmounted, ref, watch} from "vue";
import {useRouter} from "vue-router";
import {useBookshelfStore} from "./store";
import {useCheckInStore} from "../check-in/store";
import {useUserStore} from "../mine/store";
import {mastLogin} from "../../util/router";
import {showToast} from "vant";
import StatusBar from "../../components/StatusBar.vue";

const router = useRouter();
const userStore = useUserStore();
const checkInStore = useCheckInStore();
const bookshelfStore = useBookshelfStore();

bookshelfStore.loadData();
const headerBackground = ref("");

function e(e: Event) {
  // @ts-ignore
  headerBackground.value = e.target.scrollTop <= 10 ? '' : '#ffffff';
}

const onShowEdit = () => {
  if (!userStore.isLogin) {
    showToast({
      message: "请先登录",
      position: "bottom"
    })
    return;
  }
  if (bookshelfStore.empty) {
    showToast({
      message: "书架空空如也",
      position: "bottom"
    })
    return;
  }
  showEdit.value = true;
}
const showEdit = ref(false);
const onItemClick = (e: any) => {
  if (bookshelfStore.loading) return;
  if (showEdit.value) {
    let size = (e.isSelect = !e.isSelect) ? 1 : -1;
    bookshelfStore.selectCount += size;
  } else {
    router.push({name: 'Read', query: {b: 1, c: 1}})
  }
}
const onSelectAll = () => {
  if (bookshelfStore.loading) return;
  if (bookshelfStore.iSselectAll) {
    bookshelfStore.books.forEach(e => {
      e.isSelect = false;
    })
    bookshelfStore.selectCount = 0;
  } else {
    bookshelfStore.books.forEach(e => {
      e.isSelect = true;
    })
    bookshelfStore.selectCount = bookshelfStore.books.length;
  }
}
const onCloseEdit = (deleted: boolean = false) => {
  if (deleted) {
    bookshelfStore.removeBook().then(e => {
      showEdit.value = false;
    });
  } else {
    bookshelfStore.cancelSelect()
    showEdit.value = false;
  }
}
router.onBack = () => {
  if (showEdit.value) {
    onCloseEdit();
    return false;
  }
  return true;
}
</script>

<style lang="less" scoped>
.bookshelf-view {
  width: 100%;
  background: var(--background-color);
  height: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .header {
    height: 60px;

    .header-fixed {
      width: 100%;
      position: fixed;
      z-index: 10;
      top: 0;
      right: 0;
      float: right;
      padding-right: 16px;
      background: v-bind(headerBackground);

      /deep/ .van-grid {
        width: 150px;
        float: right;
      }

      /deep/ .van-grid-item, /deep/ .van-grid-item__content {
        height: 60px;
        width: 50px;
        background: none;

        .van-grid-item__text {
          margin-top: 4px;
        }
      }
    }
  }

  .times {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    padding: 0 24px;

    .left {
      padding: 10px;

      .time {
        font-weight: bold;
        height: 40px;
        font-size: 32px;
        line-height: 40px;
      }

      .desc {
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        color: var(--text-color-placeholder);
      }
    }

    .right {
      padding-right: 10px;

      .btn {
        height: 32px;
        border-radius: 16px;
        padding: 6px 18px;
        background: #ffffff;
        color: var(--color-Danger);
      }
    }
  }

  .body {
    border-radius: 16px 16px 0 0;
    padding: 16px;
    background-color: var(--background-color-w);
    display: grid;
    min-height: calc(100% - 140px);

    .book-list {
      width: 100%;
      height: auto;
      display: grid;
      grid-template-columns: repeat(3, 90px);
      grid-row-gap: 16px;
      justify-content: space-between;

      .item {
        width: 90px;
        display: flex;
        flex-direction: column;
        position: relative;

        .select {
          position: absolute;
          top: 5px;
          right: 5px;
          background: #FFFFFF;
          width: 24px;
          height: 24px;
          border-radius: 100%;
          padding: 0;
          border: 1px solid var(--border-color-light);
          color: #FFFFFF;

          &.active {
            background-color: orangered;
            border-color: orangered;
          }
        }

        img {
          width: 90px;
          height: 120px;
          border-radius: 4px;
          margin-bottom: 6px;
        }

        .name {
          color: var(--text-color-primary);
          font-size: 14px;
          line-height: 20px;
          font-weight: bold;
        }
      }

      .more {
        width: 90px;
        border-radius: 4px;
        height: 120px;
        border: 1px solid var(--border-color-light);
        color: var(--border-color-light);
      }
    }
  }
}
</style>
