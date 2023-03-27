import {http} from "./index";

export const buyCoin = (money: number, manner: number,) =>
    http.post("/pay/buyCoin", {money, manner})

export const buyChapter = (bookId:string, chapterId: string)=>
    http.post("/pay/buyChapter", {bookId, id:chapterId});