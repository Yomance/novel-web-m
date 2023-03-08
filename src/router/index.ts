import {createRouter, createWebHistory, Router, RouteRecordRaw} from "vue-router";


const routes: RouteRecordRaw[] = [
    {
        path: '/main',
        name: 'Main',
        alias: '/',
        component: () => import('../views/main/index.vue'),
        children: [
            {
                path: 'home',
                alias: '',
                name: 'Home',
                component: () => import('../views/home/index.vue')
            }, {
                path: 'mine',
                name: 'Mine',
                component: () => import('../views/mine/index.vue')
            }, {
                path: 'classify',
                name: 'Classify',
                component: () => import('../views/classify/index.vue')
            }, {
                path: 'bookshelf',
                name: 'Bookshelf',
                component: () => import('../views/bookshelf/index.vue')
            },
        ]
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import('../views/detail/index.vue')
    },
    {
        path: '/classify-result',
        name: 'ClassifyResult',
        component: () => import('../views/classify-result/index.vue')
    }, {
        path: '/history',
        name: 'History',
        component: () => import('../views/history/index.vue')
    }, {
        path: '/search',
        name: 'Search',
        component: () => import('../views/search/index.vue'),
        children: [
            {
                path: 'home',
                alias: '',
                name: 'SearchHome',
                component: () => import('../views/search-home/index.vue')
            }, {
                path: 'result',
                name: 'SearchResult',
                component: () => import('../views/search-result/index.vue')
            }
        ]
    }, {
        path: '/read',
        name: 'Read',
        component: () => import('../views/read/index.vue')
    }, {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue')
    }
]


const router = createRouter({
    history: createWebHistory(),
    routes
});

const DEFAULT_BACK = ()=>true;

router.onBack = DEFAULT_BACK;
declare module 'vue-router' {
    interface Router {
        onBack: () => boolean;
    }
}

router.beforeEach((to, from, next) => {
    let n = router.onBack();
    if(n){
        router.onBack = DEFAULT_BACK;
    }
    next(n);
})


export default router;


