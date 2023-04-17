import {calcText} from "./CalcText";
import {Config} from "./Config";

export interface Chapter{
    id:string,
    name:string,
    content:string;
    isFirst: boolean;
    isFinal: boolean;
}

export type Page = {
    name: string;
    id:string;
    list:string[];
};
interface GetPage{
    getNext():Page|null;
    getLast():Page|null;
    getCurrent():Page;
    next():number|null;
    last():number|null;
}

class Chap implements GetPage{
    public static of(ch:Chapter, conf:Config){
        return new Chap(ch, conf);
    }
    private readonly list:string[][];
    private readonly name: string;
    private readonly id:string;
    private index:number = 0;

    public constructor(ch:Chapter, conf:Config) {
        this.id = ch.id;
        this.name = ch.name;
        const content = this.parseContent(ch.content);
        const text = calcText(conf.ctx, content, conf.pageWidth-conf.padding*2);
        this.list = this.toPages(text, conf.pageLines);
    }

    public isFirst(){
        return this.index == 0;
    }
    public first(){
        this.index = 0;
    }
    public final(){
        this.index = this.list.length-1;
    }
    public next(){
        if (this.index >= this.list.length-1){
            return null;
        }
        return ++this.index;
    }
    public getNext():Page|null{
        if (this.index >= this.list.length-1){
            return null;
        }
        return {
            name: this.name,
            id:this.id,
            list:this.list[this.index+1],
        }
    }

    public last(){
        if (this.index <= 0){
            return null;
        }
        return --this.index;
    }
    public getLast():Page|null{
        if (this.index <= 0){
            return null;
        }
        return {
            name: this.name,
            id:this.id,
            list:this.list[this.index-1],
        }
    }
    public getCurrent():Page{
        return{
            name: this.name,
            id:this.id,
            list:this.list[this.index],
        }
    }

    protected parseContent(content:string):{id:string,val:string}[]{
        return content.split("\n").map((e:string) => {
            // return{id: "1", val: e}
            return{id: e.substring(0, 4), val: e.substring(5)}
        })
    }

    protected toPages(strings:string[], lines:number){
        let res:Array<string[]> = [];
        let arr:string[] = [];
        for (let i = 0,j=0; i < strings.length; i++, j++) {
            if (j >= lines) {
                j = 0;
                res.push(arr);
                arr = [];
            }
            arr.push(strings[i]);
        }
        if (arr.length>0) res.push(arr);
        return res;
    }
}


export class DataContainer{
    private chapters:Chap[] = [];
    private index:number = 0;
    private conf:Config;
    public loadNext:()=>Promise<Chapter> = ()=>Promise.reject();
    public loadLast:()=>Promise<Chapter> = ()=>Promise.reject();
    private readonly flush:()=>void = ()=>{};
    private readonly ctx:CanvasRenderingContext2D;
    private loadingNext:boolean=false;
    private loadingLast:boolean=false;
    private isLoadFinal:boolean=false; // 是否已经加载了最后一章
    private isLoadFirst:boolean=false; // 是否已经加载了第一章
    constructor(
        chap:Chapter,
        loadNext: () => Promise<Chapter>,
        loadLast: () => Promise<Chapter>,
        conf:Config,
        flush:()=>void,
    ) {
        this.flush = flush;
        this.loadNext = loadNext;
        this.loadLast = loadLast;
        this.ctx = conf.ctx;
        this.conf = conf;
        this.chapters.push(Chap.of(chap, conf));
        this.isLoadFirst = chap.isFirst;
        this.isLoadFinal = chap.isFinal;
    }

    public getCurrent():"finish"|"loading"|Page{
        if (this.index >= this.chapters.length){
            return this.isLoadFinal ? "loading" : "finish";
        }
        if (this.index < 0){
            return this.isLoadFirst ? "loading" : "finish";
        }
        const chap = this.chapters[this.index];
        return chap.getCurrent();
    }

    public getLast():"finish"|"loading"|Page{
        let page = this.chapters[this.index]
        if (page == null){
            page = this.chapters[this.index-1];
            return page.getCurrent();
            // console.log(page)
        }
        const last = page.getLast();
        if (last != null){
            return last;
        }
        if (this.index === 0){
            if (this.isLoadFirst){
                return "finish"; // 已经是第一章了
            }
            if(this.loadingLast){
                return "loading"; // 加载中
            }
            this.loadingLast = true;
            this.loadLast().then(chapter=>{
                const chap = Chap.of(chapter,this.conf);
                chap.final();
                this.chapters.unshift(chap);
                this.index++;
                this.isLoadFirst = chapter.isFirst;
            }).finally(()=>{
                this.loadingLast = false;
                this.flush();
            })
            return "loading"; // 加载中
        }
        return this.chapters[this.index-1].getCurrent();
    }

    public getNext():"finish"|"loading"|Page{
        let page = this.chapters[this.index]
        if (page == null){
            page = this.chapters[this.index+1]
        }
        const next = page.getNext();
        if (next != null){
            return next;
        }
        if (this.index === this.chapters.length-1){
            if (this.isLoadFinal){
                return "finish"; // 已经是第一章了
            }
            if(this.loadingNext){
                return "loading"; // 加载中
            }
            this.loadingNext = true;
            this.loadNext().then(chapter=>{
                const chap = Chap.of(chapter,this.conf);
                chap.first();
                this.chapters.push(chap);
                this.isLoadFinal = chapter.isFinal;
            }).finally(()=>{
                this.loadingNext = false;
                this.flush();
            })
            return "loading"; // 加载中
        }
        return this.chapters[this.index+1].getCurrent();
    }

    public next(){
        if (this.index == -1){
            this.index++;
            const page = this.chapters[this.index];
            if (page){
                page.first();
            }
            return;
        }
        // todo
        const next = this.chapters[this.index].next();
        if (next === null){
            this.index++;
            const chap = this.chapters[this.index];
            if (chap){
                chap.first();
            }
        }
    }
    public last(){
        if (this.index == this.chapters.length){
            this.index--;
            const page = this.chapters[this.index];
            if (page){
                page.final();
            }
            return;
        }
        // todo
        const last = this.chapters[this.index].last();
        if (last === null){
            this.index--;
            const chap = this.chapters[this.index];
            if (chap){
                chap.final();
            }
        }
    }
    public hasLast():boolean{
        // 加载了第一章 且 已经是第一章第一页了
        if (this.index == 0 && this.chapters[this.index].isFirst() && this.isLoadFirst){
            return false;
        }
        return this.index >= 0;
    }
    public hasNext():boolean{
        return this.index !== this.chapters.length;
    }
}

