<template>
  <div class="classify-view  no-scroll-bar">
    <status-bar background="var(--background-color)" color="black" fixed/>
    <van-space direction="vertical" fill size="16px">
      <!-- <van-tabs shrink type="card" @change="loadData">
        <van-tab title="男生"/>
        <van-tab title="女生"/>
      </van-tabs> -->
      <van-loading v-if="pageLoading" size="24px" vertical>加载中...</van-loading>
      <div v-else>
        <van-space direction="vertical" fill size="16px">
          <simple-card title="热门分类">
            <div class="grid">
              <div v-for="item in category" class="item" @click="onClick('category', item.name, item.id)">
                <div class="text">{{ item.name }}</div>
                <div class="books">
                  <img alt="" class="top" :src="url('/cover.jpg')">
                  <img alt="" class="end" :src="url('/cover1.jpg')">
                </div>
              </div>
            </div>
          </simple-card>
          <!-- <simple-card title="按情节分类">
            <div class="grid-1">
              <div v-for="item in tags" class="item" @click="onClick('tag', item.name, item.id)">{{ item.name }}</div>
            </div>
          </simple-card> -->
        </van-space>
      </div>
    </van-space>
  </div>
</template>

<script lang="ts" setup>
import SimpleCard from "../../components/SimpleCard.vue";
import {useRouter} from "vue-router";
import {http} from "../../api";
import {ref} from "vue";
import {Category, Tag} from "../../type/book";
import StatusBar from "../../components/StatusBar.vue";
import {url} from "/src/util/file";

const category = ref<Category[]>([]);
const tags = ref<Tag[]>([]);
const pageLoading = ref(false);

function loadData() {
  pageLoading.value = true;
  http.get("/classify").then(data => {
    category.value = data.categories;
    tags.value = data.tags;
  }).finally(() => pageLoading.value = false);
}

loadData();


let router = useRouter();
const onClick = (type: "category" | "tag", name: string, id: string) => {
  router.push({
    name: "ClassifyResult",
    query: {
      type,
      name,
      id
    }
  })
}
</script>

<style lang="less" scoped>
.classify-view {
  width: 100%;
  height: 100%;
  padding: 16px;
  background: var(--background-color);
  overflow: auto;

  .grid {
    width: 100%;
    height: auto;
    display: grid;
    grid-template-columns: repeat(2, calc(50% - 6px));
    grid-template-rows: auto;
    grid-gap: 12px;

    .item {
      height: 70px;
      background: var(--background-color);
      border-radius: 4px;
      overflow: hidden;
      padding: 10px;
      display: flex;
      justify-content: space-between;

      .text {
        height: 100%;
        line-height: 50px;
      }

      .books {
        height: 50px;
        width: 44px;
        position: relative;

        .top {
          position: absolute;
          top: 0;
          left: 0;
          height: 50px;
          width: 36px;
          border-radius: 2px;
          z-index: 1;
          box-shadow: 1px 0 2px rgb(0 0 0 / 30%);
        }

        .end {
          position: absolute;
          bottom: 2px;
          right: 0;
          height: 35px;
          width: 30px;
          border-radius: 2px;
          z-index: 0;
        }
      }
    }
  }

  .grid-1 {
    width: 100%;
    display: grid;
    grid-gap: 12px;
    grid-template-columns: repeat(3, calc(33.33% - 8px));

    .item {
      height: 40px;
      line-height: 40px;
      color: var(--text-color-primary);
      text-align: center;
      background: var(--background-color);
      border-radius: 2px;
    }
  }
}
</style>

