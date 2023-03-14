<template>
  <div class="detail">
    <van-nav-bar
        title="申请状态"
        left-arrow
        fixed
        @click-left="router.back()"
        placeholder
    />
    <van-cell-group inset style="margin-top: 20px">
      <van-cell title="姓名" :value="log.name"/>
      <van-cell title="性别" :value="log.gender"/>
      <van-cell title="身份证号码" :value="log.idNumber"/>
      <van-cell title="起始效期" :value="log.startDate"/>
      <van-cell title="失效日期" :value="log.endDate"/>
      <van-cell title="审核状态" title-class="steps" value-class="steps">
        <van-steps :active="log.state" direction="vertical">
          <van-step>等待审核</van-step>
          <van-step>审核失败</van-step>
          <van-step>审核成功</van-step>
        </van-steps>
      </van-cell>
    </van-cell-group>
    <van-button style="margin:16px; width: calc(100% - 32px);" type="primary" @click="router.back()" block>返回</van-button>
  </div>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {AuthorAudit, newLog} from "../../api/to-author";
import {ref} from "vue";
const router = useRouter();
const loading = ref(true);
const log = ref<AuthorAudit|any>({});
newLog().then((e:any)=>log.value = e).finally(()=>loading.value = false);
</script>
<style lang="less">
.detail{
  width: 100%;
  height: 100%;
  background-color: #eff2f5;
}
.steps{
  flex: none;
  flex-shrink: 0;
  line-height: 36px;
}
</style>