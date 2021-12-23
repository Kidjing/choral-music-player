import { ACTIONS } from './actions';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { IAction } from '../../types/actions';

let initState: ISonglist[] = [];

export const playListReducer = (state = initState, action: IAction<ISonglist[] | IRecommandSonglist[]>) => {
    if (action.type === ACTIONS.SEARCH_PLAYLIST) {
        return action.payload;
    }
    return state;
};

export const getPlayList = (playList: ISonglist[] | IRecommandSonglist[]) => {
    return {
        type: 'SEARCH_PLAYLIST',
        payload: playList,
    };
};

export const loadMore=(tag:string,limit:number)=>{
    return {
        type: 'LOAD_MORE',
        payload: {
            tag:tag,
            limit:limit
        },
    };
}