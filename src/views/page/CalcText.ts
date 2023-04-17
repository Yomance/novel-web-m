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