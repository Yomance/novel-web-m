import Mock from "mockjs";

export const mMock = <T>(url:string|RegExp, template:T)=>{
    // @ts-ignore
    Mock.mock(url, {
        code: 0,
        msg:"成功",
        data: template
    });
}
