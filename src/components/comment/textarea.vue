<template>
  <div class="text">
    <textarea
        ref="textarea"
        :value="text"
        class="textarea"
        rows="1"
        @blur="onfocus"
        @input="e=>emits('update:text', e.target.value)"
    />
    <div ref="buttonRef" :class="{disable: text === ''}" class="publish" @click="send">发送</div>
  </div>
</template>

<script lang="ts" setup>
import {ref, watch} from "vue";

const emits = defineEmits(['send', 'blur', 'update:text', 'update:focus']);
const props = defineProps({
  text: {
    type: String,
  },
  focus: {
    type: Boolean,
    default: false,
  }
});
const buttonRef = ref<Element>();
let blur = false;

function onfocus(e) {
  console.log(e)
  blur = document.activeElement !== buttonRef.value &&
      document.activeElement !== buttonRef.value?.parentElement
}

function send() {
  if (props.text != "") {
    emits('send');
    if (blur) {
      emits('blur');
      emits('update:focus', false);
      blur = true;
    }
  }
}

const textarea = ref();
watch(() => props.focus, (n) => {
  if (n && textarea.value) {
    textarea.value.focus();
  }
})
</script>

<style lang="less" scoped>
.text {
  width: 100%;
  padding: 12px;
  position: absolute;
  background-color: #FFFFFF;
  bottom: 0;
  right: 0;
  box-shadow: 0 4px 16px #ccc;
  display: flex;

  .textarea {
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

  .publish {
    width: 60px;
    height: 30px;
    flex-shrink: 0;
    flex-grow: 0;
    text-align: center;
    line-height: 30px;
    border-radius: 4px;
    margin-left: 6px;

    &:active {
      background-color: #F1F2F3;
    }
  }

  .publish.disable {
    color: #C9CCD0;
  }

}
</style>
