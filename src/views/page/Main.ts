import {PointContainer} from "/src/views/page/PointContainer";
import {Point} from "/src/views/page/Point";
import {bz2, Path} from "/src/views/page/Path";


export class Main{
    private pc: PointContainer;
    private ctx:CanvasRenderingContext2D;
    private canvas:HTMLCanvasElement;

    constructor(canvas:HTMLCanvasElement, w:number, h:number) {
        this.canvas = canvas;
        this.pc = new PointContainer(w, h);
        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        canvas.width = w;
        canvas.height = h;
        this.init();
    }
    private init(){
        let that = this;
        this.canvas.ontouchstart = function (ev){
            const touch = ev.changedTouches[0];
            if (touch.clientY < that.pc.f.y*2/3){
                that.isSlideSideways = true;
            }
        }
        function moveByBottom(ev: TouchEvent){
            const touch = ev.changedTouches[0];
            if (that.isSlideSideways){
                that.pc.move(Point.of(touch.clientX, that.pc.f.y-0.01));
            }else {
                that.pc.move(Point.of(touch.clientX, touch.clientY));
            }
            that.draw();
        }
        this.canvas.ontouchmove = moveByBottom;
        this.canvas.ontouchend = function (ev){
            const touch = ev.changedTouches[0];
            that.isSlideSideways = false;
            if (touch.clientX >= that.pc.f.x - 100) {
                that.cancelTurnPageNext();
            }else {
                that.turnPageNext();
            }
        }
    }

    /**
     * 是否横向滑动
     * @private
     */
    private isSlideSideways:boolean=false;

    /**
     * 是否在执行动画
     * @private
     */
    private isAnimation:boolean = false;

    /**
     * 取消向后翻页
     * @private
     */
    private cancelTurnPageNext(){
        this.isAnimation = true;
        let w = this.pc.f.x;
        let h = this.pc.f.y;
        let bx = 8; // 每次动画x轴的步长
        const x1 = w-this.pc.a.x;
        const y1 = (h-this.pc.a.y);
        let by = (y1/(x1/bx)); // 每次动画y轴的步长
        const p = Point.of(this.pc.a.x, this.pc.a.y);
        const am = ()=>{
            p.x+=bx;
            p.y+=by;
            this.pc.move(p);
            this.draw();
            if (p.x > w || p.y>h){
                this.isAnimation = false;
                return;
            }
            requestAnimationFrame(am);
        };
        requestAnimationFrame(am);
    }
    private turnPageNext(){
        this.isAnimation = true;
        let w = this.pc.f.x;
        let h = this.pc.f.y;
        let bx = 10; // 每次动画x轴的步长
        const x1 = w+this.pc.a.x;
        const y1 = (h-this.pc.a.y);
        let by = (y1/(x1/bx)); // 每次动画y轴的步长
        const p = Point.of(this.pc.a.x, this.pc.a.y);
        const am = ()=>{
            p.x-=bx;
            p.y+=by;
            this.pc.move(p);
            this.draw();
            if (p.x > w || p.y>h){
                this.isAnimation = false;
                this.drawC();
                return;
            }
            requestAnimationFrame(am);
        };
        requestAnimationFrame(am);
    }

    private regionBInnerShadow(){
        const res = new Path2D();
        res.moveTo(this.pc.d.x, this.pc.d.y);
        res.lineTo(this.pc.e.x, this.pc.e.y);
        res.lineTo(this.pc.h.x, this.pc.h.y);
        res.lineTo(this.pc.i.x, this.pc.i.y);
        res.closePath();
        return res;
    }

    // c d b a k i j
    /**
     * 计算各个区域路径
     * @private
     * @return
     */
    private calcPath(){
        const qa = new Path2D();
        qa.moveTo(0,0);
        qa.lineTo(0,this.pc.f.y);
        const qb = new Path2D();
        qb.moveTo(this.pc.d.x, this.pc.d.y);
        const qc = new Path2D();
        qc.moveTo(this.pc.f.x, this.pc.f.y);
        const qab = new Path2D();
        qab.moveTo(0,0);
        qab.lineTo(0,this.pc.f.y);
        const qbc = new Path2D();
        qbc.moveTo(this.pc.f.x, this.pc.f.y);
        // const line = new Path2D();
        // line.moveTo(this.pc.c.x, this.pc.c.y);

        bz2(this.pc.c, this.pc.e, this.pc.b, (x,y)=>{
            qa.lineTo(x,y);
            qc.lineTo(x,y);
            qab.lineTo(x,y);
            qbc.lineTo(x,y);
            // line.lineTo(x,y)

        }, (x,y)=>{
            qa.lineTo(x,y);
            qb.lineTo(x,y);
            qbc.lineTo(x,y);
            // line.lineTo(x,y)
        });
        qa.lineTo(this.pc.a.x, this.pc.a.y);
        qa.lineTo(this.pc.k.x,this.pc.k.y);
        qb.lineTo(this.pc.a.x, this.pc.a.y);
        qb.lineTo(this.pc.k.x,this.pc.k.y);
        qc.lineTo(this.pc.i.x, this.pc.i.y);
        qab.lineTo(this.pc.i.x, this.pc.i.y);
        qbc.lineTo(this.pc.a.x, this.pc.a.y);
        qbc.lineTo(this.pc.k.x,this.pc.k.y);
        // line.lineTo(this.pc.a.x, this.pc.a.y);
        // line.lineTo(this.pc.k.x,this.pc.k.y);
        bz2(this.pc.k, this.pc.h, this.pc.j, (x,y)=>{
            qa.lineTo(x,y);
            qb.lineTo(x,y);
            qbc.lineTo(x,y);
            // line.lineTo(x,y)
        }, (x,y)=>{
            qa.lineTo(x,y);
            qc.lineTo(x,y);
            qab.lineTo(x,y);
            qbc.lineTo(x,y);
            // line.lineTo(x,y)
        });
        qa.lineTo(this.pc.f.x, 0)
        qa.closePath();
        qb.closePath();
        qc.closePath();
        qab.lineTo(this.pc.f.x, 0)
        qab.closePath();
        return {
            qa,qb,qc, qab, qbc, //line
        }
    }

    private i = 0;
    private draw(){
    this.ctx.save();
        this.ctx.clearRect(0,0, this.pc.f.x, this.pc.f.y);
        this.ctx.strokeStyle = "#93743a";
        this.ctx.fillStyle="#edd19c"
        this.ctx.shadowBlur=30;
        this.ctx.shadowOffsetX=-10;
        this.ctx.shadowOffsetY=-10;
        this.ctx.shadowColor="rgba(0,0,0,0.9)";
        let {qa, qb, qab, qc, qbc} = this.calcPath();


        // this.ctx.globalCompositeOperation=m;
        // 绘制b
        this.ctx.save();
            this.ctx.clip(qb)
            this.ctx.fill(qb);
            // 绘制阴影
            this.ctx.fill(this.regionBInnerShadow());
        this.ctx.restore();
        // 绘制页面边缘的线条
        this.ctx.stroke(qbc);

        // 绘制a
        this.ctx.save();
        this.ctx.clip(qa);
            this.drawA();
            // 绘制阴影
            this.ctx.shadowBlur=20;
            this.ctx.shadowOffsetX=-5;
            this.ctx.shadowOffsetY=-5;
            this.ctx.shadowColor="rgba(0,0,0,0.5)";
            this.ctx.fill(qbc);
        this.ctx.restore();

        // 绘制c
        this.ctx.save();
            this.ctx.clip(qc);
            this.drawC();
            this.ctx.shadowBlur=20;
            this.ctx.shadowOffsetX=5;
            this.ctx.shadowOffsetY=5;
            this.ctx.shadowColor="rgba(0,0,0,0.5)";
            this.ctx.fill(qab);
        this.ctx.restore();
        this.ctx.restore();
    }
    private drawPoint(){
        this.ctx.strokeText('a', this.pc.a.x, this.pc.a.y);
        this.ctx.strokeText('b', this.pc.b.x, this.pc.b.y);
        this.ctx.strokeText('c', this.pc.c.x, this.pc.c.y);
        this.ctx.strokeText('d', this.pc.d.x, this.pc.d.y);
        this.ctx.strokeText('e', this.pc.e.x, this.pc.e.y);
        this.ctx.strokeText('f', this.pc.f.x, this.pc.f.y);
        this.ctx.strokeText('g', this.pc.g.x, this.pc.g.y);
        this.ctx.strokeText('h', this.pc.h.x, this.pc.h.y);
        this.ctx.strokeText('i', this.pc.i.x, this.pc.i.y);
        this.ctx.strokeText('j', this.pc.j.x, this.pc.j.y);
        this.ctx.strokeText('k', this.pc.k.x, this.pc.k.y);
    }

    private drawA(){
        this.ctx.fillStyle = "#b5cdff";
        this.ctx.fillRect(0,0,this.pc.f.x, this.pc.f.y)
    }
    private drawC(){
        this.ctx.fillStyle = "#d2ffe0";
        this.ctx.fillRect(0,0,this.pc.f.x, this.pc.f.y)
    }
}