<template>
  <transition name="plus-icon">
    <div class="mask" v-if="show">
      <iframe class="slider" src="\static\html\captcha-slider.html" frameborder="0"></iframe>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  show: {
    type: Boolean as PropType<boolean>,
    default: false,
  }
})
const emits = defineEmits(['update:show', 'success'])
function getMessage({ data }: any) {
  let state = data.state;
  if(state === 'close'){
      emits('update:show', false);
  }else if(state === 'success'){
      setTimeout(() => emits('update:show', false), 300);
      emits('success', data.value);
  }
}
onMounted(() => window.addEventListener('message', getMessage))
onUnmounted(() => window.removeEventListener('message', getMessage))

</script>

<style lang="less" scoped>
.mask{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
.slider {
  background-color: #fff;
  width: 278px;
  height: 285px;
  z-index: 999;
  box-sizing: border-box;
  border-radius: 6px;
  box-shadow: 0 0 11px 0 #999999;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}



.plus-icon-enter {
  opacity: 0;
}
.plus-icon-enter-active {
  transition: opacity .5s;
}

.plus-icon-enter-to {
  opacity: 1;
}

.plus-icon-leave-active {
  transition: opacity .5s;
}

.plus-icon-leave-to {
  opacity: 0;
}
</style>