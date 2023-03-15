import {defineStore} from "pinia";
import {http} from "../../api";
export interface Token {
    name: string;
    value: string;
    timeout: number;
}

export const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        id: "", // 当前用户id
        username: "前往登录", // 用户名
        avatar: "/src/assets/image/avatar/nologin.png", // 头像
        readTime: 0, // 阅读时长 单位 分钟
        purse: {
            goldCoins: 0, // 金币
            coins: 0, // 硬币
            coupons: 0, // 优惠券数量
        },
        token:{
            name:"",
            value:"",
            timeout: 0,
        }
    }),
    getters: {
        isLogin():boolean{
            return this.token.value != "";
        },
        readTimeString(): string {
            if (this.isLogin) {
                if (this.readTime < 1000) {
                    return this.readTime + "";
                }
                return (this.readTime / 60).toFixed(1) || "--";
            } else {
                return "-";
            }
        },
        readTimeDesc(): string {
            return `阅读时长/${this.readTime < 1000 ? '分钟' : '小时'}`;
        }
    },
    actions: {
        // 登陆方法 主要记录用户token
        login(token: Token) {
            this.token.value = token.value;
            this.token.name = token.name;
            this.token.timeout = token.timeout;
            return this.loadUserInfo();
        },
        loadUserInfo() {
            return http.get<any, any>("/user/info").then(e => {
                this.id = e.id;
                this.username = e.username;
                this.avatar = e.avatar;
                this.readTime = e.readTime;
                return e;
            });
        },
        logout() {
            this.$reset();
        }
    },
    persist: {
        enabled: true,
        strategies: [{storage: sessionStorage,}]
    }
})

