
export default {
    devicePixelRatio: 2, // 像素比
    pageWidth: 10, // 页面宽度
    pageHeight: 10, // 页面高度
    lineHeight: 26, // 行高
    fontSize: 16, // 字号
    fontFamily: '', // 字体
    padding: 16, // 内边距
    backgroundColor: "#edd19c", // 背景颜色
    color: "#000", // 字体颜色
    turnPageStep: 16, // 翻页动画步长
    cancelTurnPageStep: 8, // 取消翻页动画步长
    shadowStart: 'rgba(0,0,0,0.5)', // 阴影开始颜色
    shadowEnd: 'rgba(0,0,0,0)', // 阴影结束颜色
    get font() {
        return this.fontSize + 'px ' + this.fontFamily;
    }
}

interface ConfParam {
    pageWidth?: number; // 页面宽度
    pageHeight?: number; // 页面高度
    lineHeight?: number; // 行高
    fontSize?: number; // 字号
    fontFamily?: string; // 字体
    padding?: number; // 内边距
    backgroundColor?: string; // 背景颜色
    color?: string; // 字体颜色
    turnPageStep?: number; // 翻页动画步长
    cancelTurnPageStep?: number; // 取消翻页动画步长
    shadowStart?: string; // 阴影开始颜色
    shadowEnd?: string; // 阴影结束颜色
    cancelTurnPageFlag: number; // 取消翻页的大小 0-1
}

const CONF:ConfParam  = {
    lineHeight: 26,
    fontSize: 16,
    fontFamily: "sans-serif",
    padding: 16,
    backgroundColor: "#edd19c",
    color: "#000",
    turnPageStep: 16,
    cancelTurnPageStep: 8,
    shadowStart: "rgba(0,0,0,0.5)",
    shadowEnd: "rgba(0,0,0,0)",
    cancelTurnPageFlag: 0.33,
}

export class Config {
    public readonly devicePixelRatio: number; // 像素比
    public readonly pageWidth: number; // 页面宽度
    public readonly pageHeight: number; // 页面高度
    public readonly lineHeight: number; // 行高
    private readonly fontSize: number; // 字号
    private readonly fontFamily: string; // 字体
    public readonly padding: number; // 内边距
    public readonly backgroundColor: string; // 背景颜色
    public readonly color: string; // 字体颜色
    public readonly turnPageStep: number; // 翻页动画步长
    public readonly cancelTurnPageStep: number; // 取消翻页动画步长
    public readonly shadowStart: string; // 阴影开始颜色
    public readonly shadowEnd: string; // 阴影结束颜色
    public readonly font: string; //
    public readonly cancelTurnPageSize:number; // 取消翻页的大小

    // @ts-ignore
    constructor(devicePixelRatio: number, width:number, height: number, conf:ConfParam=CONF) {
        this.devicePixelRatio = devicePixelRatio;
        this.pageWidth = width * devicePixelRatio;
        this.pageHeight = height * devicePixelRatio;
        // @ts-ignore
        this.lineHeight = conf.lineHeight * devicePixelRatio;
        // @ts-ignore
        this.fontSize = conf.fontSize * devicePixelRatio;
        // @ts-ignore
        this.fontFamily = conf.fontFamily;
        // @ts-ignore
        this.padding = conf.padding * devicePixelRatio;
        // @ts-ignore
        this.backgroundColor = conf.backgroundColor;
        // @ts-ignore
        this.color = conf.color;
        // @ts-ignore
        this.turnPageStep = conf.turnPageStep * devicePixelRatio;
        // @ts-ignore
        this.cancelTurnPageStep = conf.cancelTurnPageStep * devicePixelRatio;
        // @ts-ignore
        this.shadowStart = conf.shadowStart;
        // @ts-ignore
        this.shadowEnd = conf.shadowEnd;
        this.font = this.fontSize + 'px ' + this.fontFamily;

        this.cancelTurnPageSize = this.pageWidth*conf.cancelTurnPageFlag;
    }
}
