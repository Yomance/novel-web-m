
export class Point{
    public static of(x:number, y:number):Point{
        return new Point(x,y);
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
// B(t) = (1-t)2P0 + 2t(1-t)P1+t2P2， t∈[0,1]

export const bz2 = ()=>{

}


