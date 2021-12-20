import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getSonglistByCat, getSonglists, recommendPlaylist, topPlaylist } from '../../api/songlist';
import { getPlayList } from './reducer';

type getServiceRecommendPlaylist = SagaReturnType<typeof recommendPlaylist>;
type getServiceSongList = SagaReturnType<typeof getSonglists>;
type getServiceSongListByCat = SagaReturnType<typeof getSonglistByCat>;
type getServiceTopPlaylist = SagaReturnType<typeof topPlaylist>;

export function* searchPlayList(action: Effect) {
    const tag = action.payload.name;
    try {
        if (tag === '精品歌单') {
            const playList: getServiceSongListByCat = yield call(getSonglistByCat, 30);
            yield put(getPlayList(playList));
        } else if (tag === '推荐歌单') {
            const playList: getServiceRecommendPlaylist = yield call(recommendPlaylist, 30);
            yield put(getPlayList(playList));
        } else if (tag === '排行榜') {
            const playList: getServiceTopPlaylist = yield call(topPlaylist);
            yield put(getPlayList(playList));
        } else {
            const result: getServiceSongList = yield call(getSonglists, { limit: 30, cat: tag });
            yield put(getPlayList(result.playlists));
        }
    } catch (e) {
        yield put({ type: 'SEARCH_TAG', message: e.message });
    }
}
