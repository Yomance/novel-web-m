import {http} from "./index";

export const signIn = ()=>
    http.post("/activity/signIn");