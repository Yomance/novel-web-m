import {http} from "./index";

export const buyCoin = (money: number, manner: number,) =>
    http.post("/pay/buyCoin", {money, manner})