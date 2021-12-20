import { all, takeLatest } from 'redux-saga/effects';
import { searchPlayList } from '../store/playlist/saga';

function* saga() {
    yield all([takeLatest('SEARCH_TAG', searchPlayList)]);
}

export default saga;
