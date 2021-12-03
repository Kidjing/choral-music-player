import request from "./axios";
import { ILyric } from "./types/lyric";
import { IMusic } from "./types/song";

type GetSongDetail = (ids: number[]) => Promise<{songs: IMusic[]}>
type GetLyricBySongID = (id: number) => Promise<ILyric>

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

export const getLyricBySongID: GetLyricBySongID = async (id) => {
    const response = await request({
        url: '/lyric',
        params: {
            id,
        },
    })
  
    return response
}
