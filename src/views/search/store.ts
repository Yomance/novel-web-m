import {defineStore} from "pinia";
import {Router} from "vue-router";

type ID = string;
type S = {
    value: string;
    defaultValue: string;
}
type G = {
    kw(): string;
}
type A = {
    /**
     * 搜索
     * @param router 路由
     */
    search(router: Router): void;
}

export const useSearchStore = defineStore<ID, S, G, A>({
    id: 'search-store',
    state: () => ({
        value: "",
        defaultValue: "人道大圣",
    }),
    getters: {
        kw(): string {
            return this.value.length ? this.value : this.defaultValue;
        }
    },
    actions: {
        search(router) {
            let to = {
                name: "SearchResult",
                query: {
                    kw: this.kw,
                }
            }
            if (router.currentRoute.value.name === "SearchHome") {
                router.push(to)
            } else {
                router.replace(to)
            }
        }
    },
})
