import { Book } from '../type/book';
import { http } from "./index";
import {ref} from "vue";

const BASE = "";

export const getShelfList = () =>
  http.get<Book[]>("/bookshelf/listShelf");

export const removeShelfByIds = (ids: string[])=>
    http.post("/bookshelf/removeShelf", ids)

export const addShelf = (bookId: string)=>
    http.post("/bookshelf/addShelf", bookId);


export const history = ()=>
    http.get("/bookshelf/history");

export const delHistory = (bookIds:string[])=>
    http.post("/bookshelf/delHistory", bookIds);