import {defineStore} from "pinia";
import {ref} from "vue";
import {Config} from "/src/views/page/Config";
import {TurnPageNovel} from "/src/views/page/TurnPageNovel";

export const useReadSettingStore = defineStore("readSetting",{
    state(){
        const turnPageType = ref<"tb"|"emulation">("tb");
        const conf = ref<Config>()
        const novel = ref<TurnPageNovel>();
        return{
            turnPageType,
            conf,
            novel
        }
    },
    persist: {
        enabled: true,
        strategies: [{storage: localStorage,}]
    }
})