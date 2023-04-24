import {http, Page} from "./index";

/**
 * 评论点赞
 * @param commentId 评论id
 * @param like 点赞or取消
 */
export const like = (commentId:string, like:boolean)=>
    http.get("/comment/like", {params:{commentId, like}});

export const page = (
    current: number,
    chapterId:string,
    {segmentId, replyId}:any = {}
)=>
    http.get<Page<any>>("/comment/page", {params:{current, chapterId,segmentId, replyId}});

export const selfPage = (current:number)=>
    http.get<Page<any>,Page<any>>("/comment/selfPage", {params:{current}});

export const del = (id:string)=>
    http.post("/comment/del/self", id)

export const info = (id:string)=>
    http.post<any, any>("/comment/info/all", id);


export const addComment = (
    bookId: string,
    chapterId: string,
    content:string,
    segmentId: string | null | undefined,
    parentId: string | null | undefined,
    replyUserId: string | null | undefined,
)=> {
    return http.post("/comment/add", {bookId, chapterId, content, segmentId, parentId, replyUserId})
}

