import {http} from "./index";

export const getChapter = (bookId:string, chapterId: string)=>
    http.get("/chapter/read", {params:{bookId, chapterId}});

export const getIdList = (bookId:string) =>
    http.get<string[],string[]>("/chapter/ids", {params:{bookId}});