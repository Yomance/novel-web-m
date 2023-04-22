import {downloader, getUrl, http} from "./index";
import {Token} from "../views/mine/store";
import {ref} from "vue";
export const genCaptcha = getUrl("/login/captcha/gen");
export const validCaptcha = getUrl("/login/captcha/check");
export const captchaGen = ()=>
    http.get("/login/captcha/gen")


export const sendPhoneCode = (codeId:string, phone:string)=>
    http.post("/login/register/phoneCode", null, {
        params:{codeId,phone}
    });
export const register = (data:any)=>
    http.post("/login/register",data);


const key = "111";

export const getImageCode = () => {
    return downloader.get("/login/code", {
        responseType: "arraybuffer",
        params: {
            key,
            t: Math.random()
        }
    }).then(res => {
        const reduce = new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
        return 'data:image/png;base64,' + btoa(reduce);
    })
};

export const login = (data: LoginParam) => http.post<any, Token>("/login", data);


export interface LoginParam {
    phone: string,
// 密码
    password: string,
// 验证码key
    key: string,

// 图形验证码
    imageCode: string,
}

export const getDefaultBean = (): LoginParam => ({
    phone: "17631424475",
    password: "",
    key: "",
    imageCode: "",
})


export interface TokenModel {
    value: string;
    timeout: number;
    name?: string;
}

