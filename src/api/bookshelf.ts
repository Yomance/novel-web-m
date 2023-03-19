import { Book } from '../type/book';
import { http } from "./index";

const BASE = "";

export const getShelfList = () =>
  http.get<Book[]>("/bookshelf/listShelf");

export const removeShelfByIds = (ids: string[])=>
    http.post("/bookshelf/removeShelf", ids)

export const addShelf = (bookId: string)=>
    http.post("/bookshelf/addShelf", bookId);
