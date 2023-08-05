import {http} from "./index";

export const uploadAvatar = (file:File)=>{
    const data = new FormData();
    console.log(file);
    data.append("file", file);
    return http.post<any, string>("/user/avatar", data, {
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
}

export const rename = (name:string)=>
    http.post<any, string>("/user/rename",name);

export const renameState = ()=>
    http.get<any, { first:boolean, price:number, lastTime: string }>("/user/renameState");

export const addReadTime = ()=>
    http.post("/user/add/readTime");