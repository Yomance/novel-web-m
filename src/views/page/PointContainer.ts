import {Point} from "/src/views/page/Point";


export class PointContainer {
    public readonly a: Point;
    public readonly b: Point = Point.of(0, 0);
    public readonly c: Point = Point.of(0, 0);
    public readonly d: Point = Point.of(0, 0);
    public readonly e: Point = Point.of(0, 0);
    public readonly f: Point;
    public readonly g: Point = Point.of(0, 0);
    public readonly h: Point = Point.of(0, 0);
    public readonly i: Point = Point.of(0, 0);
    public readonly j: Point = Point.of(0, 0);
    public readonly k: Point = Point.of(0, 0);
    private fun: (pc: PointContainer) => void = (fun) => {
    };

    constructor(x: number, y: number) {
        this.f = Point.of(x, y);
        this.a = Point.of(x, y);
    }

    public move(p: Point, setC:boolean=true) {
        this.a.copyOf(p);
        this.calc();
        if (setC){
            if (this.calcPointCX() < 0){
                this.calcPointAByTouchPoint();
                this.calc();
            }
        }
    }


    private calc() {
        this.g.x = (this.a.x + this.f.x) / 2;
        this.g.y = (this.a.y + this.f.y) / 2;

        this.e.x = this.g.x - (this.f.y - this.g.y) * (this.f.y - this.g.y) / (this.f.x - this.g.x);
        this.e.y = this.f.y;

        this.h.x = this.f.x;
        this.h.y = this.g.y - (this.f.x - this.g.x) * (this.f.x - this.g.x) / (this.f.y - this.g.y);

        this.c.x = this.e.x - (this.f.x - this.e.x) / 2;
        this.c.y = this.f.y;

        this.j.x = this.f.x;
        this.j.y = this.h.y - (this.f.y - this.h.y) / 2;

        this.b.copyOf(getIntersectionPoint(this.a, this.e, this.c, this.j));
        this.k.copyOf(getIntersectionPoint(this.a, this.h, this.c, this.j));

        this.d.x = (this.c.x + 2 * this.e.x + this.b.x) / 4;
        this.d.y = (2 * this.e.y + this.c.y + this.b.y) / 4;

        this.i.x = (this.j.x + 2 * this.h.x + this.k.x) / 4;
        this.i.y = (2 * this.h.y + this.j.y + this.k.y) / 4;
    }


    /**
     * 如果c点x坐标小于0,根据触摸点重新测量a点坐标
     */
    private calcPointAByTouchPoint() {
        let w = this.f.x;
        let w0 = w - this.c.x;
        let w1 = Math.abs(this.f.x - this.a.x);
        let w2 = w * w1 / w0;
        this.a.x = Math.abs(this.f.x - w2);
        let h1 = Math.abs(this.f.y - this.a.y);
        let h2 = w2 * h1 / w1;
        this.a.y = Math.abs(this.f.y - h2);
    }

    /**
     * 计算C点的X值
     * @private
     * @return val
     */
    private calcPointCX() {
        let a = Point.copyOf(this.a);
        let f = Point.copyOf(this.f);
        let g = Point.of(0, 0);
        let e = Point.of(0, 0);
        g.x = (a.x + f.x) / 2;
        g.y = (a.y + f.y) / 2;
        e.x = g.x - (f.y - g.y) * (f.y - g.y) / (f.x - g.x);
        e.y = f.y;
        return e.x - (f.x - e.x) / 2;
    }
}


/**
 * 计算两线段相交点坐标
 * @param p1
 * @param p2
 * @param p3
 * @param p4
 * @return 返回该点
 */
function getIntersectionPoint(
    p1: Point,
    p2: Point,
    p3: Point,
    p4: Point
) {
    let x1 = p1.x,
        y1 = p1.y,
        x2 = p2.x,
        y2 = p2.y,
        x3 = p3.x,
        y3 = p3.y,
        x4 = p4.x,
        y4 = p4.y;
    let x = ((x1 - x2) * (x3 * y4 - x4 * y3) - (x3 - x4) * (x1 * y2 - x2 * y1))
        / ((x3 - x4) * (y1 - y2) - (x1 - x2) * (y3 - y4));
    let y = ((y1 - y2) * (x3 * y4 - x4 * y3) - (x1 * y2 - x2 * y1) * (y3 - y4))
        / ((y1 - y2) * (x3 - x4) - (x1 - x2) * (y3 - y4));
    return Point.of(x, y);
}