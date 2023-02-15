import {defineStore} from "pinia";
import {http, Result} from "../../api";
import {SearchViewModel} from "../../moke/search";
import {Book} from "../../type/book";

type ID = string;
type S = {
    history: string[];
    hotText: string[];
    hotBook: Book[];
}
type G = {
    maxHistorySize(state: S): number;
    hasHistory(state: S): boolean;
}
type A = {
    loadData(): Promise<any>;
    clearHistory(): void;
    addHistory(kw: string): void;
}

export const useSearchHomeStore = defineStore<ID, S, G, A>({
    id: 'search-home-store',
    state: () => ({
        history: [],
        hotText: [],
        hotBook: []
    }),
    getters: {
        maxHistorySize: () => 10,
        hasHistory(state): boolean {
            return state.history.length !== 0
        }
    },
    actions: {
        loadData() {
            return http.get<SearchViewModel, SearchViewModel>("/search/view").then(data => {
                this.hotBook = data.hotBook;
                this.hotText = data.hotText;
                return data;
            })
        },
        clearHistory() {
            this.history = [];
        },
        addHistory(kw: string) {
            const of = this.history.indexOf(kw);
            if (of != -1) {
                this.history.splice(of, 1);
            } else if (this.history.length === this.maxHistorySize) {
                this.history.splice(this.maxHistorySize - 1, 1);
            }
            this.history.unshift(kw);
        },
    },
    persist: {
        enabled: true,
        strategies: [
            {
                paths: ['history'],
                storage: localStorage,
            },
            {
                paths: ['hotText', 'hotBook'],
                storage: sessionStorage,
            }
        ]
    }
})
