import {TurnPage} from "./TurnPage";
import {Config} from "./Config";
import {Chapter, DataContainer} from "./DataContainer";


export class TurnPageNovel extends TurnPage{
    private readonly paddingLR: number;
    private dc:DataContainer;

    constructor(conf:Config, data: any, next:()=>Promise<Chapter>, last:()=>Promise<Chapter>) {
        super(conf);
        this.paddingLR = conf.padding;
        this.ctx.font=conf.font;
        this.dc = new DataContainer(data, next, last, conf, this.flush.bind(this));
        this.drawA();
    }

    protected drawA() {
        this.extracted();
        const current =this.turnType === "next"? this.dc.getCurrent(): this.dc.getLast();
        if (typeof current === 'string'){
            if (current === "loading"){
                this.drawLoading()
            }else {
                this.drawFinish();
            }
        }else {
            this.drawTitle(current.name);
            this.drawPage(current.list);
        }
    }

    protected drawTitle(title:string){
        this.ctx.fillText(title, this.conf.padding, this.conf.padding+this.conf.headerHeight/2);
    }
    protected drawB() {
        this.ctx.fillStyle=this.conf.backgroundColor;
        this.ctx.fillRect(0,0,this.W, this.H)
    }

    protected drawC() {
        this.extracted();
        const current =this.turnType === "next"? this.dc.getNext(): this.dc.getCurrent();
        if (typeof current === 'string'){
            if (current === "loading"){
                this.drawLoading()
            }else {
                this.drawFinish();
            }
        }else {
            this.drawTitle(current.name);
            this.drawPage(current.list);
        }
    }

    private extracted() {
        this.ctx.fillStyle = this.conf.backgroundColor;
        this.ctx.fillRect(0, 0, this.W, this.H)
        this.ctx.fillStyle = this.conf.color;
        this.ctx.textBaseline = "middle";
    }

    protected last(): void {
        this.dc.last();
    }

    protected next(): void {
        this.dc.next();
    }
    protected hasLast(): boolean {
        return this.dc.hasLast();
    }
    protected hasNext(): boolean {
        return this.dc.hasNext();
    }

    private drawPage(lines: string[]){
        let left = this.conf.padding;
        let top = this.conf.padding+this.conf.headerHeight;
        top += this.conf.lineHeight / 2;
        for (let v of lines) {
            this.ctx.fillText(v, left, top);
            top += this.conf.lineHeight;
        }
    }
}