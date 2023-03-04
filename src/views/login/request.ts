import { Token } from './../../api/token';
import {downloader, http} from "../../api";
import {LoginParam, TokenModel} from "./type";
import token from "../../api/token";

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

