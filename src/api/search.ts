// http://www.yili.fit:3000/search/suggest
import request from "./axios";
import { ISuggestSearch } from "./types/search"

type SuggestSearch = (req: string) => Promise<ISuggestSearch>

export const suggestSearch: SuggestSearch = async (req) => {
    const response = await request({
        url: '/search/suggest',
        params: {
            keywords: req,
        },
    })

    return response.result
}

// 输入所需要搜索的类型，type为搜索类型
// 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 
// 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合

interface ISearchParams {
    key: string,
    type: number,
    limit?: number,
    offset?: number,
}

type Search = (req: ISearchParams) => Promise<ISuggestSearch>

export const search: Search = async (req) => {
    const response = await request({
        url: '/search',
        params: {
            keywords: req.key,
            type: req.type,
            limit: req.limit,
            offset: req.offset,
        },
    })

    return response.result
}