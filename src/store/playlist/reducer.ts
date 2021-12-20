import { ACTIONS } from './actions';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { IAction } from '../../types/actions';

let initState: ISonglist[] = [];

export const playListReducer = (state = initState, action: IAction<ISonglist[] | IRecommandSonglist[]>) => {
    if (action.type === ACTIONS.LOAD_MORE) {
        return [...state, action.payload];
    }
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