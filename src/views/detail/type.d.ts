import {Book} from "../../type/book";

export interface DetailBook extends Book {
    inShelf: boolean; // 是否在书架中
}

export type S = {
    book: DetailBook,
}
export type G = {}
export type A = {}

