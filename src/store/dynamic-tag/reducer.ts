import { ACTIONS } from './actions';
import { IAction, ITag } from '../../types/actions';

const initState = [
    { name: '全部', isCheck: true },
    { name: '推荐歌单', isCheck: false },
    { name: '精品推荐', isCheck: false },
    { name: '官方', isCheck: false },
    { name: '排行榜', isCheck: false },
];

const tagReducer = (state = initState, action: IAction<ITag>) => {
    if (action.type === ACTIONS.CHANGE_TAG) {
        const tags = state.map((item: ITag) => {
            return item.name;
        });
        if (tags.includes(action.payload.name)) {
            console.log('asdasd');
            const newTag = state.filter((tag) => tag.name !== action.payload.name);
            return newTag;
        }
        return [...state, action.payload];
    }
    if (action.type === ACTIONS.SEARCH_TAG) {
        const newState = state.map((item: ITag) => {
            if (item.name === action.payload.name) {
                return { name: item.name, isCheck: true };
            }
            return { name: item.name, isCheck: false };
        });
        return newState;
    }
    return state;
};

export const changeTag = (tag: ITag) => {
    return {
        type: 'CHANGE_TAG',
        payload: tag,
    };
};

export const searchTag = (tag: ITag) => {
    return {
        type: 'SEARCH_TAG',
        payload: tag,
    };
};

export default tagReducer;
