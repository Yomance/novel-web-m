import {ChapterPage} from "/src/views/page/Page";

export type ContentModel = { id: string; val: string; }[];
export type CalcTool = { measureText(text: string): TextMetrics };


export const calcText = (ctx:CalcTool, content:ContentModel, lineWidth:number):string[]=>{
    // 一个字符的宽度
    const {width} = ctx.measureText("一");
    // 一行大概的字符数量
    const size: number = Math.floor(lineWidth / width);
    const res: string[] = [];
    content.forEach(({val}) => {
        val = "　　" + val;
        let last = 0;
        while (true) {
            let end = last + size;
            while (true) {
                let line = val.substring(last, end);
                let ww = ctx.measureText(line).width;
                // 长度正好
                if (Math.abs(ww - lineWidth) <= width) {
                    last = end;
                    if (line) res.push(line);
                    break;
                }
                if (ww < lineWidth) {
                    if (++end > val.length) {
                        if (line) res.push(line);
                        break;
                    }
                }
            }
            if (end >= val.length) {
                break;
            }
        }
    });
    return res;
}




export class CalcTextPage {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly W: number;
    private readonly H: number;
    private readonly lineHeight: number = 16;
    private lines = 0;

    private pages: Page[] = [];

    public currentPage = 0;
    // private chapters:ChapterPage[]=[];
    // private currentChapter = 0;

    constructor(ctx: CanvasRenderingContext2D, W: number, H: number, lineHeight: number) {
        this.ctx = ctx;
        this.W = W;
        this.H = H;
        this.lines = Math.floor(this.H / lineHeight);
        this.lineHeight = this.H / this.lines;
    }

    public add(cm: ContentModel) {
        // let pps = [];
        const strings = this.calcText(this.ctx, cm);
        let arr: string[] = [];
        let j = 0;
        for (let i = 0; i < strings.length; i++, j++) {
            if (j >= this.lines) {
                this.pages.push(new Page(arr));
                // pps.push(arr);
                arr = [];
                j = 0;
            }
            arr.push(strings[i]);
        }
        // pps.push(arr);
        this.pages.push(new Page(arr));
        // this.chapters.push(new ChapterPage(pps, "1", "第三章111"));
    }

    private calcText(ctx: CalcTool, cm: ContentModel) {
        return calcText(ctx, cm, this.W);
    }

    public drawLast(left: number, top: number) {
        if (this.currentPage === 0) {
            // todo
            return;
        }
        this.pages[this.currentPage - 1].draw(left, top, this.lineHeight, this.ctx)
    }

    public drawCurrent(left: number, top: number) {
        this.pages[this.currentPage].draw(left, top, this.lineHeight, this.ctx)
        // const chapter = this.chapters[this.currentChapter];
        // top += this.lineHeight / 2;
        // const now = chapter.now();
        // if (now){
        //     now.forEach(s=>{
        //         this.ctx.fillText(s, left, top);
        //         top += this.lineHeight;
        //     })
        // }else {
        //     // todo
        // }
    }

    public drawNext(left: number, top: number) {
        if (this.currentPage === this.pages.length-1) {
            // todo
            return;
        }
        this.pages[this.currentPage + 1].draw(left, top, this.lineHeight, this.ctx)
    }

    public next() {
        if (++this.currentPage >= this.pages.length) {
            this.currentPage = this.pages.length - 1;
        }
    }

    public last() {
        if (--this.currentPage < 0) {
            this.currentPage = 0;
        }
    }
}


class Page {
    private readonly data: string[];

    constructor(data: string[]) {
        this.data = data;
    }

    public draw(left: number, top: number, lineHeight: number, ctx: CanvasRenderingContext2D) {
        top += lineHeight / 2;
        for (let v of this.data) {
            ctx.fillText(v, left, top);
            top += lineHeight;
        }
    }
}