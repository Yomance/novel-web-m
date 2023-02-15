

import {App, Plugin} from 'vue'


export default {
    install(app: App, options = {time: 500}){
        app.directive("longpress",(el:HTMLElement,binding,vnode,p)=>{
            // 确保提供的表达式是函数
            if (typeof binding.value !== 'function') {
                // 获取组件名称
                // @ts-ignore
                const compName = vnode.context.name;
                // 将警告传递给控制台
                // @ts-ignore
                let warn = `[longpress:] provided expression '${binding.expression}' is not afunction, but has to be `;
                if (compName) { warn += `Found in component '${compName}' `}
                console.warn(warn);
            }
            let pressTimer:number|null = null;
            let start = (e:any) => {
                if (e.type === 'click' && e.button !== 0) return;
                if (pressTimer === null) {
                    pressTimer = setTimeout(() => binding.value(e), options.time)
                }
            }
            // 取消计时器
            let cancel = () => {
                if (pressTimer === null ) return;
                clearTimeout(pressTimer);
                pressTimer = null;
            }
            // 添加事件监听器
            el.addEventListener("mousedown", start);
            el.addEventListener("touchstart", start);
            el.addEventListener("touchmove", cancel)
            // 取消计时器
            el.addEventListener("click", cancel);
            el.addEventListener("mouseout", cancel);
            el.addEventListener("touchend", cancel);
            el.addEventListener("touchcancel", cancel);
        })
    }
}
