<template>
  <div class="loading">
    <div class="load">
      <div class="loading-turn-book"></div>
    </div>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "LoadingAnimation",
  props:{
    loading:{
      type:Boolean,
      default: false
    },
  },
  setup(props) {

    return {

    }
  }
}
</script>
<style scoped lang="less">
.loading{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background: inherit;
  .load{
    width: 100%;
    height: 100%;
    background: inherit;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }
  .body{
    position: absolute;
    top: 0;
    left: 0;
    z-index: v-bind('loading ? 997:999');
    width: 100%;
    height: 100%;
    overflow: auto;
    background: inherit;
  }
}
@keyframes load {
  0% {
    background-image: url("../assets/image/loading/1.webp");
  }
  10% {
    background-image: url("../assets/image/loading/2.webp");
  }
  20% {
    background-image: url("../assets/image/loading/3.webp");
  }
  30% {
    background-image: url("../assets/image/loading/4.webp");
  }
  40% {
    background-image: url("../assets/image/loading/5.webp");
  }
  50% {
    background-image: url("../assets/image/loading/6.webp");
  }
  60% {
    background-image: url("../assets/image/loading/7.webp");
  }
  70% {
    background-image: url("../assets/image/loading/8.webp");
  }
  80% {
    background-image: url("../assets/image/loading/9.webp");
  }
  90% {
    background-image: url("../assets/image/loading/10.webp");
  }
  100% {
    background-image: url("../assets/image/loading/11.webp");
  }
}
.loading-turn-book{
  width: 48px;
  height: 48px;
  margin: 150px auto;
  background-size: 50%;
  background-position-x: 12px;
  background-position-y: 10px;
  background-color: #ffffff;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-image: url("../assets/image/loading/1.webp");
  animation: load 1s infinite;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}
</style>
