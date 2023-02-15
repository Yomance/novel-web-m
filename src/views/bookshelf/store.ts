import {_GettersTree, defineStore, StateTree} from "pinia";
import axios from "axios";
import {Book} from "../../type/book";
import {http} from "../../api";

interface D extends StateTree {
    books: Book[];
    readonly ids: Set<String>;
    loading: boolean;
    selectCount: number;
}

interface G extends _GettersTree<D> {
    empty: (state: D) => boolean;
    isSelectAll: (state: D) => boolean;
}

interface A {
    inShelf: (bid: string) => Boolean;
    cancelSelect: () => void;
    removeBook: (bid?: string) => Promise<any>;
    addBook: (bid: string) => Promise<any>;
    loadData: () => void;
}

export const useBookshelfStore = defineStore<string, D, G, A>({
    id: 'bookshelf-store',
    state: () => ({
        books: [],
        ids: new Set(),
        loading: false,
        selectCount: 0,
        selectList: new Set(),
    }),
    getters: {
        empty(state): boolean {
            return state.books.length === 0;
        },
        isSelectAll(state): boolean {
            return state.selectCount == state.books.length;
        },
    },
    actions: {
        // 当前书籍是否在书架中
        inShelf(bid: string): Boolean {
            return this.ids.has(bid);
        },
        // 取消选择
        cancelSelect() {
            this.books.forEach(e => e.isSelect = false);
        },
        /**
         * 删除书架中的书籍
         * (bid == null) => 则将bookList中isSelect为true的删除
         * @param bid 要删除的书籍id
         */
        removeBook(bid?: string) {
            this.loading = true;
            let removeList:string[] = [];
            if (bid) {
                removeList.push(bid);
            } else {
                this.books.forEach(e => {
                    e.isSelect ? removeList.push(e.id) : 0;
                });
            }
            return http.post("/bookshelf/removeShelf", removeList).then(e => {
                this.books = this.books.filter(e => !removeList.includes(e.id))
                this.loading = false;
                return this.loadData();
            })
        },
        /**
         * 将书籍加入书架
         * @param bid 书籍id
         */
        addBook(bid: string) {
            this.loading = true;
            return http.post("/bookshelf/addShelf", bid).then(e => {
                this.books.unshift(e.data.data);
                this.loading = false;
                return e;
            });
        },

        // 加载书架信息
        loadData() {
            this.loading = true;
            return http.get<any, any>("/bookshelf/listShelf").then(e=>{
                this.books = e;
                this.ids.clear();
                this.books.forEach(e=>this.ids.add(e.id))
                this.loading = false;
            })
        }
    }
})
