import {RouteLocationRaw, useRouter} from "vue-router";
import {useUserStore} from "../views/mine/store";
import {showToast} from "vant";
import router from "../router";
const store = useUserStore();

export const mastLogin = (to:RouteLocationRaw)=>{
    if (store.isLogin){
        router.push(to);
    }else {
        showToast({message: '请登陆后再试', position: 'bottom'});
    }
}
