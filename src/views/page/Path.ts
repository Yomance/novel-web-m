import {Point} from "/src/views/page/Point";

export class Path{
    private x:number[] = [];
    private y:number[] = [];

    public append(x:number, y:number):Path{
        this.x.push(x);
        this.y.push(y);
        return this;
    }

    public forEach(fun:(x:number, y:number)=>boolean|void):Path{
        for (let i = 0; i < this.x.length; i++) {
            if (fun(this.x[i], this.y[i]) === false){
                return this;
            }
        }
        return this;
    }

    public reset():Path{
        this.x = [];
        this.y = [];
        return this;
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

