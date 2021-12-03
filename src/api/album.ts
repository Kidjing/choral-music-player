import request from "./axios";
import { IGetAlbumResponse } from "./types/album";

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