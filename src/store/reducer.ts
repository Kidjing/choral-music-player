import { combineReducers } from 'redux';
import playingReducer from './playing/reducer';
import tagReducer from './dynamic-tag/reducer';

export const reducer = combineReducers({
    playingReducer,
    tagReducer,
});
