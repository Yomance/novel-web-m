<template>
  <van-nav-bar
      title="成为作者"
      @click-left="router.back()"
      left-arrow
      fixed
      placeholder
  />
  <div class="show" v-if="log && log.state === AuthorAuditState.suc">
    <p>申请成功！</p>
    <p>现在可以点击下方“去写作”，开启作者之旅！</p>
    <img style="max-width: 100%; max-height: 100%" :src="url('/image/to-author-1.png')" alt="">
  </div>
  <div class="show" v-else-if="log && log.state === AuthorAuditState.wait">
    <p>等待审核</p>
    <p>点击下方查看审核进度</p>
    <img style="max-width: 100%; max-height: 100%" :src="url('/image/to-author-2.png')" alt="">
  </div>
  <div class="show" v-else-if="log && log.state === AuthorAuditState.fail">
    <p>审核失败</p>
    <p class="err">{{log.errMsg}}</p>
    <p >点击下方重新申请</p>
    <img style="max-width: 100%; max-height: 100%" :src="url('/image/to-author-3.png')" alt="">
  </div>
  <div class="show" v-else>
    <img style="max-width: 100%; max-height: 100%" :src="url('/image/to-author.png')" alt="">
  </div>
  <van-button v-if="log && log.state === AuthorAuditState.suc"  block type="primary" class="btn" @click="to">去写作</van-button>
  <van-button v-else-if="log && log.state === AuthorAuditState.wait" block type="primary" class="btn" @click="to">查看审核进度</van-button>
  <van-button v-else block type="primary" class="btn" @click="to">申请成为作者</van-button>
</template>
<script setup lang="ts">
import {useRouter} from "vue-router";
import {AuthorAudit, AuthorAuditState, newLog} from "../../api/to-author";
import {ref} from "vue";
import {showDialog, showToast} from "vant";
import {url} from "/src/util/file";

const router = useRouter();
const loading = ref(true);
const log = ref<AuthorAudit|any>({});
newLog().then((e:any)=> {
  log.value = e;
}).finally(()=>loading.value = false);
function to(){
  if (log.value?.state === AuthorAuditState.wait){
    router.push({name:"ToAuthorDetail"});
    return;
  }else if (log.value?.state === AuthorAuditState.suc){
    showDialog({ title:"访问一下链接开始写作", message: 'https://www.baidu.com' });
  }else {
    router.push({name:"ToAuthorFrom"});
  }
}
</script>
<style scoped lang="less">
.show{
  height: 80%;
  width: 100%;
  .err{
    font-size: 14px;
    color: #ff6767;
  }
  p:nth-child(1){
    font-size: 20px;
    color: #3a80ff;
    line-height: 36px;
  }
  p{
    text-align: center;
    line-height: 26px;
    color: #777777;
  }
}
.btn{
  width: 80%;
  margin-left: 10%;
}
</style>