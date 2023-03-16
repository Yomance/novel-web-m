import {defineStore} from "pinia";
import {getChapter} from "../api/chapter";

export const useChapterStore = defineStore({
    id: "ChapterStore",
    state: () => ({
        chapterId: "",
        bookId: "",
        loading: false,
        chapter: {},
    }),
    getters: {
        hasLast(): boolean {
            // @ts-ignore
            return this.chapter.lastId;
        },
        hasNext(): boolean {
            // @ts-ignore
            return this.chapter.nextId;
        }
    },
    actions: {
        loadChapter() {
            if (!this.bookId) {
                return;
            }
            this.loading = true;
            getChapter(this.bookId, this.chapterId)
                .then((e: any) => (this.chapter = e, this.chapterId = e.id))
                .finally(() => this.loading = false);
        },
        last() {
            if (this.hasLast) {
                let bak = this.chapterId;
                // @ts-ignore
                this.chapterId = this.chapter.lastId;
                this.loadChapter();
                this.chapterId = bak;
            }
        },
        next() {
            if (this.hasNext) {
                let bak = this.chapterId;
                // @ts-ignore
                this.chapterId = this.chapter.nextId;
                this.loadChapter();
                this.chapterId = bak;
            }
        }
    }
})