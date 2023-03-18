<template>
  <div class="text">
    <div
        ref="textarea"
        @blur="emits('update:focus', false)"
        @input="a"
        class="textarea"
        contenteditable="true"
    />
    <div class="publish" :class="{disable: text === ''}" @click="emits('send', text)">发送</div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";
const emits = defineEmits(['send', 'update:focus']);
const props = defineProps({
  focus:{
    type: Boolean,
    default: false,
  }
});
const textarea = ref();
watch(()=>props.focus,(n)=>{
  if (n && textarea.value){
    textarea.value.focus();
  }
})
const text = ref("");
function a({target}:InputEvent){
  const t = <HTMLDivElement>target;
  text.value = t.innerText;
}
</script>

<style scoped lang="less">
.text{
  width: 100%;
  padding: 12px;
  position: absolute;
  background-color: #FFFFFF;
  bottom: 0;
  right: 0;
  box-shadow: 0 4px 16px #ccc;
  display: flex;
  .textarea{
    resize: none;
    border: 0;
    outline: none;
    padding: 4px 6px;
    letter-spacing: 1px;
    border-radius: 4px;
    background-color: #F1F2F3;
    width: 100%;
    line-height: 22px;
    max-height: 74px;
    overflow: auto;
    flex: 1;
  }
  .publish{
    width: 60px;
    height: 30px;
    flex-shrink: 0;
    flex-grow: 0;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 6px;
    &:active{
      background-color: #F1F2F3;
    }
  }
  .publish.disable{
    color: #C9CCD0;
  }

}
</style>
