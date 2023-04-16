import {TurnPageNovel} from "/src/views/page/TurnPageNovel";

import {getData} from "/src/views/page/data";
const data = getData();
import {Config} from "/src/views/page/Config";

export class Main{
    private canvas:HTMLCanvasElement;

    constructor(canvas:HTMLCanvasElement) {
        this.canvas = canvas;
        let w = canvas.offsetWidth;
        let h = canvas.offsetHeight;
        const conf = new Config(2, w,h);
        canvas.width = conf.pageWidth;
        canvas.height = conf.pageHeight;
        const ctx = <CanvasRenderingContext2D>canvas.getContext('2d');
        const novel = new TurnPageNovel(ctx, conf);
        novel.addChapter(data);
        novel.addChapter(data);
    }
}