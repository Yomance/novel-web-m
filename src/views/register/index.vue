<template>
  <div class="login-view">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="data.phone"
            :rules="[{ required: true, message: '请填写手机号' }]"
            label="手机号"
            name="phone"
            placeholder="手机号"
        />
        <van-field
            v-model="data.username"
            :rules="[{ required: true, message: '请填写用户名' }]"
            label="用户名"
            name="phone"
            placeholder="用户名"
        />
        <van-field
            v-model="data.password"
            :rules="[{ validator: testPasswd }]"
            type="password"
            label="密码"
            name="password"
            placeholder="密码"
        /> <van-field
            v-model="data.password1"
            :rules="[{ validator: testPasswd1 }]"
            type="password"
            label="确认密码"
            name="password"
            placeholder="确认密码"
        />
        <van-field
            v-model="data.phoneCode"
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
        </van-field>
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button
          :loading="loading"
          block
          native-type="submit"
          :disabled="data.phoneCode.length !== 4"
          round
          type="primary"
        >注册</van-button>
      </div>
    </van-form>
    <captcha-slider v-model:show="showCaptcha" @success="checkSuccess"/> 
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from "vue";
import {useRouter} from "vue-router";
import {showToast} from "vant";
import CaptchaSlider from '../../components/captcha/slider.vue';
const router = useRouter();

const data = reactive({
  phone:"",
  password:"",
  password1:"",
  phoneCode:"",
  username: "",
  gender: "",
});
const testPasswd = (val:string)=>{
  if(val.length < 6) return "密码最少6位";
  return true;
}
const testPasswd1 = (val:string)=>{
  if(val !== data.password) return "两次密码不同";
  return true;
}

const checkSuccess = (id:any)=>{
  phoneCodeId.value = id;
  showToast('验证码已发送');
  phoneCodeDisable.value = true;
  let s = 60;
  const interval = setInterval(()=>{
    if(s == 0){
      clearInterval(interval);
      phoneCodeText.value = "重新发送";
      phoneCodeDisable.value = false;
      return;
    }
    phoneCodeText.value = `${s}秒后发送`;
    s--;
  },1000);
}

// 显示验证码
const showCaptcha = ref(false);
// 发送验证码按钮禁用
const phoneCodeDisable = ref(false);
// 发送验证码按钮文字
const phoneCodeText = ref("发送验证码");
// 发送验证码id
const phoneCodeId = ref("");
const loading = ref(false);
const onSubmit = () => {
  loading.value = true;
  setTimeout(()=>loading.value = false, 1000);
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
