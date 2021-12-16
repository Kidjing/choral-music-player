import request from "./axios";
import { IGetAlbumResponse ,IAlbum} from "./types/album";

// 根据ID获取专辑详情信息
// http://www.yili.fit:3000/album?id=44444
type GetAlbum = (id: number) => Promise<IGetAlbumResponse>

export const getAlbum: GetAlbum = async (id) => {
    const response = await request({
        url: '/album',
        params: {
            id,
        },
    })

    return response
}

// 新专辑速递
type GetNewAlbum = (limit: number,offset:number) => Promise<IAlbum[]>

export const getNewAlbum: GetNewAlbum = async (limit,offset) => {
    const response = await request({
        url: '/top/album',
        params: {
            limit,
            offset,
        },
    })

    return response.monthData
}

// 获取歌手专辑 id：歌手id
type GetArtistAlbum = (id: number) => Promise<IAlbum[]>
export const getArtistAlbum: GetArtistAlbum = async (id) => {
    const response = await request({
        url: '/artist/album',
        params: {
            id,
        },
    })

    return response.hotAlbums
}