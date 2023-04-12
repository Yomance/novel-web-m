
let BASE = import.meta.env.VITE_BASE_URI;

if (BASE.endsWith("/")){
    BASE+="assets/static";
}else {
    BASE+="/assets/static"
}

export const url = (path:string)=>{
    return BASE + path;
}