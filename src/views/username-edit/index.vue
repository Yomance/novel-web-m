<template>
  <div class="user-profile">
    <van-nav-bar title="修改昵称" placeholder left-arrow @click-left="router.back()" right-text="保存" @click-right="save"/>
    <van-field v-model="name" maxlength="12" />
    <div class="text">
      <p>修改说明</p>
      <p>1.昵称每次修改需支付{{price}}硬币（首次修改免费，之后优先使用改名卡道具，改名卡敬请期待）</p>
      <p>2.昵称可以使用：中文、大写英文、小写英文、数字、英文下划线及其组合</p>
      <p>3.昵称不可使用：空格、特殊字符、违规关键词</p>
      <p>4.昵称字数限制：2~12</p>
      <p>5.昵称30天内仅能修改一次</p>
      <p>6.修改后发表的书评、广播等会使用新的昵称，修改前发布的内容中昵称不会改变</p>
      <p>7.昵称的内容需遵守社区管理规则，如有违反，将按通则处理且不退还修改费用</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {useUserStore} from "../mine/store";
import {ref} from "vue";
import {renameState, rename, uploadAvatar} from "../../api/user";
import {showConfirmDialog, showDialog, showNotify, showToast} from "vant";
import {needLogin} from "../../util/login";

const router = useRouter();
const userStore = useUserStore();
const price = ref(100);
const name = ref(userStore.username);
let message = "昵称只能免费修改一次，确认修改";
renameState().then(e=>{
  price.value = e.price;
  if (e.first){
    message = "昵称只能免费修改一次，确认修改";
  }else {
    message = `昵称需要花费${e.price}个硬币，确认修改`;
  }
}).catch(({message})=>{
  showNotify({
    type: "danger",
    message,
  })
})


function save(){
  showConfirmDialog({
    message
  })
      .then(e => {
        rename(name.value)
            .then(e=>{
              userStore.username = e;
              userStore.purse.coin -= price.value;
              showToast({
                type: "success",
                message: "修改成功！",
                duration:800,
                onClose(){setTimeout(router.back,10)}
              })
            })
            .catch(({message})=> showToast({type: 'fail', message}))
      })
      .catch(e => {});
}

</script>
<style scoped lang="less">
.user-profile {
  width: 100%;
  height: 100%;
  background: var(--background-color);
  .text {
    padding: 16px;
    font-size: 14px;
    line-height: 26px;
    color: #777777;
    p:nth-child(1){
      margin-bottom: 10px;
    }
    p:nth-child(2){
      color: #353535;
    }
    p{
      margin-bottom: 20px;
    }
  }
}
</style>
