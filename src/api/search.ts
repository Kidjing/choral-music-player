// http://www.yili.fit:3000/search/suggest
import request from "./axios";
import {ISuggestSearch} from "./types/search"

type SuggestSearch = (req: string) => Promise<ISuggestSearch>

export const suggestSearch: SuggestSearch = async (req) => {
    const response = await request({
        url: '/search/suggest',
        params: {
            keywords:req,
        },
    })

    return response.result
}