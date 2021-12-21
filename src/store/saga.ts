import { all, takeLatest } from 'redux-saga/effects';
import { loadMorePlayList, searchPlayList } from '../store/playlist/saga';

function* saga() {
    yield all([takeLatest('SEARCH_TAG', searchPlayList),takeLatest('LOAD_MORE', loadMorePlayList)]);
}

export default saga;
