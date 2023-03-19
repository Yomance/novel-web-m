import {http, Page} from "./index";


export const page = (
    current: number,
    chapterId:string,
    {segmentId, replyId}:any = {}
)=>
    http.get<Page<any>>("/comment/page", {params:{current, chapterId,segmentId, replyId}});

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

