export interface Chapter {
    id: string,
    name: string,
    // 序号
    nums: number;
    bookId: string;
    // 评论数量
    commentNum: number;
    createTime: string;
    free: boolean;
    // 阅读数量
    readNum: number;
    openTime: string;
    // 字数
    wordNum: number;
    // 是否购买
    buy?: boolean,
}
