import {http} from "./index";

/**
 * 获取章节信息 包含内容
 * @param bookId 书籍id
 * @param chapterId 章节id 没有则查询第一张
 */
export const getChapter = (bookId:string, chapterId?: string)=>
    http.get("/chapter/read", {params:{bookId, chapterId}});

export const getIdList = (bookId:string) =>
    http.get<string[],string[]>("/chapter/ids", {params:{bookId}});
