import {defineStore} from "pinia";
import {S} from "./type";


export const useBookDetailStore = defineStore<string, S>({
    id: "BookDetailStore",
    state: () => ({
        book: {}
    })
});
