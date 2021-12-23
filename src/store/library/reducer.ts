import { IAction, ITag } from '../../types/actions';

const initState: ITag[] = [
    { name: '专辑', isCheck: false },
    { name: '艺人', isCheck: false },
    { name: 'MV', isCheck: false },
    { name: '云盘', isCheck: false },
];

export const libReducer = (state = initState, action: IAction<ITag>) => {
    if (action.type === 'FILTER_PLAYLIST') {
        const newState=state.map((tag:ITag)=>{
            if(tag.name===action.payload.name){
                return {name:action.payload.name,isCheck:true}
            }
            return {name:tag.name,isCheck:false} 
        })
        return newState;
    }
    return state;
};

export const filterPlaylist = (tag: ITag) => {
    return {
        type: 'FILTER_PLAYLIST',
        payload: tag,
    };
};