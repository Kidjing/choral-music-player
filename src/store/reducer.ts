import { combineReducers } from 'redux';
import playingReducer from './playing/reducer';
import {tagReducer} from './dynamic-tag/reducer';
import { playListReducer } from './playlist/reducer';
import searchRecordReducer from './search-record/reducer';

export const reducer = combineReducers({
    playingReducer,
    tagReducer,
    playListReducer,
    searchRecordReducer
});
