import {defineStore} from "pinia";
import {getBookAllInfo} from "../api/book";
import {buyChapterList} from "../views/read/requist";


export const useBookStore = defineStore({
    id: "BookStore",
    state: () => ({
        loading:false,
        bookId: "",
        book: {},
        chapterCount: 0,
        buyList:new Set<string>(), // 购买章节列表
    }),
    actions: {
        loadBookInfo() {
            this.loading = true;
            return getBookAllInfo(this.bookId)
                .then(e => {
                    this.book = e;
                    this.loadBuyList();
                })
                .catch(e=>console.error("err ",e))
                .finally(()=>this.loading = false);
        },
        // 加载购买的章节id列表
        loadBuyList(){
            buyChapterList(this.bookId)
                .then(e => e.forEach(v => this.buyList.add(v)));
        }
    }
});