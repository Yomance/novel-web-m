import {PointContainer} from "/src/views/page/PointContainer";
import {Point} from "/src/views/page/Point";


export class Main{
    private pc: PointContainer;
    private ctx:CanvasRenderingContext2D;
    private ctx1:WebGL2RenderingContext;

    constructor(canvas:HTMLCanvasElement) {
        canvas.width = 375;
        canvas.height = 667;
        this.pc = new PointContainer(375, 667);
        let that = this;
        canvas.onclick = function (ev){
            that.pc.move(Point.of(ev.x, ev.y));
            that.draw();
        }
        setTimeout(()=>console.log(this.pc), 3000);

        this.ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        this.ctx1 = <WebGL2RenderingContext>canvas.getContext('webgl');
    }
    private draw(){
        this.ctx.save();
        this.ctx.clearRect(0,0, 375, 667);
        this.text('a', this.pc.a);
        this.text('b', this.pc.b);
        this.text('c', this.pc.c);
        this.text('d', this.pc.d);
        this.text('e', this.pc.e);
        this.text('f', this.pc.f);
        this.text('g', this.pc.g);
        this.text('h', this.pc.h);
        this.text('i', this.pc.i);
        this.text('j', this.pc.j);
        this.text('k', this.pc.k);
        let p = new Path2D();
        this.ctx.beginPath();
        p.moveTo(this.pc.c.x, this.pc.c.y);
        p.quadraticCurveTo(this.pc.e.x, this.pc.e.y,this.pc.b.x,this.pc.b.y);
        p.lineTo(this.pc.a.x,this.pc.a.y);
        p.lineTo(this.pc.k.x,this.pc.k.y);
        p.quadraticCurveTo(this.pc.h.x, this.pc.h.y,this.pc.j.x,this.pc.j.y);
        p.lineTo(this.pc.f.x,this.pc.f.y);
        p.closePath();
        let p1 = new Path2D();
        p1.moveTo(this.pc.a.x, this.pc.a.y);
        p1.lineTo(this.pc.d.x, this.pc.d.y);
        p1.lineTo(this.pc.i.x, this.pc.i.y);
        p1.closePath();

        this.ctx.stroke(p);

        this.ctx.save();
        this.ctx.strokeStyle = "#edd19c";
        this.ctx.clip(p)
        this.ctx.fill(p1);
        this.ctx.restore();

        this.ctx.shadowColor="rgba(0,0,0,0.75)";
        this.ctx.shadowOffsetX=-5;
        this.ctx.shadowOffsetY=-5;
        this.ctx.shadowBlur=10;
        this.ctx.fillStyle="#edd19c"
        this.ctx.fill();

        // this.ctx.fillRect(0,0, 375, 667);
        // this.ctx.fill(p, "nonzero")

        this.ctx.restore();
    }
    private text(s:string, p:Point){
        this.ctx.strokeText(s, p.x, p.y);
    }
}