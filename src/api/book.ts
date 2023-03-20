import {http} from "./index";

export const getBookAllInfo = (id:string)=> http.get("/book/all?id="+id);


export const search = (kw:string)=> http.get("/book/search?kw="+kw);
