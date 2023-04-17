import {TurnPageNovel} from "/src/views/page/TurnPageNovel";

import {getData} from "/src/views/page/data";
const data = getData();
import {Config} from "/src/views/page/Config";

export class Main{
    // private canvas:HTMLCanvasElement;

    constructor(canvas:HTMLCanvasElement) {
        // this.canvas = canvas;
        // let w = canvas.offsetWidth;
        // let h = canvas.offsetHeight;
        // const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        // const conf = new Config(devicePixelRatio|2, w,h,ctx);
        // canvas.width = conf.pageWidth;
        // canvas.height = conf.pageHeight;
        // const novel = new TurnPageNovel(conf);
    }
}