// 调用歌曲详情得到的信息
export interface IMusic {
    id: number;
    name: string;
    ar: IArtistItem[];  // 歌手信息
    al: IAlbumItem;   // 专辑信息，歌曲的封面在专辑中
    publishTime: number;
    dt: number; // 歌曲时长，单位ms
}
export interface IArtistItem {
    id: number;
    name: string;
}

// 
export interface IAlbumItem {
    id: number;
    name: string;
    picUrl: string;
    pic_str: string;
    pic: number;
}
