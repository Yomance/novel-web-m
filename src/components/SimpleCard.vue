<template>
  <div class="simple-card">
    <div class="header">
      <div class="title">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
      <div class="right-btn">
        <slot name="right"/>
      </div>
    </div>
    <div class="body">
      <slot/>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "SimpleCard",
  props: {
    title: {
      type: String,
      required: true
    },
    desc: String,
  },
  setup() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.simple-card {
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 4px 12px 12px 12px;
  .header {
    width: 100%;
    height: 40px;
    display: flex;
    line-height: 40px;
    .title {
      font-size: 20px;
      font-weight: bold;
      color: var(--text-color-primary);
      margin-right: 12px;
    }

    .desc {
      color: var(--text-color-placeholder);
      font-size: var(--text-size-4);
    }
    margin-bottom: 4px;
  }
  .body {
    width: 100%;
    height: auto;
  }
}
</style>
