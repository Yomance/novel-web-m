import {createRouter, createWebHistory} from "vue-router";
import routes from "./route";

declare module 'vue-router' {
    interface Router {
        onBack: () => boolean;
    }
}

const DEFAULT_BACK = () => true;


const router = createRouter({
    history: createWebHistory(import.meta.env.VITE_BASE_URI),
    routes
});

export const mastLogin = (name: string) => router.push({name});


router.onBack = DEFAULT_BACK;


router.beforeEach((to, from, next) => {
    let n = router.onBack();
    if (n) {
        router.onBack = DEFAULT_BACK;
    }
    next(n);
})


export default router;


