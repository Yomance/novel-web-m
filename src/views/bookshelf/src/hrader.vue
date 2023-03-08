<template>
  <div class="header">
    <div class="header-fixed">
      <status-bar />
      <van-grid :border="false" column-num="3" icon-size="20">
        <van-grid-item :to="{ name: 'Search' }" icon="search" text="搜索" />
        <van-grid-item
          icon="underway-o"
          text="历史"
          @click="mastLogin({ name: 'History' })"
        />
        <van-grid-item icon="edit" text="编辑" @click="emit('edit')" />
      </van-grid>
    </div>
  </div>
  <status-bar />
  <div class="times">
    <div class="left">
      <div class="time">{{ userStore.readTimeString }}</div>
      <div class="desc">{{ userStore.readTimeDesc }}</div>
    </div>
    <button class="right">
      <!-- <span
              v-if="!checkInStore.isCheckIn"
              class="btn"
              @click="checkInStore.checkIn()"
          >签到</span> -->
    </button>
  </div>
</template>
<script setup lang="ts">
import { mastLogin } from "../../../util/router";
import { defineProps, defineEmits } from "vue";
import { useUserStore } from "../../mine/store";
const userStore = useUserStore();
const emit = defineEmits(["edit"]);
defineProps({
  bgc: {
    type: String,
    default: "",
  },
});
</script>
<style lang="less" scoped>
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
    background: v-bind(bgc);

    /deep/ .van-grid {
      width: 150px;
      float: right;
    }
    /deep/.van-grid-item {
      padding: 0 !important;
    }

    /deep/ .van-grid-item,
    /deep/ .van-grid-item__content {
      height: 52px;
      width: 50px;
      background: none;
      padding: 0;

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
</style>
