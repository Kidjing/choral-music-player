import request from "./axios";
import { ISonglistDetail,ISonglist,IGetSonglistsRequest,IRecommandSonglist } from './types/songlist'

// 获取歌单详细信息
type GetPlaylistDetail = (id: number) => Promise<ISonglistDetail>;
// 通过歌单id获取歌单详情，在歌单详情页面需要使用。
export const getPlaylistDetail: GetPlaylistDetail = async (id) => {
    const response = await request({
        url: 'playlist/detail',
        params: {
            id,
        },
    });

    return response.playlist;
};

// 获取精品歌单
type GetSonglistByCat = (limit: number, cat?: string, before?: number) => Promise<ISonglist[]>;
// 获取精品歌单
// http://www.yili.fit:3000/top/playlist/highquality?limit=1&before=0&cat=欧美
export const getSonglistByCat: GetSonglistByCat = async (limit, cat?, before = 0) => {
    const response = await request({
        url: '/top/playlist/highquality',
        params: {
            limit,
            cat,
            before,
        },
    });

    return response.playlists;
};

// 分页获取歌单信息（可以使用offset和limit）
type GetSonglists = (params: IGetSonglistsRequest) => Promise<{ playlists: ISonglist[]; total: number }>;

// 官方歌单在这里获取
// http://www.yili.fit:3000/top/playlist?cat=欧美&order=hot&limit=2&offset=3
// 根据cat获取歌单列表
export const getSonglists: GetSonglists = async ({ cat, order, limit = 30, offset }) => {
    const response = await request({
        url: '/top/playlist',
        params: {
            cat,
            order,
            limit,
            offset,
        },
    });

    return response;
};
// http://www.yili.fit:3000/personalized
// limit: 参数
// 获取推荐歌单（只能使用limit，不支持懒加载和分页）
type RecommendPlaylist = (limit: number) => Promise<IRecommandSonglist[]>
export const recommendPlaylist:RecommendPlaylist = async (limit)=> {
    const response = await request({
        url: '/personalized',
        params: {
            limit,
        },
    });
    
    return response.result;
};
// 排行榜
// http://www.yili.fit:3000/toplist
type TopPlaylist = () => Promise<ISonglist[]>;
export const topPlaylist: TopPlaylist = async () => {
    const response = await request({
        url: '/toplist',
    });

    return response.list;
};
