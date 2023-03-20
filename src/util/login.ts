import {showConfirmDialog} from "vant";
import router from '../router/index';
import {RouteLocationRaw} from "vue-router";
import {useUserStore} from "../views/mine/store";
let store:any;
setTimeout(()=>store = useUserStore());
export const needLogin = (to?:RouteLocationRaw|Function) => {
    if (to instanceof Event) to = undefined;
    if (store.isLogin){
        if (to){
            typeof to === 'function' ? to() :  router.push(to);
        }
        return;
    }
    return showConfirmDialog({
        title: "去登陆",
        message: "登陆后即可进行操作！"
    })
        .then(e => {
            router.push({name: "Login"}).then(e=>{
                console.log(e, "login")
            });
        })
        .catch(e => {});
}
