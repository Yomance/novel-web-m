import {ref} from "vue";

const loading = ref(false);

export const usePageLoading = {
    loading(){
        loading.value = true;
    },
    finish(){
        loading.value = false;
    },
    error(){
        loading.value = false;
    }
}
