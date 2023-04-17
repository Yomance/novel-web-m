



type Page = string[];
export class ChapterPage{
    public pages: Page[] = [];
    public readonly id:string;
    public readonly name: string;
    private index = 0;
    constructor(pages: Page[], id: string, name: string) {
        this.pages = pages;
        this.id = id;
        this.name = name;
    }
    public set(i:1|-1|0){
        if (i === 0){
            this.index = 0;
        }
        if (i === 1 && this.index < this.pages.length-1){
            this.index++;
        }
        if (i === -1 && this.index > 0){
            this.index--;
        }
    }
    public last():Page|null{
        if (this.index == 0) return null;
        return this.pages[this.index-1];
    }
    public now():Page|null{
        return this.pages[this.index];
    }
    public next():Page|null{
        if (this.index == this.pages.length-1) return null;
        return this.pages[this.index+1];
    }
}