<template>
    <van-uploader 
    max-count="1" 
    preview-image
    :upload-icon="icon" 
    v-model="value"
    :after-read="onAfterRead"
    :upload-text="text"/>
</template>
<script setup lang="ts">
import { UploaderFileListItem } from 'vant';
import { ref, computed } from 'vue';
import {url} from "/src/util/file";
const value = ref();
const props = defineProps({
    isFront: {
        type: Boolean,
        default: false,
    }
});
const emit = defineEmits(["select"]);
// 图标
const icon = computed(()=>url(`/image/id-card-${props.isFront ? 0 : 1}.png`));
// 提示文字
const text = computed(()=>`上传身份证${props.isFront ? '正' : '反'}面`);
// 读取文件成功后的回调
const onAfterRead:(item:any)=>void = (item:UploaderFileListItem)=>emit('select', item.file);
</script>

<style scoped lang="less">
/deep/.van-uploader{
    display: flex;
    justify-content: center;
}
/deep/ .van-uploader__upload,
/deep/ .van-image,
/deep/ .van-uploader__preview-image {
    width: 80vw;
    height: 56vw;
    margin: 0;
}

/deep/ .van-uploader__upload-text {
    margin-top: 8px;
    color: #969799;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    line-height: 30px;
    background: #1da4f2;
    color: #fff;
    text-align: center;
}

/deep/ .van-uploader__upload,
/deep/ .van-image {
    background: #E8F6FE;
    border-radius: 10px;
    overflow: hidden;
}

/deep/ .van-icon__image {
    width: 6em;
    height: 4em;
    -o-object-fit: contain;
    object-fit: contain;
    margin-bottom: 23px;
}
</style>