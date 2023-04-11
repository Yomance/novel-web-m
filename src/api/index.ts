import axios from "axios";
import {useUserStore} from "../views/mine/store";
import {needLogin} from "../util/login";

export interface Result<D> {
    code: number,
    msg: string,
    data: D
}

export interface Page<D> {
    total: number; // 数据总数
    current: number; // 当前页
    size: number; // 一页的数据量
    totalPage: number; // 总页码
    data: D[];// 数据
}

const ConfigBaseURL = import.meta.env.VITE_API //默认路径，这里也可以使用env来判断环境

export const downloader = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: ConfigBaseURL,
});

//使用create方法创建axios实例
const instance = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: ConfigBaseURL,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    }
})
let userStore:any;
// 添加请求拦截器
instance.interceptors.request.use(config => {
    if (!userStore) userStore = useUserStore();
    if (userStore.token.name){
        // @ts-ignore
        config.headers = {
            ...config.headers,
            [userStore.token.name]:userStore.token.value,
        }
    }
    return config;
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
    return new Promise<any>((resolve, reject) => {
        if (response.data.code == 0) {
            resolve(response.data.data);
        } else if (response.data.code == -1){
            userStore.logout();
            needLogin();
            reject(response.data);
        } else {
            reject(response.data);
        }
    });
}, error => {
    console.log('TCL: error', error)
    return Promise.reject({message: error.Message})
})
export const http = instance;
