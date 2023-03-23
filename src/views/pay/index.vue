<template>
  <van-nav-bar title="充值" placeholder left-arrow @click-left="router.back()"/>
  <div class="pay">
    <van-space direction="vertical" fill :size="16">
      <van-cell title="充值账号" size="large" style="padding: 15px 32px;" :value="userStore.username"/>
      <van-cell :title="payName" size="large" is-link style="padding: 15px 32px;" @click="show = true"/>
      <van-cell-group inset>
        <van-cell
            v-for="(item, i) in defaultPay"
            :class="{active: active === i+1}"
            @click="active = (i+1)"
            size="large"
            :title="item+'00硬币'"
            :value="'￥'+item"
        />
        <van-field @click="active = 0" type="number" v-model="o" :label="(o*100)+'硬币'" placeholder="输入自定义金额"
                   :maxlength="3"/>
      </van-cell-group>
      <van-button type="primary" block style="margin: 0 16px; width: calc(100% - 40px);" :loading="payLoading"
                  @click="onPay"> 立即支付
      </van-button>
    </van-space>
    <van-action-sheet v-model:show="show" :actions="actions" @select="onSelect" cancel-text="取消"
                      close-on-click-action/>
  </div>
</template>

<script setup>
import {ref} from "vue";
import {showDialog, showToast} from "vant";
import {useRouter} from "vue-router";
import {useUserStore} from "../mine/store";
import {buyCoin} from "../../api/pay";

const defaultPay = [10, 20, 30, 50, 100];
const show = ref(false);
const router = useRouter();
const userStore = useUserStore();

const active = ref(1);
const o = ref(1);
const payName = ref("微信");
const payType = ref(0);
const actions = [
  {name: '微信'},
  {name: '支付宝'},
];
const onSelect = (e, v) => {
  payName.value = e.name;
  payType.value = v;
}
const payLoading = ref(false);
const onPay = () => {
  if (active.value > 6 || active.value < 0) {
    showToast("请选择金额");
    return;
  }
  payLoading.value = true;
  let m;
  if (active.value === 0) {
    m = o.value;
  } else {
    m = defaultPay[active.value-1];
  }
  buyCoin(m, payType.value)
      .then(e => {
        userStore.purse.coin += e;
        showDialog({message: "购买成功",}).then(e => router.back())
      })
      .catch(({message}) => showDialog({title: "支付失败", message}))
      .finally(() => payLoading.value = false);
}
</script>

<style scoped lang="less">
.pay {
  background-color: #f7f7f7;
  height: calc(100% - 46px) !important;
  padding-top: 16px;

  .active {
    background-color: #61b0ff;
    color: #FFFFFF;

    /deep/ .van-cell__value {
      color: #FFFFFF;
    }
  }
}
</style>