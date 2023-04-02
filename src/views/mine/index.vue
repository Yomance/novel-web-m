<template>
  <div class="mine-view">

    <status-bar />
    <van-space direction="vertical" fill size="16px">
      <div class="user-info" @click="onUserInfoClick">
        <img :src="store.avatar" alt="头像" class="avatar">
        <div class="name van-ellipsis">{{ store.username }}</div>
        <van-icon class="left" name="arrow" size="26px"/>
      </div>
      <div class="money">
        <div class="list">
          <div class="item">
            <div class="size">{{ store.coinStr }}</div>
            <div class="desc">硬币</div>
          </div>
          <div class="item">
            <div class="size">{{ store.isLogin ? store.purse.recommend : '-' }}</div>
            <div class="desc">推荐卡</div>
          </div>
        </div>
        <router-link to="/pay">
          <div class="btn">充值</div>
        </router-link>
      </div>
      <div class="vip">
        <img alt="" src="/src/assets/image/free_vip_img.9.png">
      </div>
      <van-grid :border="false" class="card" column-num="3">
        <van-grid-item icon="location" text="签到" @click="onSignIn"/>
        <van-grid-item icon="column" text="阅历" @click="mastLogin({name:'History'})"/>
        <van-grid-item icon="volume" text="消息" @click="showToast('暂无消息')"/>
      </van-grid>
      <van-cell-group inset>
        <van-cell icon="orders-o" title="最近阅读" @click="mastLogin({name:'History'})"/>
        <van-cell icon="comment-o" title="想法"/>
        <van-cell icon="point-gift-o" title="成为作者" @click="router.push({name:'ToAuthor'})"/>
      </van-cell-group>
      <van-button v-if="store.isLogin" block @click="store.logout()">退出登录</van-button>
      <van-button v-else block type="success" @click="router.push({name:'Login'})">去登录</van-button>
    </van-space>
  </div>
</template>

<script lang="ts" setup>
import {useUserStore} from "./store";
import {useRouter} from "vue-router";
import {mastLogin} from "../../util/router";
import {showToast} from "vant";
import StatusBar from "../../components/StatusBar.vue";
import {signIn} from "../../api/activity";
const store = useUserStore();
const router = useRouter();

const onSignIn = ()=>{
  signIn().then((e:any)=>{
    showToast("签到成功！");
    store.purse.coin+=e;
  }).catch(({message})=>{
    showToast(message || "系统错误");
  })
}
const onUserInfoClick = () => {
  if (store.isLogin) {
    router.push({name:"UserProfile"});
  } else {
    router.push({name: 'Login'})
  }
}
</script>

<style lang="less" scoped>
.mine-view {
  width: 100%;
  height: 100%;
  background-color: var(--background-color);

  padding: 16px;

  .user-info {
    width: 100%;
    height: 60px;
    display: flex;

    .avatar {
      flex-shrink: 0;
      flex-grow: 0;
      width: 60px;
      height: 60px;
      border-radius: 100%;
      overflow: hidden;
      color: var(--text-color-primary);
      font-weight: bold;
    }

    .name {
      width: 0;
      height: 60px;
      font-size: 20px;
      line-height: 60px;
      margin: 0 16px;
      flex-grow: 1;
      flex-shrink: 1;
    }

    .left {
      width: 50px;
      height: 60px;
      line-height: 60px;
      flex-grow: 0;
      flex-shrink: 0;
      color: var(--text-color-secondary);
    }
  }

  .money {
    width: 100%;
    height: 50px;
    padding: 4px;
    display: flex;
    justify-content: space-between;

    .list {
      display: flex;

      .item {
        width: 60px;

        .size {
          height: 25px;
          line-height: 25px;
          color: var(--text-color-primary);
          font-size: var(--text-size-2);
          margin-bottom: 2px;
        }

        .desc {
          height: 15px;
          line-height: 15px;
          color: var(--text-color-placeholder);
          font-size: var(--text-size-6);
        }
      }
    }

    .btn {
      padding: 0 16px;
      height: 32px;
      border: 1px solid red;
      color: red;
      border-radius: 16px;
      line-height: 32px;
    }
  }

  .vip {
    width: 100%;
    position: relative;

    img {
      width: 100%;
    }
  }

  /deep/ .van-cell-group--inset {
    margin: 0;
  }
}
</style>
