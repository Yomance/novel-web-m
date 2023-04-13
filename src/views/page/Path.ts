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