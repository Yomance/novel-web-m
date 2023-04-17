
export class Point{
    public static of(x:number, y:number):Point{
        return new Point(x,y);
    }
    public static copyOf(p:Point){
        return this.of(p.x, p.y);
    }
    public y: number;
    public x: number;
    constructor(x:number, y:number) {
        this.x = x;
        this.y = y;
    }
    public copyOf(p:Point){
        this.x = p.x;
        this.y = p.y;
    }
}
// B(t)=(1-t)^P0 + 2t(1-t)P1 + t^P2，t∈[0,1]
export const bz2 = (a:Point, b:Point, c:Point, sta:(x:number, y:number)=>void, end:(x:number, y:number)=>void):void=>{
    for (let t = 0; t < 0.5; t+=0.01) {
        let t22 = t*t;
        let t2 = 2*t;
        let q = 1+t22-t2;
        let w = t2-2*t22;
        let x = q*a.x + w*b.x + t22*c.x;
        let y = q*a.y + w*b.y + t22*c.y;
        sta(x,y);
    }
    for (let t = 0.5; t <= 1; t+=0.01) {
        let t22 = t*t;
        let t2 = 2*t;
        let q = 1+t22-t2;
        let w = t2-2*t22;
        let x = q*a.x + w*b.x + t22*c.x;
        let y = q*a.y + w*b.y + t22*c.y;
        end(x,y);
    }
}

