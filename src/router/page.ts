
import router from './index';

export const toRead = (bid:string, cid?:string)=>{
    if (!bid){
        console.error("书籍id不能为空");
        return;
    }
    router.push({name: "Read", query:{bid, cid}, params: {bid, cid}});
}
