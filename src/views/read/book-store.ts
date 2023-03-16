import {defineStore} from "pinia";
import {readChapter} from "./requist";


export const useReadBookStore = defineStore({
    id: "ReadBookStore",
    state: () => ({
        bookId: "",
        currentBook: {
            id: "1611685969415892993",
            name: '我家学姐，不是人！',
            chapterCount: 200,
            cover: "https://www.ddxs.com/img/53/53300.jpg",
            authorName: "吾为妖孽",
        },
        currentChapter: {
            nums: 1,
            content: "",
        },
        status: {
            loading: false, // 加载章节信息
            error: false, // 加载章节信息失败
        },
        currentChapterNums: 1,
    }),
    getters: {
        hasNextChapter(): boolean {
            return this.currentChapter.nums <= this.currentBook.chapterCount;
        },
        hasLastChapter(): boolean {
            return this.currentChapter.nums > 0;
        }
    },
    actions: {
        /**
         * 加载章节信息
         * @param nums 章节序号
         */
        loadChapter(nums?: number) {
            nums = nums ? nums : this.currentChapter.nums;
            this.status.loading = true;
            this.status.error = false;
            readChapter(this.currentBook.id, nums)
                .then(e => {
                    // @ts-ignore
                    this.currentChapter = e;
                    this.currentChapterNums = e.nums;
                    return e;
                })
                .catch(e => this.status.error = true)
                .finally(() => this.status.loading = false);
        },
        loadNextChapter() {
            if (this.hasNextChapter) {
                this.loadChapter(this.currentChapter.nums + 1);
            }
        },
        loadLastChapter() {
            if (this.hasLastChapter) {
                this.loadChapter(this.currentChapter.nums - 1);
            }
        }
    }
})
