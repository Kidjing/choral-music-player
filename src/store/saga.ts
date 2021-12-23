import { all, takeLatest } from 'redux-saga/effects';
import { loadMorePlayList, searchPlayList } from '../store/playlist/saga';
import { loadDailyPlayList } from './daily-card/saga';

function* saga() {
    yield all([takeLatest('SEARCH_TAG', searchPlayList),takeLatest('LOAD_MORE', loadMorePlayList),takeLatest('SET_INFO',loadDailyPlayList)]);
}

export default saga;
