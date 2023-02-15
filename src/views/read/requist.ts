import {http, Page} from "../../api";
import {Chapter} from "./type";

export const getDir = (bookId: string, current: number, size: number, asc: boolean) => {
    return http.get<Page<Chapter>, Page<Chapter>>("/chapter/dir", {
        params: {
            bookId,
            current,
            size,
            asc,
        }
    });
}

/**
 * 查看当前用户购买本书的章节列表
 * @param bookId 书籍id
 */
export const buyChapterList = (bookId: string) =>
    http.get<number[], number[]>(`/chapter/buyList/${bookId}`);


/**
 * 阅读一章
 * @param bookId
 * @param nums
 */
export const readChapter = (bookId:string, nums:number)=>
    http.get<Chapter, Chapter>(`/chapter/read/${bookId}/${nums}`)


