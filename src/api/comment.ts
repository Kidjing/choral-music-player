import request from './axios';
import {
    CommentsResponce,
    CommentsRequest,
    IComment,
    NewTypeCommentsRequest,
    NewTypeCommentsResponce,
    CommentInfo,
    OperateCommentResponse,
} from './types/comment';

// 分页获取专辑评论信息
// http://www.yili.fit:3000/comment/album?id=121012393&limit=20
type GetAlbumComment = (req: CommentsRequest) => Promise<CommentsResponce>;

export const getAlbumComment: GetAlbumComment = async (req) => {
    const response = await request({
        url: '/comment/album',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    });

    return response;
};

// 分页获取歌单评论信息
// http://www.yili.fit:3000/comment/songlist?id=121012393&limit=20
type GetSonglistComment = (req: CommentsRequest) => Promise<CommentsResponce>;

export const getSonglistComment: GetSonglistComment = async (req) => {
    const response = await request({
        url: '/comment/songlist',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    });

    return response;
};

// 分页获取歌曲评论信息
// http://www.yili.fit:3000/comment/music?id=121012393&limit=20
type GetMusicComment = (req: CommentsRequest) => Promise<CommentsResponce>;

export const getMusicComment: GetMusicComment = async (req) => {
    const response = await request({
        url: '/comment/music',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    });

    return response;
};

// 另一种形式获取歌曲评论的方式
// http://www.yili.fit:3000/comment/album?id=121012393&limit=20
type GetNewComment = (req: NewTypeCommentsRequest) => Promise<NewTypeCommentsResponce>;

export const getNewComment: GetNewComment = async (req) => {
    const response = await request({
        url: '/comment/new',
        params: {
            type: req.type,
            sortTpe: req.sortType, // 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
            cursor: req.cursor, // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
            pageNo: req.pageNo, // 分页参数,第 N 页,默认为 1
            pageSize: req.pageSize, // 分页参数,每页多少条数据,默认 20
        },
    });

    return response;
};

// 分页获取歌曲评论信息
// http://www.yili.fit:3000/comment/music?id=121012393&limit=20
type GetHotComment = (req: CommentsRequest) => Promise<IComment[]>;

export const getHotComment: GetHotComment = async (req) => {
    const response = await request({
        url: '/comment/hot',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
            type: req.type,
        },
    });

    return response.hotComments;
};

// 发送、删除评论
type OperateComment = (req: CommentInfo) => Promise<OperateCommentResponse>;

export const operateComment: OperateComment = async (req) => {
    const response = await request({
        url: '/comment',
        params: {
            t: req.t,
            type: req.type,
            id: req.id,
            content: req.content,
            commentId: req.commentId,
        },
    });
    return response;
};

// 评论点赞
type LikeComment = (req: CommentInfo) => Promise<OperateCommentResponse>;

export const likeComment: LikeComment = async (req) => {
    const response = await request({
        url: '/comment/like',
        params: {
            t: req.t,
            type: req.type,
            id: req.id,
            cid: req.cid,
        },
    });
    return response;
};