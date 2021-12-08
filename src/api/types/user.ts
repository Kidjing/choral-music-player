import { IAccount,IProfile } from './auth'

export interface UserDetailResponce {
    account: IAccount,
    profile: IProfile,
}

export interface UserPlaylist {
    subscribed: boolean;  // 是否是收藏歌单
    creator: ICreator;  // 创建这个歌单的用户
    subscribedCount: number;  // 收藏这个歌单的人数
    userId: number;  // 创建者id
    totalDuration: number;  // 总共持续的时间
    trackCount: number;  // 歌曲数目
    updateTime: number;  // 上一次更新时间
    coverImgUrl: string;  // 歌单封面
    anonimous: boolean; // 是否是匿名发布的歌单
    createTime: number; // 创建时间
    playCount: number;  // 播放次数
    description: string;  // 歌单简介
    tags: string[];  // 歌单标签
    name: string;  // 歌单的姓名
    id: number;  // 这个歌单的id
}

export interface ICreator {
    avatarUrl: string;   // 创建这个歌单的头像
    userId: number;   // 创建者id
    nickname: string;  // 创建者的昵称
}
