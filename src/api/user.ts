import request from './axios';
import { IAlbum } from './types/album';
import { IArtist } from './types/artist';
import { UserDetailResponce, UserPlaylist } from './types/user'

type GetUserDetailByID = (uid: number) => Promise<UserDetailResponce>

// 通过uid获取用户详细信息,需要添加一个时间戳来刷新后台缓存
// http://www.yili.fit:3000/user/account?uid=1880030641
export const getUserDetailByID: GetUserDetailByID = async (uid) => {
    const response = await request({
        url: '/user/account',
        params: {
            uid,
            timestamp: Date.now()
        },
    })

    return response
}

type GetUserSonglistByID = (uid: number,limit: number, offset: number) => Promise<UserPlaylist[]>
// 通过uid获取用户创建的歌单,需要添加一个时间戳来刷新后台缓存
// 同时获取用户收藏的歌单（获取的是两种歌单）,可以使用分页进行查询
// http://www.yili.fit:3000/user/playlist?uid=1880030641
export const getUserSonglistByID: GetUserSonglistByID = async (uid,limit,offset) => {
    const response = await request({
        url: '/user/playlist',
        params: {
            uid,
            limit,
            offset,
            timestamp: Date.now()
        },
    })
    // 直接返回歌单列表
    return response.playlist;
}

type GetUserArtistlist = () => Promise<IArtist[]>
// 获取用户收藏的艺人
// http://www.yili.fit:3000/artist/sublist
export const getUserArtistlist: GetUserArtistlist = async () => {
    const response = await request({
        url: '/artist/sublist',
        params: {
            timestamp: Date.now()
        },
    })
    // 直接返回歌单列表
    return response.data;
}


type GetUserAlbumlist = (limit: number, offset: number) => Promise<IAlbum[]>
// 获取用户收藏的专辑
// http://www.yili.fit:3000/album/sublist
export const getUserAlbumlist: GetUserAlbumlist = async (limit,offset) => {
    const response = await request({
        url: '/album/sublist',
        params: {
            limit,
            offset,
            timestamp: Date.now()
        },
    })
    // 直接返回歌单列表
    return response.data;
}

type GetUserLikelistByID = (uid: number) => Promise<number[]>
// 获取用户喜欢的歌曲（得到的是一个id数组）
// http://www.yili.fit:3000/album/sublist
export const getUserLikelistByID: GetUserLikelistByID = async (uid) => {
    const response = await request({
        url: '/likelist',
        params: {
            uid,
            timestamp: Date.now()
        },
    })
    // 直接返回歌单列表
    return response.ids.reverse();
}