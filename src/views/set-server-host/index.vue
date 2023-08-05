<template>
  <van-nav-bar
      fixed
      placeholder
      left-arrow
      title="服务器地址"
      @click-left="router.back()"
  />
  <div class="nav-bar-con pd16 gap-y-16">
    <van-field v-model="server" >
      <template #label>
        <van-popover theme="dark" :actions="options" @select="e=>http=e.text">
          <template #reference>{{ http }}</template>
        </van-popover>
      </template>
    </van-field>
    <van-button block type="primary" @click="onClick">确定</van-button>
  </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {resetServer} from "/src/api";
import {showToast} from "vant";
const router = useRouter();
const server = ref("");
const show = ref(false);
const options = [{text: 'http://'},{text: 'https://'}];
const http = ref(options[0].text);
const onClick = ()=> {
  resetServer(http.value+server.value);
  showToast({
    message: '修改成功',
    position: 'bottom',
  });
};
</script>

<style scoped lang="less">
/deep/.van-popover__wrapper{
  width: 100%;
  text-align: center;
}
</style>
