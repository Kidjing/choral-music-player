// 艺人详情信息
export interface IArtist{ 
    id: number;
    name: string;
    alias: string[];  // 歌手别名
    briefDesc: string;   // 简介
    musicSize: number;   // 音乐数目
    albumSize: number;   // 专辑数目
    mvSize: number;      // mv数量
    picUrl: string;      // 图片地址
    img1v1Url: string;   // 歌手不存在时的图片地址
    publishTime: number;  // 上传时间
    picId: number;    // 图片id
    picId_str: string;    
    img1v1Id: number;
    img1v1Id_str: string;
}