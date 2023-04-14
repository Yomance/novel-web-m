import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig(({mode})=>{
    const env = loadEnv(mode, './');
    let base = env.VITE_BASE_URI;
    // 解决打包后 嵌套路由js加载失败问题
    // https://blog.csdn.net/xingorg/article/details/120537203
    if (base.charAt(base.length-1) != '/'){
        base+="/";
    }
    return{
        plugins: [
            vue(),
            Components({
                resolvers: [VantResolver({importStyle: false})],
            })
        ],
        server: {
            host: '0.0.0.0',
            proxy:{
                '/static': {
                    target: 'http://localhost:11001/',
                    changeOrigin: true,
                    rewrite: path => path.replace(/^\/static/, '')
                },
            }
        },
        base: base,
        build:{
            outDir: "dist",
            terserOptions: {
                compress: {
                    drop_console: true,
                    drop_debugger: true
                }
            },
        },
    }
})
