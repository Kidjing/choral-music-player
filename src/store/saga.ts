import { all, takeLatest } from 'redux-saga/effects';
import { loadMorePlayList, searchPlayList } from '../store/playlist/saga';
import { loadDailyPlayList } from './daily-card/saga';
import { loadFmPlayList } from './fm-card/saga';
import { getPlayingSongList,getUrl } from './playing/saga';

function* saga() {
    yield all([
        takeLatest('SEARCH_TAG', searchPlayList),
        takeLatest('LOAD_MORE', loadMorePlayList),
        takeLatest('SET_INFO', loadDailyPlayList),
        takeLatest('SET_INFO', loadFmPlayList),
        takeLatest('GET_FM', loadFmPlayList),
        takeLatest('PLAY', getPlayingSongList),
        takeLatest('SET_MUSIC_URL', getUrl),
    ]);
}

export default saga;
