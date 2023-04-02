<template>
  <div class="user-profile">
    <van-nav-bar title="个人资料" placeholder left-arrow @click-left="router.back()"/>
    <van-cell-group>
      <van-cell is-link title="头像" value="内容" style="width: 100%" @click="()=>uploader.chooseFile()">
        <img :src="userStore.avatar" alt="">
      </van-cell>
      <van-cell is-link title="昵称" :value="userStore.username" :to="{name:'UsernameEdit'}"/>
      <van-cell title="手机号" value="内容"/>
    </van-cell-group>
    <van-uploader ref="uploader" accept="image/*" capture="camera" :after-read="selectFile" :max-count="1"
                  :show-upload="false"/>
  </div>
</template>

<script setup lang="ts">import {useRouter} from 'vue-router';
import {useUserStore} from "../mine/store";
import {ref} from "vue";
import {uploadAvatar} from "../../api/user";
import {showNotify} from "vant";

const router = useRouter();
const userStore = useUserStore();
const uploader = ref();

function selectFile(items: any) {
  uploadAvatar(items.file)
      .then((e) => {
        showNotify({
          type: "success",
          message: "修改成功",
        })
        userStore.avatar = e;
      })
      .catch(({message})=>{
        showNotify({
          type:"danger",
          message,
        })
      });
}

</script>
<style scoped lang="less">
.user-profile {
  width: 100%;
  height: 100%;
  background: var(--background-color);

  img {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
}
</style>