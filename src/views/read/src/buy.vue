<template>
  <div class="buy">
    <div class="btn  gap-y-18">
      <van-button type="danger" round block>充值订阅本章：15金币</van-button>
<!--      <van-button type="primary" style="margin-top: 16px" round block>签到领金币</van-button>-->
      <div class="ch">
        <van-button type="primary" style="margin-top: 16px" round :disabled="!chapterStore.hasLast" @click="chapterStore.last()">上一章</van-button>
        <span></span>
        <van-button type="primary" style="margin-top: 16px" round :disabled="!chapterStore.hasNext" @click="chapterStore.next()">下一章</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useChapterStore} from "../../../store/chapter";
const chapterStore = useChapterStore();

</script>

<style lang="less" scoped>
.buy {
  width: 100%;
  height: 100%;
  border-radius: 10px 10px 0 0;
  padding: 16px;
  position: fixed;
  bottom: 0;
  z-index: 999;
  left: 0;
  .btn{
    box-shadow: 0 0 20px rgba(0,0,0,0.3);
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    padding: 16px 16px 30px;
    .ch{
      display: flex;
      justify-content: space-around;
      &>button{
        flex: 2;
      }
      span{
        flex: 1;
      }
    }
  }
}
</style>
