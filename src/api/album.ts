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
type GetNewAlbum = (limit?: number,offset?:number,area?:string) => Promise<IAlbum[]>

export const getNewAlbum: GetNewAlbum = async (limit=30,offset=0,area='all') => {
    const response = await request({
        url: '/album/new',
        params: {
            limit,
            offset,
            area,
        },
    })

    return response.albums
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