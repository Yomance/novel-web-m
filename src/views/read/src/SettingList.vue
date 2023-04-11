<template>
  <div class="setting-list">
    <div class="item brightness">
      <div class="title">亮度</div>
      <button class="slider-container">
        <van-slider
            v-model="theme.brightness"
            :disabled="theme.brightnessAutoSystem"
            :max="ThemeConstants.MAX_BRIGHTNESS"
            :min="ThemeConstants.MIN_BRIGHTNESS"
            @update:model-value="theme.setBrightness"/>
      </button>
      <button>
        <van-button
            disabled
            :class="{active: theme.brightnessAutoSystem}"
            class="auto-system"
            icon="success"
            icon-position="right"
            round
            size="small"
            @click="theme.setBrightnessAutoSystem()"
        >跟随系统
        </van-button>
      </button>
    </div>
    <div class="item font">
      <div class="title">字号</div>
      <van-button
          :disabled="theme.fontSize === ThemeConstants.MIN_FONT_SIZE"
          class="set-size" round
          size="small"
          @click="theme.setFontSize(-2)"
      >A-
      </van-button>
      <span>{{ theme.fontSize }}</span>
      <van-button
          :disabled="theme.fontSize === ThemeConstants.MAX_FONT_SIZE"
          class="set-size" round
          size="small"
          @click="theme.setFontSize(2)"
      >A+
      </van-button>
      <div class="space"></div>
      <van-button disabled icon="arrow" icon-position="right" round size="small">切换字体</van-button>
    </div>
    <div class="item back">
      <div class="title">背景</div>
      <div class="con">
        <div
            v-for="item in background"
            :class="{active: item.background === theme.background && item.color === theme.color}"
            :style="{background: item.background}"
            class="back-one"
            @click="theme.setTheme(item)"
        />
      </div>
    </div>
    <div class="item turn">
      <div class="title">翻页</div>
      <div class="con">
        <van-button class="turn-one active" round size="small">上下(手动)</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useReadThemeStore, ThemeConstants} from "../read-theme-store";
import {url} from "/src/util/file";

const theme = useReadThemeStore();

const background = [
  {
    color: '#333',
    background: `url("${url('/image/wallpapers/default.jpg')}")`,
  }, {
    color: '#333',
    background: '#cad9e8',
  }, {
    color: '#333',
    background: '#d1edd1',
  }, {
    color: '#333',
    background: '#e6e6e6',
  }
];


</script>

<style lang="less" scoped>
.setting-list {
  padding: 0 16px 6px;

  .slider-container {
    width: 0;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0 0 0 10px;
    margin: 0 8px;
    --van-slider-bar-height: 4px;
    --van-slider-button-width: 20px;
    --van-slider-button-height: 20px;
    --van-slider-active-background: orangered;
    --van-slider-inactive-background: #777;
    --van-slider-button-background: #777;
  }

  .item {
    width: 100%;
    height: 48px;
    display: flex;
    padding: 8px 0;
    color: var(--a-text-color);
    // 重置va-button样式
    --van-button-default-color: var(--a-text-color);
    --van-button-default-background: #555;
    --van-button-default-border-color: #555;

    .title {
      flex-shrink: 0;
      flex-grow: 0;
      line-height: 32px;
      margin-right: 12px;
      color: inherit;
    }

    &.brightness {
      .slider-container {
        padding-right: 10px;
        padding-left: 0;
      }

      .auto-system {
        --i-color: #555;
        --i-back-color: #adadad;

        /deep/ i {
          width: 16px;
          height: 16px;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          border-radius: 100%;
          color: var(--i-color);
          background-color: var(--i-back-color);
        }

        &.active {
          --i-color: #fff;
          --i-back-color: orangered;
        }
      }
    }

    &.font {
      span {
        display: inline-block;
        line-height: 32px;
        text-align: center;
        width: 50px;
        color: inherit;
      }

      .set-size {
        width: 60px;
      }

      .space {
        width: 0;
        flex-grow: 1;
      }
    }

    &.back, &.turn {
      .con {
        width: 10px;
        flex-grow: 1;
        height: 32px;
        overflow-y: auto;
        display: flex;
        flex-wrap: nowrap;

        &::-webkit-scrollbar {
          display: none;
        }

        .back-one {
          width: 28px;
          height: 28px;
          flex-shrink: 0;
          background-color: #FFFFFF;
          border-radius: 100%;
          display: inline-block;
          border: 1px solid #FFFFFF;
          margin: 2px 12px 2px 0;

          &.active {
            border-color: orangered;
            font-family: vant-icon, serif;
            line-height: 28px;
            text-align: center;
            color: orangered;
            font-size: 14px;

            &:before {
              // vant-icon的图标字体->success
              content: "\e728"
            }
          }
        }

        .turn-one {
          margin-right: 12px;
          padding: 0 16px;
          letter-spacing: 1px;

          &.active {
            --van-button-default-border-color: orangered;
            --van-button-default-color: orangered;
          }
        }
      }
    }
  }
}
</style>
