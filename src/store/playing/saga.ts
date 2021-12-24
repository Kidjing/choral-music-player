import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getAlbum } from 'src/api/album';
import { getArtistDetail } from 'src/api/artist';
import { getPlaylistDetail } from 'src/api/songlist';
import { getSongList } from './reducer';

type getPlayList = SagaReturnType<typeof getPlaylistDetail>;
type getAlbumList = SagaReturnType<typeof getAlbum>;
type getArtistList = SagaReturnType<typeof getArtistDetail>;

export function* getPlayingSongList(action: Effect) {
    const { id,type } = action.payload;
    try {
        if (type==='playlist') {
            const result: getPlayList = yield call(getPlaylistDetail,id);
            yield put(getSongList(result.tracks));
        }
        if(type==='album'){
            const result: getAlbumList = yield call(getAlbum,id);
            yield put(getSongList(result.songs));
        }
        if(type==='artist'){
            const result: getArtistList = yield call(getArtistDetail,id);
            yield put(getSongList(result.hotSongs));
        }
    } catch (e) {
        yield put({ type: 'SET_INFO', message: e.message });
    }
}

