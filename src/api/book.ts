import {http} from "./index";

export const getBookAllInfo = (id:string)=> http.get("/book/all?id="+id);
