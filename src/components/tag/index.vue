<template>
  <div class="n-tag">{{text}}</div>
</template>

<script lang="ts" setup>
import {PropType} from "vue";

let props = defineProps({
  text:{
    type: String,
    required: true
  },
  size:{
    type : String as PropType<"small"|"medium"|"large">,
    default: "medium"
  }
});
</script>

<style scoped lang="less">
.n-tag{

}
</style>
