import { combineReducers } from 'redux';
import {musicReducer, playingReducer, playStatusReducer} from './playing/reducer';
import {tagReducer} from './dynamic-tag/reducer';
import { beforeReducer, playListReducer } from './playlist/reducer';
import searchRecordReducer from './search-record/reducer';
import userInfoReducer from './user/reducer';
import { libReducer } from './library/reducer';
import { dailySongsReducer } from './daily-card/reducer';
import { personalFmReducer } from './fm-card/reducer';

export const reducer = combineReducers({
    playingReducer,
    tagReducer,
    playListReducer,
    searchRecordReducer,
    userInfoReducer,
    libReducer,
    dailySongsReducer,
    personalFmReducer,
    musicReducer,
    playStatusReducer,
    beforeReducer
});
