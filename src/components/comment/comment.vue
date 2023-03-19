<template>
  <div class="comment">
    <div class="avatar">
      <img :src="data.user.avatar" alt="">
    </div>
    <div class="content">
      <div class="head">{{ data.user.username }}</div>
      <div class="body">
        <span v-if="showReplyUser && data?.replyUser">@{{data?.replyUser?.username}}: </span>
        {{ data.content }}
      </div>
      <div class="footer">
        <span class="like" @click="onLike">
          <van-icon v-if="data.isLike" color="#fb7299" name="good-job"/>
          <van-icon v-else name="good-job-o"/>
          <span class="size">{{ data.likeNum }}</span>
        </span>
        <van-icon name="chat-o" @click="emits('comment', data)"/>
      </div>
      <div
          v-if="isRoot && data.childrenNum > 0"
          class="replay-box"
          @click="emits('list', data)"
      >共{{ data.childrenNum }}条回复
        <van-icon name="arrow"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from "vue";

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  isRoot: {
    type: Boolean,
    default: false
  },
  showReplyUser: {
    type: Boolean,
    default: false
  }
});
const onLike = () => {
  if (props.data.isLike) {
    props.data.isLike = false;
    props.data.likeNum--;
  } else {
    props.data.isLike = true;
    props.data.likeNum++;
  }
}
const emits = defineEmits(['comment', 'list']);
</script>
<style lang="less" scoped>
.comment {
  width: 100%;
  --avatar-size: 38px;
  display: flex;

  .avatar {
    flex-grow: 0;
    flex-shrink: 0;
    width: var(--avatar-size);

    img {
      width: var(--avatar-size);
      height: var(--avatar-size);
      border-radius: 100%;
    }

    margin-right: 10px;
  }

  .content {
    flex: 1;

    .head {
      width: 100%;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
    }

    .body {
      width: 100%;
      height: auto;
      font-size: 16px;
      line-height: 20px;
      color: #484C53;
      span{
        color: #409EFF;
      }
    }

    .footer {
      margin-top: 8px;
      width: 100%;
      height: 22px;
      color: #61666D;

      .like {
        line-height: 22px;
        margin-right: 10px;
        cursor: pointer;

        .size {
          margin-left: 2px;
          font-size: 13px;
        }
      }
    }
  }

  .replay-box {
    background-color: #f5f5f5;
    padding: 2px 12px;
    font-size: 13px;
    line-height: 20px;
    border-radius: 16px;
    display: inline-block;
    margin-top: 6px;
  }
}
</style>
