import {RouteRecordRaw} from "vue-router";

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
        component: () => import('../views/search/index.vue')
    }, {
        path: '/read',
        name: 'Read',
        component: () => import('../views/read/index.vue')
    }, {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login/index.vue')
    },{
        path: '/toAuthor',
        name: 'ToAuthor',
        component: ()=> import('../views/to-author/index.vue')
    },{
        path: '/toAuthorFrom',
        name: 'ToAuthorFrom',
        component: ()=> import('../views/to-author-from/index.vue')
    },{
        path: '/toAuthorDetail',
        name: 'ToAuthorDetail',
        component: ()=> import('../views/to-author-detail/index.vue')
    },{
        path: "/404",
        name:"404",
        component:()=>import("../views/404/index.vue")
    }
]

export default routes;
