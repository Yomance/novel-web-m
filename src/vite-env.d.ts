/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API:string;//api路径
    readonly VITE_BASE_URI:string;// 路由基础路径
}

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
