import { ACTIONS } from './actions';

const initState = ['全部', '推荐歌单', '精品推荐', '官方', '排行榜'];

const tagReducer = (state = initState, action: any) => {
    if (action.type === ACTIONS.CHANGE_TAG) {
        if (state.includes(action.payload)) {
            const newTag = state.filter((tag) => tag !== action.payload);
            return newTag;
        }
        return [...state, action.payload];
    }
    return state;
};

export default tagReducer;
