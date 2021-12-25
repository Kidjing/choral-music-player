import { ACTIONS } from './actions';
import { IRecommandSonglist, ISonglist } from 'src/api/types/songlist';
import { IAction } from '../type';

let initState: ISonglist[] = [];

export const playListReducer = (state = initState, action: IAction<ISonglist[] | IRecommandSonglist[]>) => {
    if (action.type === ACTIONS.CHANGE_SEARCH) {
        return action.payload;
    }
    if (action.type === ACTIONS.LOAD_SEARCH) {
        return [...state,...action.payload];
    }
    return state;
};

export const beforeReducer=(state=0,action:IAction<number>)=>{
    if(action.type ==='GET_BEFORE'){
        return action.payload;
    }
    return state;
}

export const getPlayList = (playList: ISonglist[] | IRecommandSonglist[]) => {
    return {
        type: 'CHANGE_SEARCH',
        payload: playList,
    };
};

export const getMorePlayList = (playList: ISonglist[] | IRecommandSonglist[]) => {
    return {
        type: 'LOAD_SEARCH',
        payload: playList,
    };
};

export const loadMore=(tag:string,offset?:number,before?:number)=>{
    return {
        type: 'LOAD_MORE',
        payload: {
            tag:tag,
            offset:offset,
            before:before
        },
    };
}

export const getBefore=(lasttime:number)=>{
    return {
        type: 'GET_BEFORE',
        payload: lasttime
    };
}