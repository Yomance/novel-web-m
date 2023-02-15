import {defineStore} from "pinia";
import {TokenModel} from "../login/type";
import {http} from "../../api";


export const useUserStore = defineStore({
    id: 'userStore',
    state: () => ({
        id: "", // 当前用户id
        username: "前往登录", // 用户名
        avatar: "/src/assets/image/avatar/nologin.png", // 头像
        readTime: 0, // 阅读时长 单位 分钟
        tokenName: "token", // token传输的名称
        tokenValue: "", // token
        tokenTimeout: 1999000, // token有效期
        purse: {
            goldCoins: 0, // 金币
            coins: 0, // 硬币
            coupons: 0, // 优惠券数量
        },
    }),
    getters: {
        isLogin(): boolean {
            return this.tokenValue != null && this.tokenValue.length > 0;
        },
        readTimeString(): string {
            if (this.isLogin) {
                if (this.readTime < 1000) {
                    return this.readTime + "";
                }
                return (this.readTime / 60).toFixed(1);
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
        login(token: TokenModel) {
            console.log(token)
            // todo
            this.tokenValue = token.value;
            this.tokenName = token.name || "token";
            this.tokenTimeout = token.timeout;
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

