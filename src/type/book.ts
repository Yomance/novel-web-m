import {Random} from "mockjs";


const categoryNames = ["都市", "玄幻", "历史", "军事", "科幻", "游戏", "仙侠", "悬疑"]
const tagNames = [
    "扮猪吃虎", "绝地求生", "技术流", "天才流", "直播文", "战神文",
    "保镖文", "奶爸文", "灵气复苏", "都市修仙", "废柴流", "强者归来",
    "升级流", "凡人流", "学院流", "开局流", "姐姐文", "兵王文",
    "武道流", "无限流", "现代修真", "氮金流", "王者荣耀", "无敌流",
    "洪荒流", "系统文", "赘婿文", "神医文", "鉴宝文", "种田文",
    "诸天流", "随身流", "争霸流", "召唤流", "Lol", "权谋文",
    "风水玄学", "巫师流", "重生文", "红包文", "异兽流", "现代诡秘",
    "硬科幻", "穿越文", "迪化流", "武魂流", "蒸汽朋克", "败家流",
    "机甲流"
]

export interface Tag {
    id: string,
    name: string,
    description: string
}

export interface Category {
    id: string,
    name: string,
    description: string
}

export interface WriteState {
    label: String,
    name: string,
    value: number,
}

export interface Chapter {
    id: string,
    name: string,
    nums: number,
    bookId: string,
    wordNum: number;
    free: boolean;
    createTime: string,
    // not in
    buy: boolean,
    content: string,
}

export interface Book {
    id: string,
    name: string,
    cover: string,
    author: string,
    authorId: string,
    description: string;
    readTo: string,
    writeState: WriteState,
    newChapter: Chapter;
    tags: Tag[],
    chapterCount: number;
    categoryId: string;
    category: Category,
    ////////////////////////////
    searchNum?: number;
    isSelect?: boolean;
}

export const randomTag = (): Tag => ({
    id: Random.id(),
    name: Random.ctitle(2, 5),
    description: Random.cparagraph(1, 3)
})
export const randomCategory = (id?: string): Category => ({
    id: id ? id : Random.id(),
    name: Random.ctitle(4),
    description: Random.cparagraph(1, 3)
})
export const randomWriteState = (): WriteState => {
    const number = Random.integer(0, 2);
    switch (number) {
        case 0:
            return {
                label: "连载",
                name: "",
                value: 0,
            }
        case 1:
            return {
                label: "完结",
                name: "",
                value: 0,
            }
        default:
            return {
                label: "停更",
                name: "",
                value: 0,
            }
    }
}
export const randomChapter = (id: string, nums: number): Chapter => {
    let content = ``;
    let size = 0;
    const count = Random.integer(2900, 3200);
    while (size < count) {
        let s = Random.cparagraph(1, 5);
        size += s.length;
        content += `<p id="${Random.guid().split('-')[0]}">${s}</p>`
    }
    return {
        id: Random.id(),
        name: Random.ctitle(2, 8),
        nums: nums,
        bookId: id,
        wordNum: count,
        free: nums > 100,
        createTime: Random.datetime(),
        // not in
        buy: Random.boolean(),
        content,
    }
}
export const randomBook = (id?:string): Book => {
    id = id ? id: Random.id();
    const chapterCount = Random.integer(100, 1000);
    const categoryId = Random.id();
    return ({
        id,
        name: Random.ctitle(2, 10),
        authorId: Random.id(),
        author: Random.ctitle(3, 10),
        description: Random.cparagraph(1, 5),
        cover: `/src/assets/image/cover/cover${Random.integer(0, 19)}.jpg`,
        readTo: "1",
        writeState: randomWriteState(),
        newChapter: randomChapter(id, chapterCount),
        tags: [
            randomTag(),
            randomTag(),
            randomTag()
        ],
        chapterCount,
        categoryId,
        category: randomCategory(categoryId)
    })
}
