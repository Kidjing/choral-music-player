import { IMusic } from "./song";

export interface IAlbum {
    blurPicUrl?: string;   // 也是专辑封面
    publishTime?: number;  // 发布时间
    artist: IAlbumArtistItem;  // 专辑的艺人
    artists?: IAlbumArtistItem[];  // 专辑的艺人
    picUrl: string;  // 专辑封面
    commentThreadId?: string;   // 评论线程id
    description?: string;  // 简介
    status?: number;  // 专辑状态
    name: string;  // 名称
    id: number;  // 歌曲id
    size?: number;  // 歌曲数目
    company?: string;  // 发行公司

}
// 
export interface IAlbumArtistItem {
    picUrl: string;   // 歌手头像
    img1v1Url?: string;  // 如果没有歌手头像则显示这个
    name: string;
    id: number;
    picId_str?: string; 
    img1v1Id_str?: string;
}





// ---------------------下面是请求和翻译参数的接口
export interface IGetAlbumResponse {
    album: IAlbum
    songs: IMusic[]
}
  