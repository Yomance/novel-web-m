
let BASE = import.meta.env.VITE_BASE_URI;

if (BASE.endsWith("/")){
    BASE+="static";
}else {
    BASE+="/static"
}

export const url = (path:string)=>{
    return BASE + path;
}