export interface ILyric {
    lrc: ILrc;  // 原文歌词
    klyric?: IKlyric; // 翻译成外文的歌词？？
    tlyric?: ITlyric; // 翻译成中文的歌词
} 
// 原文歌词
export interface ILrc {
    version: number;
    lyric: string;
}
// 翻译成外文的歌词
export interface IKlyric {
    version: number;
    lyric: string;
}
// 翻译成中文的歌词
export interface ITlyric {
    version: number;
    lyric: string;
}

// 格式化之后的歌词

export interface IFormatLyric {
    lrc?: IFormatLrc;  // 原文歌词
    klyric?: IFormatLrc; // 翻译成外文的歌词？？
    tlyric?: IFormatLrc; // 翻译成中文的歌词
}

export interface IFormatLrc {
    times: number[],
    contents: string[],
}
