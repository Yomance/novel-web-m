export interface LoginParam {
    account: string,
// 密码
    password: string,
// 验证码key
    key: string,

// 图形验证码
    imageCode: string,
}

export const getDefaultBean = (): LoginParam => ({
    account: "17631424475",
    password: "123456",
    key: "",
    imageCode: "",
})


export interface TokenModel {
    value: string;
    timeout: number;
    name?: string;
}
