import {http} from "./index";

export enum AuthorAuditState{
    /**
     * 待审核
     */
    wait,
    /**
     * 审核失败
     */
    fail,
    /**
     * 审核成功
     */
    suc
}

export interface AuthorAudit {
    id: string;
    idNumber: string;
    startDate: string;
    endDate: string;
    gender: string;
    name: string;
    state: AuthorAuditState;
    errMsg:string;
}


export const upload = (front: File, back: File) => {
    console.log(front, back)
    let data = new FormData();
    data.append("front", front)
    data.append("back", back)
    return http.post("/toAuthor/upload", data, {headers: {"Content-Type": "multipart/form-data"}});
}

export const add = (data: AuthorAudit) =>
    http.post("/toAuthor/add", data);

/**
 * 最新的一条记录
 */
export const newLog = ()=>
    http.get<AuthorAudit>("/toAuthor/newLog");