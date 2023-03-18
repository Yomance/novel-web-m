type ID = string;
interface Comment{
    id:ID; // 评论id
    userId: ID; // 当前评论的用户id
    bookId: ID; // 书籍
    chapterId:ID; // 章节
    segmentId?: ID; // 段落
    replyId: ID; // 被回复的评论id 如果为null则标识为一级评论
    replyUserId?:ID; // 被回复的评论的用户Id, 二级评论有效
    likeNum: number; // 点赞数量
    childrenNum: number; // 子评论数量
    isLike: boolean; // 是否点赞
    content: string; // 评论内容
    createTime: string; // 创建时间
}



export const comment = (el:Comment)=>{

}
