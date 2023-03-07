
export interface Token {
    tokenName: string;
    tokenValue: string;
    tokenTimeout: number;
}

const instance = {
    tokenName: "",
    tokenValue: "",
    tokebTimeout: 0,
}

function set(token: Token) {
    Object.assign(instance, token);
    if(instance.tokenName === ""){
        instance.tokenName = "token";
    }
}
export default {
    get name(){
        return instance.tokenName || "token";
    },
    get value(){
        return instance.tokenValue;
    },
    get isLogin(){
        return instance.tokenValue != "";
    },
    set,
    logout(){
        instance.tokenValue = "";
        instance.tokebTimeout = 0;
    }
}
