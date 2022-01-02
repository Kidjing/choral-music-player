import { ILyric, IFormatLyric, IFormatLrc } from 'src/api/types/lyric';

type FormatLyric = (lyric: ILyric) => IFormatLyric;
export const formatLyric: FormatLyric = (lyric: ILyric) => {
    const lrc = format(lyric.lrc.lyric);
    const klyric = format(lyric.klyric!.lyric);
    const tlyric = format(lyric.tlyric!.lyric);

    return {
        lrc,
        klyric,
        tlyric,
    };
};

interface prop {
    time: number;
    content: string;
}

type Format = (lyric: string) => IFormatLrc;
const format: Format = (lyric: string) => {
    const times: number[] = [];
    const contents: string[] = [];
    let res: Array<prop> = [];
    const lyrics = lyric.split('\n');
    lyrics.forEach((item) => {
        const strs = item.split(']');
        if (strs[strs.length - 1] !== '') {
            const matchTimes = item.match(/\[(.+?)\]/g);
            matchTimes!.forEach((element) => {
                const timeStr = element.substring(1, element.length - 1);
                const time = timeStr.split('.')[0].split(':');
                res.push({ time: Number(time[0]) * 60 + Number(time[1]), content: strs[strs.length - 1] });
            });
        }
    });
    res = res.sort((a, b) => a.time - b.time);
    res.forEach((item) => {
        times.push(item.time);
        contents.push(item.content);
    });

    return {
        times,
        contents,
    };
};
