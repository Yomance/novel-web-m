import {defineStore} from "pinia";
import {getBookAllInfo} from "../api/book";


export const useBookStore = defineStore({
    id: "BookStore",
    state: () => ({
        loading:false,
        bookId: "",
        book: {},
        chapterCount: 0,
    }),
    actions: {
        loadBookInfo() {
            this.loading = true;
            return getBookAllInfo(this.bookId)
                .then(e => this.book = e)
                .catch(e=>console.error("err ",e))
                .finally(()=>this.loading = false);
        }
    }
});