import request from "./axios";
import { CommentsResponce ,CommentsRequest ,NewTypeCommentsRequest,NewTypeCommentsResponce } from "./types/comment";

// 分页获取专辑评论信息
// http://www.yili.fit:3000/comment/album?id=121012393&limit=20
type GetAlbumComment = (req: CommentsRequest) => Promise<CommentsResponce>

export const getAlbumComment: GetAlbumComment = async (req) => {
    const response = await request({
        url: '/comment/album',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    })

    return response
}

// 分页获取歌单评论信息
// http://www.yili.fit:3000/comment/songlist?id=121012393&limit=20
type GetSonglistComment = (req: CommentsRequest) => Promise<CommentsResponce>

export const getSonglistComment: GetSonglistComment = async (req) => {
    const response = await request({
        url: '/comment/songlist',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    })

    return response
}

// 分页获取歌单评论信息
// http://www.yili.fit:3000/comment/music?id=121012393&limit=20
type GetMusicComment = (req: CommentsRequest) => Promise<CommentsResponce>

export const getMusicComment: GetMusicComment = async (req) => {
    const response = await request({
        url: '/comment/music',
        params: {
            id: req.id,
            limit: req.limit,
            before: req.before,
            offset: req.offset,
        },
    })

    return response
}

// http://www.yili.fit:3000/comment/album?id=121012393&limit=20
type GetNewComment = (req: NewTypeCommentsRequest) => Promise<NewTypeCommentsResponce>

export const getNewComment: GetNewComment = async (req) => {
    const response = await request({
        url: '/comment/new',
        params: {
            type: req.type,
            sortTpe: req.sortType, // 排序方式, 1:按推荐排序, 2:按热度排序, 3:按时间排序
            cursor: req.cursor, // 当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
            pageNo: req.pageNo,  // 分页参数,第 N 页,默认为 1
            pageSize: req.pageSize, // 分页参数,每页多少条数据,默认 20
        },
    })

    return response
}