<template>
  <div class="buy">
    <div class="btn  gap-y-18">
      <van-button @click="buy" type="danger" round block>充值订阅本章：15金币</van-button>
      <!--      <van-button type="primary" style="margin-top: 16px" round block>签到领金币</van-button>-->
      <div class="ch">
        <van-button type="primary" style="margin-top: 16px" round :disabled="!chapterStore.hasLast"
                    @click="chapterStore.last()">上一章
        </van-button>
        <span></span>
        <van-button type="primary" style="margin-top: 16px" round :disabled="!chapterStore.hasNext"
                    @click="chapterStore.next()">下一章
        </van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useChapterStore} from "../../../store/chapter";
import {buyChapter} from "../../../api/pay";
import {needLogin} from "../../../util/login";
import {showConfirmDialog, showDialog, showLoadingToast} from "vant";
import router from "../../../router";
import {useBookStore} from "../../../store/book";

const chapterStore = useChapterStore();

const bookStore = useBookStore();

function buy() {
  needLogin(() => {
    showConfirmDialog({message:"购买本章即可阅读",}).then(()=>{
        const toast = showLoadingToast({
          message: '购买中...',
          forbidClick: true,
          duration: 0,
        });
        buyChapter(chapterStore.bookId, chapterStore.chapterId)
            .then(e => {
              toast.message = "获取章节内容...";
              chapterStore.loadChapter()
                  .then(e => bookStore.buyList.add(e.id))
                  .finally(() => toast.close());
            }).catch(({message, code}) => {
          if (code === 4100) {
            showConfirmDialog({message, confirmButtonText: "去充值"}).then(e => router.push({name: "Pay"}));
          } else {
            showDialog({message});
          }
          toast.close();
        });
      })
    })
}


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

  .btn {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #FFFFFF;
    padding: 16px 16px 30px;

    .ch {
      display: flex;
      justify-content: space-around;

      & > button {
        flex: 2;
      }

      span {
        flex: 1;
      }
    }
  }
}
</style>
