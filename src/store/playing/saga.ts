import { Effect, put, call, SagaReturnType } from 'redux-saga/effects';
import { getAlbum } from 'src/api/album';
import { getArtistDetail } from 'src/api/artist';
import { getPlaylistDetail } from 'src/api/songlist';
import { getSongList } from './reducer';
import { getSongDetail } from 'src/api/song'

type getPlayList = SagaReturnType<typeof getPlaylistDetail>;
type getAlbumList = SagaReturnType<typeof getAlbum>;
type getArtistList = SagaReturnType<typeof getArtistDetail>;
type getSong = SagaReturnType<typeof getSongDetail>;

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
        if(type==='song'){
            const ids = []
            ids.push(id)
            const result: getSong = yield call(getSongDetail,ids)
            yield put(getSongList(result.songs))
        }
    } catch (e) {
        yield put({ type: 'SET_INFO', message: e.message });
    }
}

