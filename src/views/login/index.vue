<template>
  <div class="login-view">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="param.phone"
            :rules="[{ required: true, message: '请填写手机号' }]"
            label="手机号"
            name="phone"
            placeholder="手机号"
        />
        <van-field
            v-model="param.password"
            :rules="[{ required: true, message: '请填写密码' }]"
            label="密码"
            name="password"
            type="password"
            placeholder="密码"
        />
        <!-- <van-field
            v-model="param.imageCode"
            label="手机验证码"
            maxlength="4"
            type="digit"
            name="imageCode"
            placeholder="手机验证码"
        >
          <template #extra>
            <van-button 
            size="mini" 
            type="primary"
            :disabled="phoneCodeDisable"
            @click="showCaptcha = true;"
          >{{phoneCodeText}}</van-button>
          </template>
        </van-field> -->
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
        <p class="to-register" @click="router.push('/register')">没有账号？去注册</p>
      </div>
    </van-form>
    <captcha-slider v-model:show="showCaptcha" @success="checkSuccess"/> 
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {getImageCode, login,getDefaultBean, LoginParam} from "/src/api/login";
import {showToast} from "vant";
import {useUserStore} from "../mine/store";
import CaptchaSlider from '../../components/captcha/slider.vue';
const userStore = useUserStore();
const router = useRouter();
const param = ref<LoginParam>(getDefaultBean());

// 发送验证码按钮禁用
const phoneCodeDisable = ref(false);
// 发送验证码按钮文字
const phoneCodeText = ref("发送验证码");
// 发送验证码id
const phoneCodeId = ref("");


const showCaptcha = ref(false);
//
const loading = ref(false);
let loginParam:any = {};
const onSubmit = (e: LoginParam) => {
  showCaptcha.value = true;
  loginParam = e;
}

const checkSuccess = (id:any)=>{
  phoneCodeId.value = id;
  loading.value = true;
  let toa = showToast({
    message:"登陆中",
    duration: 0,
    type: "loading",
    overlay: true,
  });
  login(loginParam)
      // 登陆获取token 根据token请求用户信息
      .then(res => {
        toa.$props.message = "登陆成功，正在跳转！";
        // toa.message = "登陆成功，正在跳转！";
        return userStore.login(res);
      })
      // 请求用户信息成功进行跳转
      .then(e => {
        toa.close();
        router.go(-1);
      })
      .catch(({message})=> showToast({message, type: 'fail'}))
      .finally(() => loading.value = false);
}
</script>

<style scoped lang="less">
.login-view {
  width: 100%;
  height: 100%;
  background: var(--background-color);
  padding-top: 100px;
  .to-register{
    float: right;
    margin-top: 16px;
    font-size: 14px;
    line-height: 26px;
    color: #777777;
  }
}
</style>
