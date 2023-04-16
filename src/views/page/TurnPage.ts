import {PointContainer} from "/src/views/page/PointContainer";
import {Point} from "/src/views/page/Point";
import {bz2} from "/src/views/page/Path";
import {Config} from "/src/views/page/Config";


export abstract class TurnPage{
    protected conf: Config;
    private readonly pc: PointContainer;
    protected readonly ctx:CanvasRenderingContext2D;
    /**
     * 画布宽度
     * @private
     */
    protected readonly W:number;
    /**
     * 画布高度
     * @private
     */
    protected readonly H:number;

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

    protected constructor(ctx:CanvasRenderingContext2D, conf:Config) {
        this.ctx = ctx;
        this.conf = conf;
        this.W = conf.pageWidth;
        this.H = conf.pageHeight;
        this.pc = new PointContainer(this.W, this.H);
        ctx.canvas.ontouchend = this.touchEnd.bind(this);
        ctx.canvas.ontouchmove = this.touchMove.bind(this);
        ctx.canvas.ontouchstart = this.touchStart.bind(this);
    }

    /**
     * 获取事件中的点的坐标
     * @param ev
     * @private
     */
    private getEventPoint(ev:TouchEvent){
        let t = ev.changedTouches[0];
        return Point.of(t.clientX*this.conf.devicePixelRatio, t.clientY*this.conf.devicePixelRatio);
    }

    private touchStart(ev:TouchEvent){
        if (this.isAnimation) return;
        let {y} = this.getEventPoint(ev);
        if (y < this.H*0.66666){
            this.isSlideSideways = true;
        }
    }
    private touchMove(ev:TouchEvent){
        if (this.isAnimation) return;
        let {x,y} = this.getEventPoint(ev);
        if (this.isSlideSideways){
            this.pc.move(Point.of(x, this.H-0.0001));
        }else {
            this.pc.move(Point.of(x,y));
        }
        this.onDraw();
    }
    private touchEnd(ev:TouchEvent){
        if (this.isAnimation) return;
        let {x} = this.getEventPoint(ev);
        this.isSlideSideways = false;
        if (x >= this.W - this.conf.cancelTurnPageSize) {
            this.cancelTurnPageNext();
        }else {
            this.turnPageNext();
        }
    }

    /**
     * 取消向后翻页
     * @private
     */
    private cancelTurnPageNext(){
        this.isAnimation = true;
        let w = this.pc.f.x;
        let h = this.pc.f.y;
        let bx = this.conf.cancelTurnPageStep; // 每次动画x轴的步长
        const x1 = w-this.pc.a.x;
        const y1 = (h-this.pc.a.y);
        let by = (y1/(x1/bx)); // 每次动画y轴的步长
        const p = Point.of(this.pc.a.x, this.pc.a.y);
        const am = ()=>{
            p.x+=bx;
            p.y+=by;
            this.pc.move(p);
            this.onDraw();
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
        let bx = this.conf.turnPageStep; // 每次动画x轴的步长
        const x1 = w+this.pc.a.x;
        const y1 = (h-this.pc.a.y);
        let by = (y1/(x1/bx)); // 每次动画y轴的步长
        const p = Point.of(this.pc.a.x, this.pc.a.y);
        const am = ()=>{
            p.x-=bx;
            p.y+=by;
            this.pc.move(p, false);
            this.onDraw();
            if (p.x > w || p.y>h){
                this.drawC(this.ctx);
                this.next();
                this.isAnimation = false;
                return;
            }
            requestAnimationFrame(am);
        };
        requestAnimationFrame(am);
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

    private onDraw(){
        this.ctx.clearRect(0,0, this.pc.f.x, this.pc.f.y);
        this.ctx.save()
        this.draw()
        this.ctx.restore();
    }
    private draw(){
        let {qa, qb, qc, qbc} = this.calcPath();
        // 绘制a
        this.ctx.save();
        this.ctx.clip(qa);
        this.drawA(this.ctx);
        // 绘制阴影
        this.ctx.shadowBlur=20;
        this.ctx.shadowOffsetX=-5;
        this.ctx.shadowOffsetY=-5;
        this.ctx.shadowColor=this.conf.shadowStart;
        this.ctx.fill(qbc);
        this.ctx.restore();

        // 绘制b
        this.ctx.save();
        this.ctx.clip(qb)
        this.drawB(this.ctx);
        this.drawShadowB();
        this.ctx.restore();
        // 绘制页面边缘的线条

        // 绘制c
        this.ctx.save();
        this.ctx.clip(qc);
        this.drawC(this.ctx);
        this.drawShadowC();
        this.ctx.restore();
    }

    /**
     * 绘制区域b的阴影
     * @private
     */
    private drawShadowB(){
        this.drawShadowB_C(true);
    }

    /**
     * 绘制区域c的阴影
     * @private
     */
    private drawShadowC(){
        this.drawShadowB_C(false);
    }
    /**
     * 绘制区域A/B的阴影
     * @param isDrawB
     * @private
     */
    private drawShadowB_C(isDrawB:boolean){
        let w = (this.pc.f.x-this.pc.c.x)/4;
        let h = Math.hypot(this.pc.f.x,this.pc.f.y)+this.pc.f.y;
        // 旋转
        this.ctx.translate(this.pc.c.x,this.pc.c.y);
        const rotate = Math.atan2(this.pc.e.x- this.pc.f.x, this.pc.h.y - this.pc.f.y);
        this.ctx.rotate(rotate);
        // 创建渐变
        const gradient = this.ctx.createLinearGradient(-w,0,0,0);
        gradient.addColorStop(isDrawB ? 0: 1, this.conf.shadowStart)
        gradient.addColorStop(isDrawB ? 1: 0, this.conf.shadowEnd)
        // 填充渐变
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(-w,0,w, h);
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

    protected abstract drawA(ctx:CanvasRenderingContext2D):void;
    protected abstract drawB(ctx:CanvasRenderingContext2D):void;
    protected abstract drawC(ctx:CanvasRenderingContext2D):void;
    protected abstract next():void;
    protected abstract last():void;
}