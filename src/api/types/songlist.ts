export interface IRecommandSonglist {
    alg?: string; // alg_sq_official_tagOnly 为官方歌单
    name: string; // 歌单名称
    id: number; // 歌单ID，可以用来获取详情歌单
    picUrl: string; // 封面图片
    copywriter: string; // 简介
    trackCount: number; // 歌曲数量
    playCount: number; // 观看次数
}

// 歌单简要信息
export interface ISonglist {
    alg?: string; // alg_sq_official_tagOnly 为官方歌单
    name: string; // 歌单名称
    id: number; // 歌单ID，可以用来获取详情歌单
    coverImgUrl: string; // 封面图片
    description: string; // 描述
    updateFrequency: string; // 更新频率
    coverImgId: number; // 封面信息
    playCount: number; // 观看次数
    trackNumberUpdateTime?: number; // 需要通过这个来获取下一页信息
}

// 歌单详情信息
export interface ISonglistDetail {
    coverImgUrl: string; // 封面url
    createTime: number; // 创建时间
    trackCount: number; // 歌曲数目
    description: string; // 歌单描述
    id: number; // 歌曲id
    name: string; // 歌单名
    playCount: number; // 观看数量，可以放在首页进行展示
    trackIds: ITrackId[]; // 这个是这个songlist的ID集合，需要通过ids来获取所有的歌曲，以后会用到
}

export interface ITrackId {
    id: number;
}

// ----------------------下面是响应相关参数----------------------------

// 通过tag获取歌单的参数
enum ORDER {
    HOT = 'hot',
    NEW = 'new',
}
export interface IGetSonglistsRequest {
    cat?: string;
    order?: ORDER;
    limit?: number;
    offset?: number;
}
