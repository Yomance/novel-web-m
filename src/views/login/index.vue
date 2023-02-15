<template>
  <div class="login-view">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="param.account"
            :rules="[{ required: true, message: '请填写手机号' }]"
            label="手机号"
            name="account"
            placeholder="手机号"
        />
        <van-field
            v-model="param.password"
            :rules="[{ required: true, message: '请填写密码' }]"
            label="密码"
            name="password"
            placeholder="密码"
        />
        <van-field
            v-model="param.imageCode"
            label="图片验证码"
            maxlength="4"
            name="imageCode"
            placeholder="图片验证码"
        >
          <template #button>
            <img :src="codeSrc" alt="" @click="onChangeImageCode">
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
            :loading="loading"
            block
            native-type="submit"
            round
            type="primary">
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getImageCode, login} from "./request";
import {closeNotify, showNotify, showToast} from "vant";
import {getDefaultBean, LoginParam} from "./type";
import {useUserStore} from "../mine/store";

const userStore = useUserStore();
const router = useRouter();
const param = ref<LoginParam>(getDefaultBean());


// 加载图片验证码
const codeSrc = ref("");
const onChangeImageCode = () => getImageCode().then(e => codeSrc.value = e)
onChangeImageCode();

//
const loading = ref(false);
const onSubmit = (e: LoginParam) => {
  loading.value = true;
  login(e)
      // 登陆获取token 根据token请求用户信息
      .then(res => {
        showNotify({
          message:"登陆成功，正在跳转！",
          duration: 0,
          type: "success"
        });
        return userStore.login(res);
      })
      // 请求用户信息成功进行跳转
      .then(e => {
        closeNotify();
        router.go(-1);
      })
      .catch(showNotify)
      .finally(() => loading.value = false);
}
</script>

<style scoped>
.login-view {
  width: 100%;
  height: auto;
  background: var(--background-color);
  padding-top: 100px;
}
</style>
