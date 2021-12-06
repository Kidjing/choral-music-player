import request from "./axios";
import { IArtist } from "./types/artist";
import { IMusic } from "./types/song";

type GetArtistDetail = (id: number) => Promise<{artist:IArtist;hotSongs:IMusic[]}>


// 通过艺人id获取歌手详细信息
// http://www.yili.fit:3000/artists?id=6452
export const getArtistDetail: GetArtistDetail = async (id) => {
    const response = await request({
        url: '/artists',
        params: {
            id,
        },
    })
  
    return response
}
