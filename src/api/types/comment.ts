export interface IComment {
    user: IUser;  // 评论的用户
    beReplied: IBeReplied[]; // 这个表示他评论的内容
    status: number;   // 是否存在
    commentId: number;  // 评论的id
    content: string; // 评论的内容
    time: number;  // 发布时间，单位ms
    timeStr: string;  // 发布时间，"2020-12-31"
    needDisplayTime: boolean;  // 是否需要展示时间
    likedCount: number;  // 被点赞的人数
    commentLocationType: number;
    parentCommentId: number;  // 最高层级评论的id
    liked: boolean;  // 是否对这条评论点赞了
}
// 评论中的用户展示
interface IUser {
    anonym: number;
    userId: number;  // 用户id
    userType: number;  // 用户类型
    followed: boolean;  // 是否关注这个用户
    mutual: boolean;  // 是否相互关注
    nickname: string;  // 用户名
    avatarUrl: string;  // 用户头像地址
}

interface IBeReplied {
    user: IUser;  // 回复的用户
    beRepliedCommentId: number;  // 被评论的id
    content: string | null;  // 被评论的类型
}

// --------------------------------响应相关参数---------------------------------- //

export interface CommentsRequest {
    id: number;
    limit?: number;
    offset?: number;
    before?: number;
    type?:number;
}


export interface CommentsResponce {
    hotComments: IComment[]; // 热评歌曲
    code: number;
    comments: IComment[]; // 所查找的评论类型
    total: number;  // 总共的评论数目，如果大于5000最好显示5000，之后就需要使用before来进行查询了
    more: boolean;  // 是否还有更多的歌曲
    moreHot: boolean // 是否还有更多的热门歌曲
}

export interface HotCommentsResponce {
    hotComments: IComment[]; // 热评歌曲
    code: number;
    total: number;  // 总共的评论数目，如果大于5000最好显示5000，之后就需要使用before来进行查询了
    hasMore: boolean // 是否还有更多的热门歌曲
}

// type
// 0: 歌曲
// 1: mv
// 2: 歌单
// 3: 专辑
// 4: 电台
// 5: 视频
// 6: 动态
export interface NewTypeCommentsRequest {
    type: number;
    sortType: number; // 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
    cursor?: number; // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
    pageNo?: number;  // 分页参数,第 N 页,默认为 1
    pageSize?: number; // 分页参数,每页多少条数据,默认 20
}


export interface NewTypeCommentsResponce {
    comments: IComment[]; // 热评歌曲
    totalCount: number;  // 总共的评论数目，如果大于5000最好显示5000，之后就需要使用before来进行查询了
    hasMore: boolean // 是否还有更多的热门歌曲
    cursor: string // 时间戳
    sortType: number // 排序类型
}