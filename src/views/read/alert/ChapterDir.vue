<template>
  <van-popup
      :position="position"
      :show="show"
      :style="propSize"
      class="book-dir"
      @update:show="e=>emits('update:show', e)"
  >
    <status-bar/>
    <div class="book">
      <img :src="readBookStore.currentBook.cover" alt="">
      <div class="info">
        <div class="name van-ellipsis">{{ readBookStore.currentBook.name }}</div>
        <div class="author van-ellipsis">{{ readBookStore.currentBook.authorName }}</div>
      </div>
      <van-icon name="arrow" size="18"/>
    </div>
    <div class="set">
      <div class="count">共{{ readBookStore.currentBook.chapterCount }}章</div>
      <div class="sort">
        <van-icon name="exchange"/>
        {{ asc ? '正' : '倒' }}序
      </div>
    </div>
    <van-list
        v-model:error="listProp.error"
        v-model:loading="listProp.loading"
        :finished="listProp.finished"
        class="dir-list"
        finished-text="没有更多了"
        @load="loadData"
    >
      <van-cell
          v-for="item in chapters"
          :class="{lock: !(item.free || buyList.has(item.nums)), active: item.nums === props.current}"
          :title="item.name"
          title-class="van-ellipsis title-class"
          @click="onClick(item)"
      >
        <template #right-icon>
          <van-icon v-if="(item.free || buyList.has(item.nums))" :size="18" name="arrow"/>
          <van-icon v-else :size="18" class-prefix="iconfont icon" name="lock"/>
        </template>
      </van-cell>
    </van-list>
  </van-popup>
</template>
<script lang="ts" setup>
import {computed, PropType, ref, shallowReactive} from "vue";
import StatusBar from "../../../components/StatusBar.vue";
import {Chapter} from "../type";
import {buyChapterList, getDir} from "../requist";
import {useReadBookStore} from "../book-store";

const emits = defineEmits(["update:show"]);
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  position: {
    type: String as PropType<"left" | "right" | "bottom">,
    default: "left"
  },
  current: {type: Number, default: 1},
});

function onClick(c: Chapter) {
  readBookStore.loadChapter(c.nums);
  emits("update:show", false);
}

const readBookStore = useReadBookStore();
// 排序
const asc = ref(true);
// 弹出框大小
const propSize = computed(() => {
  if (props.position == "bottom") {
    return {
      width: "100%",
      height: "80%"
    }
  } else {
    return {
      width: "80%",
      height: "100%",
    }
  }
})

const chapters = shallowReactive<Chapter[]>([]);

const buyList = new Set<number>();
let current = 1;
const listProp = shallowReactive({
  loading: false,
  finished: false,
  error: false,
});
buyChapterList(readBookStore.currentBook.id).then(e => e.forEach(v => buyList.add(v)));

function loadData() {
  getDir(
      readBookStore.currentBook.id,
      current,
      20,
      asc.value,
  )
      .then(e => {
        if (e.data.length < 20) {
          listProp.finished = true;
        }
        chapters.push(...e.data);
        current++;
      })
      .catch(e => listProp.error = true)
      .finally(() => {
        listProp.loading = false
      });
}
</script>
<style lang="less">

.book-dir {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .title-class {
    width: 0;
    flex: none;
    flex-shrink: 0;
    flex-grow: 1;
  }

  .van-cell__value {
    flex: none;
  }
}

.book {
  margin-top: 10px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  --h: 60px;

  img {
    width: calc(0.75 * var(--h));
    height: var(--h);
    border-radius: 5px;
    flex-shrink: 0;
  }

  .info {
    --info-p: 10px;
    width: 0;
    flex-grow: 1;
    height: var(--h);
    padding: var(--info-p);
    --info-h: calc(var(--h) - 2 * var(--info-p));

    .name {
      width: 100%;
      line-height: calc(var(--info-h) * 0.6);
      font-size: var(--van-font-size-lg);
    }

    .author {
      width: 100%;
      line-height: calc(var(--info-h) * 0.4);
      font-size: var(--van-font-size-sm);
    }
  }

  i {
    flex-shrink: 0;
    line-height: var(--h);
  }
}

.set {
  width: 100%;
  padding: 16px 16px;
  display: flex;

  .count {
    width: 0;
    flex-grow: 1;
  }

  .sort {
    flex-shrink: 0;
    font-size: var(--text-size-5);

    i:before {
      transform: rotate(90deg);
    }
  }
}

.dir-list {
  height: 0;
  flex-grow: 1;
  overflow: auto;

  .lock {
    color: var(--van-text-color-2);
  }

  .active {
    --van-cell-text-color: #ed424b;

    i {
      color: var(--van-text-color);
    }
  }
}


</style>
