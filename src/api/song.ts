import request from "./axios";
import { ILyric } from "./types/lyric";
import { IMusic,IUrlResponse } from "./types/song";

type GetSongDetail = (ids: number[]) => Promise<{songs: IMusic[]}>

// 通过ids数组获取歌曲详情信息
// http://www.yili.fit:3000/song/detail?ids=1379945341
export const getSongDetail: GetSongDetail = async (ids) => {
    const response = await request({
        url: '/song/detail',
        params: {
            ids: ids.join(','),
        },
    })
  
    return response
}

// 根据ID来获取歌词
// http://www.yili.fit:3000/lyric?id=1815389717
type GetLyricBySongID = (id: number) => Promise<ILyric>

export const getLyricBySongID: GetLyricBySongID = async (id) => {
    const response = await request({
        url: '/lyric',
        params: {
            id,
        },
    })
  
    return response
}


// 获取歌曲的URL
// http://www.yili.fit:3000/song/url?id=33894312
type GetMusicUrl = (id: number) => Promise<IUrlResponse[]>

export const getMusicUrl: GetMusicUrl = async (id) => {
    const response = await request({
        url: '/song/url',
        params: {
            id,
        },
    })
  
    return response.data
}

type CheckMusicPlay = (id: number) => Promise<{success: boolean,message: string}>

export const checkMusicPlay: CheckMusicPlay = async (id) => {
    const response = await request({
        url: '/check/music',
        params: {
            id,
        },
    })
  
    return response
}