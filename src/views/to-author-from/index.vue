<template>
  <van-nav-bar
      title="表单填写"
      left-arrow
      fixed
      @click-left="router.back()"
      placeholder
  />
  <van-cell-group inset style="text-align: center;" class="spin-item" v-if="!data">
    <yun-upload :is-front="true" @select="selectFront" style="margin-bottom: 16px"/>
    <yun-upload :is-front="false" @select="selectBack" style="margin-bottom: 16px"/>
    <van-button block type="primary" :loading="loading" @click="onNext" :disabled="!frontImage || !backImage">下一步
    </van-button>
  </van-cell-group>

  <van-cell-group inset class="spin-item" v-else>
    <van-field v-model="data.name" name="name" label="姓名" placeholder="姓名"
               :rules="[{ required: true, message: '请填写姓名' }]"/>
    <van-field label="身份证号码" placeholder="身份证号码" v-model="data.idNumber"/>
    <van-field label="性别">
      <template #input>
        <van-radio-group v-model="data.gender" direction="horizontal">
          <van-radio name="男">男</van-radio>
          <van-radio name="女">女</van-radio>
        </van-radio-group>
      </template>
    </van-field>
    <van-field v-model="data.startDate" label="开始日期" placeholder="开始日期"/>
    <van-field v-model="data.endDate" label="失效日期" placeholder="失效日期"/>
    <van-button style="margin-top: 16px" block type="primary" @click="onSubmit" :loading="loading">提交</van-button>
  </van-cell-group>
</template>
<script setup lang="ts">
import YunUpload from './upload.vue';
import {ref} from 'vue';
import {add, upload} from "../../api/to-author";
import {showNotify} from "vant";
import {useRouter} from "vue-router";
import {toAuditDetail} from "../../router/page";
let router = useRouter();

const loading = ref(false);
const frontImage = ref();
const backImage = ref();

const data = ref();
const value = ref();

const selectFront = (f: File) => (f && (frontImage.value = f));
const selectBack = (f: File) => (f && (backImage.value = f));

const onNext = () => {
  loading.value = true;
  upload(frontImage.value, backImage.value)
      .then(e => data.value = e)
      .catch(({message})=>showNotify(message))
      .finally(() => loading.value = false);
}

const onSubmit = () => {
  loading.value = true;
  add(data.value)
      .then(e=> {
        showNotify({message: '成功', type: "success", duration:1000});
        setTimeout(()=>toAuditDetail(true), 1000);
      })
      .catch(({message})=>showNotify({message}))
      .finally(()=>loading.value = false);
}
</script>
<style scoped lang="less">
.spin-item {
  margin-top: 20px;
}
</style>