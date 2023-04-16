import {TurnPage} from "/src/views/page/TurnPage";
import {CalcTextPage} from "/src/views/page/CalcText";
import {Config} from "/src/views/page/Config";

const PADDING_TB=30;


export class TurnPageNovel extends TurnPage{
    private readonly paddingLR: number;
    private readonly paddingTB: number;
    private readonly calcTextPage:CalcTextPage;

    constructor(ctx: CanvasRenderingContext2D, conf:Config) {
        super(ctx, conf);
        this.paddingLR = conf.padding;
        this.paddingTB = (PADDING_TB+this.paddingLR)*conf.devicePixelRatio;
        this.ctx.font=conf.font;
        this.calcTextPage = new CalcTextPage( ctx, this.W-this.paddingLR*2, this.H-this.paddingTB*2,conf.lineHeight);
    }

    public addChapter(data:any){
        this.calcTextPage.add(data);
        this.drawA(this.ctx);
    }

    protected drawA(ctx: CanvasRenderingContext2D) {
        this.extracted();
        this.calcTextPage.drawCurrent(this.paddingLR, this.paddingTB);
    }

    protected drawB(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle=this.conf.backgroundColor;
        ctx.fillRect(0,0,this.W, this.H)
    }

    protected drawC(ctx: CanvasRenderingContext2D) {
        this.extracted();
        this.calcTextPage.drawNext(this.paddingLR, this.paddingTB);
    }

    private extracted() {
        this.ctx.fillStyle = this.conf.backgroundColor;
        this.ctx.fillRect(0, 0, this.W, this.H)
        this.ctx.fillStyle = this.conf.color;
        this.ctx.textBaseline = "middle";
    }

    protected last(): void {
        this.calcTextPage.last();
    }

    protected next(): void {
        this.calcTextPage.next();
    }
}