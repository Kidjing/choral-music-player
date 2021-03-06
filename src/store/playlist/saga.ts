import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getSonglistByCat, getSonglists, recommendPlaylist, topPlaylist } from '../../api/songlist';
import { getBefore, getMorePlayList, getPlayList, setBtn } from './reducer';

type getServiceRecommendPlaylist = SagaReturnType<typeof recommendPlaylist>;
type getServiceSongList = SagaReturnType<typeof getSonglists>;
type getServiceSongListByCat = SagaReturnType<typeof getSonglistByCat>;
type getServiceTopPlaylist = SagaReturnType<typeof topPlaylist>;

export function* searchPlayList(action: Effect) {
    const tag = action.payload.name;
    try {
        if (tag === '精品歌单') {
            const result: getServiceSongListByCat = yield call(getSonglistByCat, 30);
            yield put(getBefore(result.lasttime));
            yield put(getPlayList(result.playlists));
        } else if (tag === '推荐歌单') {
            const playList: getServiceRecommendPlaylist = yield call(recommendPlaylist, 30);
            yield put(getPlayList(playList));
        } else if (tag === '排行榜') {
            const playList: getServiceTopPlaylist = yield call(topPlaylist);
            yield put(getPlayList(playList));
        } else {
            const result: getServiceSongList = yield call(getSonglists, { limit: 30, cat: tag });
            if (result.playlists.length < 30) {
                yield put(setBtn(false));
                yield put(getPlayList(result.playlists));
            } else {
                yield put(getPlayList(result.playlists));
                yield put(setBtn(true));
            }
        }
    } catch (e) {
        yield put({ type: 'SEARCH_TAG', message: e.message });
    }
}

export function* loadMorePlayList(action: Effect) {
    const { tag, offset, before } = action.payload;

    try {
        if (tag === '精品歌单') {
            const result: getServiceSongListByCat = yield call(getSonglistByCat, 30, '', before);
            if (result.playlists.length < 30) {
                yield put(setBtn(false));
            } else {
                yield put(getMorePlayList(result.playlists));
                yield put(getBefore(result.lasttime));
                yield put(setBtn(true));
            }
        } else {
            const result: getServiceSongList = yield call(getSonglists, { cat: tag, offset: offset });
            if (result.playlists.length < 30) {
                yield put(setBtn(false));
            } else {
                yield put(getMorePlayList(result.playlists));
                yield put(setBtn(true));
            }
        }
    } catch (e) {
        console.log(e.message);
    }
}
