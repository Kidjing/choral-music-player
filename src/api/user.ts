import request from './axios';
import { UserDetailResponce,UserPlaylist } from './types/user'

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

type GetUserSonglistByID = (uid: number) => Promise<UserPlaylist[]>
// 通过uid获取用户创建的歌单,需要添加一个时间戳来刷新后台缓存
// http://www.yili.fit:3000/user/playlist?uid=1880030641
export const getUserSonglistByID: GetUserSonglistByID = async (uid) => {
    const response = await request({
        url: '/user/playlist',
        params: {
            uid,
            timestamp: Date.now()
        },
    })
    // 直接返回歌单列表
    return response.playlist
}